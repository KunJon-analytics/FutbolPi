import { columns } from "@/components/data-table/competition/columns";
import { DataTable } from "@/components/data-table/competition/data-table";
import prisma from "@/lib/prisma";

export default async function CompetitionPage() {
  const competitions = await prisma.competition.findMany({
    where: { isActive: true },
  });

  return (
    <>
      <DataTable columns={columns} data={competitions} />
    </>
  );
}
