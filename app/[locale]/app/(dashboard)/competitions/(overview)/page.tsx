import { unstable_setRequestLocale } from "next-intl/server";

import { columns } from "@/components/data-table/competition/columns";
import { DataTable } from "@/components/data-table/competition/data-table";
import { getActiveCompetitions } from "@/actions/competitions";

type Props = {
  params: { locale: string };
};

export const revalidate = 3600; // revalidate at most every hour

export default async function CompetitionPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const competitions = await getActiveCompetitions();

  return (
    <>
      <DataTable columns={columns} data={competitions} />
    </>
  );
}
