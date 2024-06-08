import * as React from "react";
import * as z from "zod";
import { notFound } from "next/navigation";

import { DataTableWrapper } from "./_components/data-table-wrapper";
import prisma from "@/lib/prisma";

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
    <div className="grid gap-4">
      <DataTableWrapper
        data={data}
        pagination={{
          pageIndex: search.data.pageIndex,
          pageSize: search.data.pageSize,
        }}
      />
    </div>
  );
}
