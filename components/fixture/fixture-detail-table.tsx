import { formatDistanceToNowStrict } from "date-fns";

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
  const teams = `${fixture.homeTeam.name} vs ${fixture.awayTeam.logo}`;
  const kickoff = formatDistanceToNowStrict(new Date(fixture.timestamp), {
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
      <TableCaption className="mt-2">Fixture Detail</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:min-w-[200px]">Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <FixtureTableRow key="Kick Off" value={kickoff} />
        <FixtureTableRow key="Teams" value={teams} />
        <FixtureTableRow key="Scores" value={scores} />
        <FixtureTableRow key="Status" value={status} />
        <FixtureTableRow key="Round" value={fixture.round} />
      </TableBody>
    </Table>
  );
}

const FixtureTableRow = ({ key, value }: { key: string; value: string }) => {
  return (
    <TableRow>
      <TableCell className="group">
        <div className="flex min-w-[130px] items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <code className="break-all font-medium">{key}</code>
          </div>
        </div>
      </TableCell>
      <TableCell className="group">
        <div className="flex items-center justify-between gap-1"></div>
      </TableCell>
    </TableRow>
  );
};
