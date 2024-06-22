"use client";

import { useTranslations } from "next-intl";
import { LogIn } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link, useRouter } from "@/intl/navigation";

import { Button, ButtonProps } from "../ui/button";
import useCurrentSession from "../providers/session-provider";

type LoginButtonProps = ButtonProps & {
  redirectTo?: string;
  buttonText?: string;
};

export function LoginButton({
  className,
  redirectTo,
  buttonText,
  ...props
}: LoginButtonProps) {
  const t = useTranslations("Layout.MarketingHeader.LoginButton");
  const router = useRouter();

  const { isPending, login, status, session } = useCurrentSession();

  const size = props.size;

  const onClick = async () => {
    await login();
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  if (session.isLoggedIn && status === "success") {
    return (
      <Button asChild className={cn("rounded-full", className)} {...props}>
        <Link href="/app/competitions">{t("text")}</Link>
      </Button>
    );
  }

  return (
    <Button
      className={cn("rounded-full", className)}
      {...props}
      onClick={onClick}
      disabled={isPending}
    >
      {size === "icon" ? <LogIn /> : buttonText}
    </Button>
  );
}
