import prisma from "@/lib/prisma";

import { MetricsCard } from "./metrics-card";

type Props = { competitionId: string };

export const NumberOfPlayersCard = async ({ competitionId }: Props) => {
  const data = await prisma.prediction.groupBy({
    by: ["username"],
    where: { fixture: { competitionId } },
  });
  const value = data.length;

  return (
    <MetricsCard title="players" value={value} suffix="#" variant="info" />
  );
};
