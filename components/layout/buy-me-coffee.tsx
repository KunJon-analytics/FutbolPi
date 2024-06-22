"use client";

import React from "react";
import { Coffee } from "lucide-react";

import axiosClient, { config } from "@/lib/axios-client";
import { toastAction } from "@/lib/toast";
import { PaymentDTO } from "@/types";
import { PaymentDTOMemo, PiCallbacks } from "@/lib/pi/types";
import { siteConfig } from "@/config/site";

import { Button } from "../ui/button";
import useCurrentSession from "../providers/session-provider";

const BuyMeCoffee = () => {
  const { session, logout, status } = useCurrentSession();

  if (!session.isLoggedIn || status !== "success") {
    return null;
  }

  const onReadyForServerApproval = (paymentId: string) => {
    console.log("onReadyForServerApproval", paymentId);
    axiosClient.post(`/payments/tips/approve`, { paymentId }, config);
  };

  const onReadyForServerCompletion = (paymentId: string, txid: string) => {
    console.log("onReadyForServerCompletion", paymentId, txid);
    axiosClient.post(`/payments/tips/complete`, { paymentId, txid }, config);
    toastAction("success");
  };

  const onCancel = (paymentId: string) => {
    console.log("onCancel", paymentId);
    toastAction("error");
    return axiosClient.post("/payments/cancel", { paymentId });
  };

  const onError = (error: Error, payment?: PaymentDTO<PaymentDTOMemo>) => {
    console.error("onError", error);
    toastAction("error");
    if (payment) {
      console.log(payment);
      // handle the error accordingly send notification to admin
    }
  };

  const callbacks: PiCallbacks<PaymentDTOMemo> = {
    onCancel,
    onError,
    onReadyForServerApproval,
    onReadyForServerCompletion,
  };

  const tip = async () => {
    try {
      const paymentData: {
        amount: number;
        memo: string;
        metadata: PaymentDTOMemo;
      } = {
        amount: siteConfig.businessLogic.tipsAmount,
        memo: `Tip FutbolPi dev π${siteConfig.businessLogic.tipsAmount}`,
        metadata: { purpose: session.id, type: "TIP" },
      };

      const payment = await window.Pi.createPayment(paymentData, callbacks);
      console.log({ payment });
    } catch (error) {
      console.log("subscribe ERROR", { error });
      if (error instanceof Error) {
        // Inside this block, err is known to be a Error
        if (
          error.message === 'Cannot create a payment without "payments" scope'
        ) {
          logout();
          toastAction("error");
        }
      }
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={tip}>
      <Coffee className="h-4 w-4" />
    </Button>
  );
};

export default BuyMeCoffee;
