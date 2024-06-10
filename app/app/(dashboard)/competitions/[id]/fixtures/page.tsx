import { notFound } from "next/navigation";
import * as React from "react";
import * as z from "zod";

import prisma from "@/lib/prisma";
import { DataTableWrapper } from "./_components/data-table-wrapper";
import { fixtureStatus } from "@/lib/competition/utils";
import { FixturesPickerPreset } from "@/components/competition-dashboard/fixture-picker-preset";

/**
 * allowed URL search params
 */
const searchParamsSchema = z.object({
  status: z.enum(fixtureStatus).optional().default("ALL"),
  // improve coersion + array + ...

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

  const fixtures = await prisma.fixture.findMany({
    where: { competitionId: id },
    include: { awayTeam: true, homeTeam: true },
    orderBy: { timestamp: "asc" },
  });

  if (!search.success) {
    return notFound(); // maybe not if search.success is false, add a toast message
  }

  const status = fixtureStatus.find((fs) => fs === search.data.status) || "ALL";

  const data =
    status === "ALL"
      ? fixtures
      : fixtures.filter((fixture) => fixture.status === status);

  return (
    <div className="grid gap-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <FixturesPickerPreset defaultValue={status} values={fixtureStatus} />
      </div>
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
