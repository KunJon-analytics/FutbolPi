import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { PaymentDTO } from "@/types";
import { PaymentDTOMemo } from "@/lib/pi/types";
import platformAPIClient from "@/lib/pi/platform-api-client";
import { siteConfig } from "@/config/site";

export async function POST(req: Request) {
  try {
    const {
      paymentId,
      txid,
    }: {
      paymentId: string;
      txid: string;
    } = await req.json();

    const currentPayment = await platformAPIClient.get<
      PaymentDTO<PaymentDTOMemo>
    >(`/payments/${paymentId}`);

    /* 
      DEVELOPER NOTE:
      implement logic here 
      e.g. verify transaction with blockchain data, 
      change payment status to confirmed, add txid and add user points
     
    */

    // verify with horizon data (amount and txid)

    const payment = await prisma.payment.findUnique({ where: { paymentId } });

    if (payment?.status !== "INITIALIZED") {
      console.log("[COMPLETE_TIPS]", "Wrong payment status");
      return new NextResponse("Wrong payment status", { status: 400 });
    }

    if (currentPayment.data.amount !== siteConfig.businessLogic.tipsAmount) {
      console.log("[COMPLETE_TIPS]", "Wrong tip price");
      return new NextResponse("Wrong tip price", { status: 400 });
    }

    // let Pi server know that the payment is completed
    await platformAPIClient.post(`/payments/${paymentId}/complete`, {
      txid,
    });

    await prisma.payment.update({
      where: { paymentId },
      data: { txId: txid, status: "COMPLETED" },
    });
    const updatedUser = await prisma.user.update({
      where: { id: currentPayment.data.metadata.purpose },
      data: { points: { increment: siteConfig.businessLogic.tipsPoint } },
    });

    return new NextResponse(`Completed the payment ${paymentId}`, {
      status: 200,
    });
  } catch (error) {
    console.log("[COMPLETE_TIPS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
