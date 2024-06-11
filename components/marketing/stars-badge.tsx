"use client";

import useStats from "@/hooks/use-stats";
import { numberFormatter } from "@/lib/utils";
import { defaultStats } from "@/lib/site/stats";

import { Badge } from "../ui/badge";

export function StarsBadgeFallback() {
  return (
    <Badge variant="secondary" className="ml-1">
      ~
    </Badge>
  );
}

async function StarsBadge() {
  const { data, status } = useStats();

  if (status === "pending") {
    return <StarsBadgeFallback />;
  }

  return (
    <>
      <Badge variant="secondary" className="ml-1 hidden sm:block">
        {numberFormatter(data?.users || defaultStats.users)}
      </Badge>
      <Badge variant="secondary" className="ml-1 block sm:hidden">
        {data?.users || defaultStats.users}
      </Badge>
    </>
  );
}

export default StarsBadge;
