import { unstable_setRequestLocale } from "next-intl/server";

import { columns } from "@/components/data-table/competition/columns";
import { DataTable } from "@/components/data-table/competition/data-table";
import prisma from "@/lib/prisma";

type Props = {
  params: { locale: string };
};

export default async function CompetitionPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const competitions = await prisma.competition.findMany({
    where: { isActive: true },
  });

  return (
    <>
      <DataTable columns={columns} data={competitions} />
    </>
  );
}
