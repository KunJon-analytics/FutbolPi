"use client";

import { Shell } from "@/components/dashboard/shell";
import useStats from "@/hooks/use-stats";
import { numberFormatter } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { defaultStats } from "@/lib/site/stats";

export function Stats() {
  const { data, status } = useStats();
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
            {numberFormatter(data?.predictions || defaultStats.predictions)}
          </h3>
          <p className="font-light text-muted-foreground">Total Predictions</p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            {numberFormatter(data?.fixtures || defaultStats.fixtures)}
          </h3>
          <p className="font-light text-muted-foreground">Fixtures Predicted</p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">
            {numberFormatter(data?.users || defaultStats.users)}
          </h3>
          <p className="font-light text-muted-foreground">Active Players</p>
        </div>
      </div>
    </Shell>
  );
}
