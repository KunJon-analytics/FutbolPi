"use client";

import { useRouter } from "next/navigation";

import { AuthResult, Scope } from "@/types";
import { toast, toastAction } from "@/lib/toast";
import { onIncompletePaymentFound } from "@/lib/pi/callbacks";
import { login } from "@/actions/session";
import { SubmitButton } from "@/components/submit-button";

const scopes: Scope[] = ["payments", "username", "wallet_address"];

type LoginFormProps = { redirectTo: string };

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();

  return (
    <form
      action={async () => {
        try {
          const authResult: AuthResult = await window.Pi.authenticate(
            scopes,
            onIncompletePaymentFound
          );
          await login(authResult);
          toast.success("You are successfully signed in");
          router.push(redirectTo);
        } catch (_e) {
          toastAction("error");
          console.log(_e);
        }
      }}
    >
      <SubmitButton buttonText="Sign in with Pi Wallet" icon="pi" />
    </form>
  );
}
