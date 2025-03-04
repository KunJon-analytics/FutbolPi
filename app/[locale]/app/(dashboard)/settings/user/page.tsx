"use client";

import { useTranslations } from "next-intl";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Award } from "lucide-react";

import useCurrentSession from "@/components/providers/session-provider";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LoginButton } from "@/components/layout/login-button";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/competition-dashboard/metrics-card";
import { UserStatResponse } from "@/app/api/profile/[accessToken]/get-stat";

import { StringCard } from "./_components/string-card";
import { cn } from "@/lib/utils";
import { UserBadge } from "./_components/user-badge";

export default function UserPage() {
  const t = useTranslations("Settings.User");
  const networkT = useTranslations(
    "CompetitionDetail.Fixtures.FixtureDetailTabs"
  );

  const { session, status: sessionStatus, accessToken } = useCurrentSession();

  const canFetch = session.isLoggedIn && sessionStatus === "success";

  const { status, data, isPending } = useQuery<UserStatResponse>({
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

  const { badges, predictions } = data;
  console.log({ data });

  return (
    <div className="@container grid gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.length > 0 &&
          badges.map((badge) => {
            return (
              <UserBadge
                badge={badge}
                key={`${badge.badge.name}-${badge.id}`}
              />
            );
          })}
      </div>
      <div className="grid grid-cols-2 gap-4 @3xl:grid-cols-5 @xl:grid-cols-4 @3xl:gap-6">
        <StringCard
          title={t("username")}
          value={session.username}
          suffix="@"
          variant="info"
        />
        <MetricsCard
          title={t("predictions")}
          value={predictions._count.id}
          suffix="#"
          variant="info"
        />
        <MetricsCard
          title={t("points")}
          value={predictions._sum.points}
          suffix="#"
          variant="positive"
        />
        <MetricsCard
          title={`${t("points")}/${t("predictions")}`}
          value={predictions._avg.points}
          suffix="μ"
          variant="info"
        />
      </div>
    </div>
  );
}
