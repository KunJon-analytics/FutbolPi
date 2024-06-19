import { useTranslations } from "next-intl";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FixturesResult } from "@/types";

export function FixtureDetailTable({ fixture }: { fixture: FixturesResult }) {
  const t = useTranslations("CompetitionDetail.Fixtures.TabsDetailTable");

  const teams = `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`;
  const kickoff = formatDistanceToNowStrict(fromUnixTime(fixture.timestamp), {
    addSuffix: true,
  });
  const scores =
    fixture.status === "NOT_STARTED"
      ? "N/A"
      : `${fixture.homeGoals} - ${fixture.awayGoals}`;
  const status =
    fixture.status === "NOT_STARTED" ? "SCHEDULED" : fixture.status;

  return (
    <Table>
      <TableCaption className="mt-2">{t("fixtureTableCaption")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:min-w-[200px]">{t("key")}</TableHead>
          <TableHead>{t("value")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <FixtureTableRow heading={t("kickoff")} value={kickoff} />
        <FixtureTableRow heading={t("teams")} value={teams} />
        <FixtureTableRow heading={t("scores")} value={scores} />
        <FixtureTableRow heading={t("status")} value={status} />
        <FixtureTableRow heading={t("round")} value={fixture.round} />
      </TableBody>
    </Table>
  );
}

const FixtureTableRow = ({
  heading,
  value,
}: {
  heading: string;
  value: string;
}) => {
  return (
    <TableRow>
      <TableCell className="group">
        <div className="flex min-w-[130px] items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <code className="break-all font-medium">{heading}</code>
          </div>
        </div>
      </TableCell>
      <TableCell className="group">
        <div className="flex items-center justify-between gap-1">{value}</div>
      </TableCell>
    </TableRow>
  );
};
