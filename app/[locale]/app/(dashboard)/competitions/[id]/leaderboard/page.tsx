import * as React from "react";
import * as z from "zod";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import prisma from "@/lib/prisma";

import { DataTableWrapper } from "./_components/data-table-wrapper";

/**
 * allowed URL search params
 */
const searchParamsSchema = z.object({
  pageSize: z.coerce.number().optional().default(10),
  pageIndex: z.coerce.number().optional().default(0),
});

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params.id;
  const search = searchParamsSchema.safeParse(searchParams);

  const t = await getTranslations("CompetitionDetail.Leaderboard");

  if (!search.success) {
    return notFound(); // maybe not if search.success is false, add a toast message
  }

  const data = await prisma.prediction.groupBy({
    by: ["username"],
    where: { fixture: { competitionId: id } },
    _sum: { points: true },
    orderBy: { _sum: { points: "desc" } },
  });

  return (
    <>
      <div className="grid gap-2">
        <p className="text-muted-foreground text-xs">
          {t.rich("fixturesLink", {
            action: (chunks) => (
              <Link
                href={`./fixtures`}
                className="underline underline-offset-4 hover:no-underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
      <DataTableWrapper
        data={data}
        pagination={{
          pageIndex: search.data.pageIndex,
          pageSize: search.data.pageSize,
        }}
      />
    </>
  );
}
