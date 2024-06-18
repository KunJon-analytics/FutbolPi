"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { AuthResult, Scope } from "@/types";
import { toast, toastAction } from "@/lib/toast";
import { onIncompletePaymentFound } from "@/lib/pi/callbacks";
import { login } from "@/actions/session";
import { SubmitButton } from "@/components/submit-button";
import { useTranslations } from "next-intl";

const scopes: Scope[] = ["payments", "username", "wallet_address"];

type LoginFormProps = { redirectTo: string };

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("Auth.LoginPage.LoginForm");

  return (
    <form
      action={async () => {
        try {
          const authResult: AuthResult = await window.Pi.authenticate(
            scopes,
            onIncompletePaymentFound
          );
          await login(authResult);
          queryClient.invalidateQueries({
            queryKey: ["session"],
          });
          toast.success(t("successMessage"));
          router.push(redirectTo);
        } catch (_e) {
          toastAction("error");
          console.log(_e);
        }
      }}
    >
      <SubmitButton buttonText={t("buttonText")} icon="pi" />
    </form>
  );
}
