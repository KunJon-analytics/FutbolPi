import { notFound } from "next/navigation";
import * as React from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import { Metrics } from "@/components/competition-dashboard/metrics";
import prisma from "@/lib/prisma";

type Props = {
  params: { locale: string; id: string };
};

export default async function Page({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const id = params.id;

  const competition = await prisma.competition.findUnique({
    where: { id },
    include: {
      fixtures: {
        include: {
          awayTeam: { select: { name: true, logo: true } },
          homeTeam: { select: { name: true, logo: true } },
          predictions: {
            select: {
              user: { select: { username: true, id: true } },
              points: true,
            },
          },
        },
      },
    },
  });

  if (!competition) {
    return notFound();
  }

  const notStartedFixtures = competition.fixtures.filter((fixture) => {
    return fixture.status === "NOT_STARTED";
  }).length;

  const completedFixtures = competition.fixtures.filter((fixture) => {
    return fixture.status === "COMPLETED";
  }).length;

  const noOfPredictions = competition.fixtures.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.predictions.length;
    },
    0
  );

  const initialTeamArray: number[] = [];

  const uniqueTeamsArray = competition.fixtures.reduce((acc, curr) => {
    if (!acc.includes(curr.awayTeamId)) {
      acc.push(curr.awayTeamId);
    }
    if (!acc.includes(curr.homeTeamId)) {
      acc.push(curr.homeTeamId);
    }

    return acc;
  }, initialTeamArray);

  const noOfTeams = uniqueTeamsArray.length;

  const metrics = {
    notStartedFixtures,
    completedFixtures,
    noOfPredictions,
    noOfTeams,
    competitionId: id,
  };

  return (
    <div className="grid gap-4">
      <Metrics metrics={metrics} />
    </div>
  );
}
