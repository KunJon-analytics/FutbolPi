"use client";

import { useFormatter } from "next-intl";

import useStats from "@/hooks/use-stats";
import { defaultStats } from "@/lib/site/stats";

import { Badge } from "../ui/badge";

export function StarsBadgeFallback() {
  return (
    <Badge variant="secondary" className="ml-1">
      ~
    </Badge>
  );
}

function StarsBadge() {
  const { data, status } = useStats();
  const format = useFormatter();

  if (status === "pending") {
    return <StarsBadgeFallback />;
  }

  return (
    <>
      <Badge variant="secondary" className="ml-1 hidden sm:block">
        {format.number(data?.users || defaultStats.users, "compact")}
      </Badge>
      <Badge variant="secondary" className="ml-1 block sm:hidden">
        {data?.users || defaultStats.users}
      </Badge>
    </>
  );
}

export default StarsBadge;
