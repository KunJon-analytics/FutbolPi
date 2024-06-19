import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

import { MetricsCard } from "./metrics-card";

type Props = { competitionId: string };

export const NumberOfPlayersCard = async ({ competitionId }: Props) => {
  const t = await getTranslations("CompetitionDetail.Overview");
  const data = await prisma.prediction.groupBy({
    by: ["username"],
    where: { fixture: { competitionId } },
  });
  const value = data.length;

  return (
    <MetricsCard title={t("players")} value={value} suffix="#" variant="info" />
  );
};
