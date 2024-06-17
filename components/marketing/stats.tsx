"use client";

import { useFormatter, useTranslations } from "next-intl";

import { Shell } from "@/components/dashboard/shell";
import useStats from "@/hooks/use-stats";
import { defaultStats } from "@/lib/site/stats";

import { Skeleton } from "../ui/skeleton";

export function Stats() {
  const { data, status } = useStats();
  const format = useFormatter();
  const t = useTranslations("Index.stats");

  if (status === "pending") {
    return (
      <Shell>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16">
          {new Array(3).fill(0).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Shell>
    );
  }
  return (
    <Shell>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16">
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            {format.number(
              data?.predictions || defaultStats.predictions,
              "compact"
            )}
          </h3>
          <p className="font-light text-muted-foreground">
            {t("totalPredictions")}
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            {format.number(data?.fixtures || defaultStats.fixtures, "compact")}
          </h3>
          <p className="font-light text-muted-foreground">
            {t("fixturesPredicted")}
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            {format.number(data?.users || defaultStats.users, "compact")}
          </h3>
          <p className="font-light text-muted-foreground">
            {t("activePlayers")}
          </p>
        </div>
      </div>
    </Shell>
  );
}
