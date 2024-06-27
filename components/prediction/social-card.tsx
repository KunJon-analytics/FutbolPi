"use client";
import { Share2 } from "lucide-react";
import React, { useState } from "react";

import { SocialCardProps, getSocialCardDialog } from "@/lib/prediction/utils";
import { toastAction } from "@/lib/toast";

import useCurrentSession from "../providers/session-provider";
import { Button } from "../ui/button";

type Props = { params: SocialCardProps };

const SocialCard = ({ params }: Props) => {
  const { logout } = useCurrentSession();
  const [loading, setLoading] = useState(false);

  const { title, message } = getSocialCardDialog(params);

  const onClick = async () => {
    setLoading(true);
    try {
      await window.Pi.openShareDialog(title, message);
    } catch (error) {
      console.log("share ERROR", { error });
      if (error instanceof Error) {
        // Inside this block, err is known to be a Error
        if (
          error.message === 'Cannot create a payment without "payments" scope'
        ) {
          logout();
          toastAction("error");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={onClick}
      disabled={loading}
    >
      <Share2 />
    </Button>
  );
};

export default SocialCard;
