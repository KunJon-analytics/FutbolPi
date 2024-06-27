"use client";

import { useLocale, useTranslations } from "next-intl";
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

import SocialCard from "./social-card";

export function PredictionDetailTable({
  fixture,
  prediction,
}: {
  fixture: FixturesResult;
  prediction: Prediction;
}) {
  const t = useTranslations("CompetitionDetail.Fixtures.TabsDetailTable");
  const locale = useLocale();

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
      <TableCaption className="mt-2">
        {t("predictionTableCaption")}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:min-w-[200px]">{t("key")}</TableHead>
          <TableHead>{t("value")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="group">
            <div className="flex min-w-[130px] items-center justify-between gap-2">
              <div className="flex items-center justify-between gap-2">
                <code className="break-all font-medium">{t("action")}</code>
              </div>
            </div>
          </TableCell>
          <TableCell className="group">
            <div className="flex items-center justify-between gap-1">
              <SocialCard
                params={{
                  awayGoal: prediction.awayGoals,
                  awayTeam: fixture.awayTeam.name,
                  competitionId: fixture.competitionId,
                  homeGoal: prediction.homeGoals,
                  homeTeam: fixture.homeTeam.name,
                  locale,
                  round: fixture.round,
                }}
              />
            </div>
          </TableCell>
        </TableRow>

        <FixtureTableRow heading={t("teams")} value={teams} />
        <FixtureTableRow heading={t("realScores")} value={scores} />
        <FixtureTableRow
          heading={t("predictedScores")}
          value={predictedScores}
        />
        <FixtureTableRow heading={t("kickoff")} value={kickoff} />
        <FixtureTableRow heading={t("status")} value={status} />
        <FixtureTableRow
          heading={t("pointsWon")}
          value={prediction.points.toString()}
        />
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
