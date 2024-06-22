"use client";

import { createContext, ReactNode, useContext } from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";

import useLocalStorage from "@/hooks/use-local-storage";
import { toast, toastAction } from "@/lib/toast";
import {
  AuthResultSchema,
  defaultSession,
  SessionData,
} from "@/lib/session/schema";
import useSession from "@/hooks/use-session";
import { Scope } from "@/types";
import { onIncompletePaymentFound } from "@/lib/pi/callbacks";

const scopes: Scope[] = ["payments", "username", "wallet_address"];

// A "provider" is used to encapsulate only the
// components that needs the state in this context
type SessionContextType = {
  session: SessionData;
  isPending: boolean;
  accessToken: string;
  login: () => Promise<void>;
  logout: () => void;
  status: "error" | "success" | "pending";
};

export const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("Auth.LoginPage.LoginForm");
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useLocalStorage<string>(
    "access-token",
    ""
  );

  //if status is error or is not loggedin present the button, disable button
  //if is pending
  const { data, status, mutate, mutateStatus, isLoading } =
    useSession(accessToken);
  const isPending = isLoading || mutateStatus === "pending";

  const logout = () => {
    setAccessToken("");
    queryClient.removeQueries({ queryKey: ["session"] });
  };

  const login = async () => {
    try {
      const authResult: AuthResultSchema = await window.Pi.authenticate(
        scopes,
        onIncompletePaymentFound
      );
      mutate(authResult, {
        onSuccess: (data, variables, context) => {
          setAccessToken(variables.accessToken);
          toast.success(t("successMessage"));
        },
        onError: (error, variables, context) => {
          setAccessToken("");
          toastAction("error");
        },
        onSettled: (data, error, variables, context) => {
          queryClient.invalidateQueries({ queryKey: ["session"] });
          //   router.refresh();
        },
      });
    } catch (_e) {
      toastAction("error");
      console.log(_e);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session: data || defaultSession,
        isPending,
        login,
        logout,
        status,
        accessToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

const useCurrentSession = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error(
      "useClient has to be used within <SessionContext.Provider>"
    );
  }

  return sessionContext;
};

export default useCurrentSession;
