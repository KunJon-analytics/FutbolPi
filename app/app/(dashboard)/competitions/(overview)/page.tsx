import Link from "next/link";

import { EmptyState } from "@/components/dashboard/empty-state";
import { columns } from "@/components/data-table/competition/columns";
import { DataTable } from "@/components/data-table/competition/data-table";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function CompetitionPage() {
  const competitions = await prisma.competition.findMany();

  if (competitions.length === 0)
    return (
      <EmptyState
        icon="activity"
        title="No competitions"
        description="Create your first competition"
        action={
          <Button asChild>
            <Link href="./competitions/new">Create</Link>
          </Button>
        }
      />
    );

  return (
    <>
      <DataTable columns={columns} data={competitions} />
    </>
  );
}
