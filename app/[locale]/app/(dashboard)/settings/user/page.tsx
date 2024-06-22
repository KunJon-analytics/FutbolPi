"use client";

import { useTranslations } from "next-intl";
import { skipToken, useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCurrentSession from "@/components/providers/session-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { LoginButton } from "@/components/layout/login-button";
import { Button } from "@/components/ui/button";

export default function UserPage() {
  const t = useTranslations("Settings.User");
  const networkT = useTranslations(
    "CompetitionDetail.Fixtures.FixtureDetailTabs"
  );

  const { session, status: sessionStatus, accessToken } = useCurrentSession();

  const canFetch = session.isLoggedIn && sessionStatus === "success";

  const {
    status,
    data: predictions,
    isPending,
  } = useQuery({
    queryKey: ["profile", accessToken],
    queryFn: canFetch
      ? async () => {
          const response = await fetch(`/api/profile/${accessToken}`);
          if (!response.ok) {
            throw new Error(networkT("networkError"));
          }
          return response.json();
        }
      : skipToken,
  });

  if (!canFetch) {
    return (
      <div className="flex items-center justify-center">
        <LoginButton buttonText={t("signIn")} />
      </div>
    );
  }

  if (isPending) {
    return <Skeleton className="h-72 w-full" />;
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center">
        <Button variant={"destructive"}>{networkT("networkError")}</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid max-w-sm gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">{t("username")}</Label>
          <Input id="username" value={`${session.username}`} disabled />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="predictions">{t("predictions")}</Label>
          <Input
            id="predictions"
            type="number"
            value={`${predictions._count.id}`}
            disabled
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="points">{t("points")}</Label>
          <Input
            id="points"
            type="number"
            value={`${predictions._sum.points}`}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
