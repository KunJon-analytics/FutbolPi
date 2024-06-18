"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Link } from "@/intl/navigation";

import { Button, ButtonProps } from "../ui/button";

export function LoginButton({ className, ...props }: ButtonProps) {
  const t = useTranslations("Layout.MarketingHeader.LoginButton");

  return (
    <Button asChild className={cn("rounded-full", className)} {...props}>
      <Link href="/app/competitions">{t("text")}</Link>
    </Button>
  );
}
