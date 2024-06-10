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
import { Prediction } from "@prisma/client";

export function PredictionDetailTable({
  fixture,
  prediction,
}: {
  fixture: FixturesResult;
  prediction: Prediction;
}) {
  const teams = `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`;
  const kickoff = formatDistanceToNowStrict(fromUnixTime(fixture.timestamp), {
    addSuffix: true,
  });
  const scores =
    fixture.status === "NOT_STARTED"
      ? "N/A"
      : `${fixture.homeGoals} - ${fixture.awayGoals}`;
  const predictedScores = `${prediction.homeGoals} - ${prediction.awayGoals}`;
  const status =
    fixture.status === "NOT_STARTED" ? "SCHEDULED" : fixture.status;

  return (
    <Table>
      <TableCaption className="mt-2">Your Prediction Detail</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:min-w-[200px]">Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <FixtureTableRow heading="Teams" value={teams} />
        <FixtureTableRow heading="Real Scores" value={scores} />
        <FixtureTableRow heading="Predicted Scores" value={predictedScores} />
        <FixtureTableRow heading="Kick Off" value={kickoff} />
        <FixtureTableRow heading="Status" value={status} />
        <FixtureTableRow
          heading="Points Won"
          value={prediction.points.toString()}
        />
        <FixtureTableRow heading="Round" value={fixture.round} />
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
