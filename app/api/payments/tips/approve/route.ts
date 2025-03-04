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
    }: {
      paymentId: string;
    } = await req.json();

    const currentPayment = await platformAPIClient.get<
      PaymentDTO<PaymentDTOMemo>
    >(`/payments/${paymentId}`);

    /* 
      DEVELOPER NOTE:
      implement logic here 
      e.g. ensure there is no prev pi payment with payment ID, 
      

    */

    if (currentPayment.data.amount !== siteConfig.businessLogic.tipsAmount) {
      console.log("[TIPS_APPROVE]", "wrong payment amount");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.payment.create({
      data: {
        amount: currentPayment.data.amount,
        paymentId,
        purposeId: currentPayment.data.metadata.purpose,
        type: "TIP",
        status: "INITIALIZED",
      },
    });

    // let Pi Servers know that you're ready
    await platformAPIClient.post(`/payments/${paymentId}/approve`);
    return new NextResponse(`Approved the payment ${paymentId}`, {
      status: 200,
    });
  } catch (error) {
    console.log("[TIPS_APPROVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
