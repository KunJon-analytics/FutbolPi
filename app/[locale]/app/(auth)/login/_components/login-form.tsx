"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { SubmitButton } from "@/components/submit-button";
import useCurrentSession from "@/components/providers/session-provider";

type LoginFormProps = { redirectTo: string };

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const t = useTranslations("Auth.LoginPage.LoginForm");
  const { login } = useCurrentSession();

  return (
    <form
      action={async () => {
        await login();
        router.push(redirectTo);
      }}
    >
      <SubmitButton buttonText={t("buttonText")} icon="pi" />
    </form>
  );
}
