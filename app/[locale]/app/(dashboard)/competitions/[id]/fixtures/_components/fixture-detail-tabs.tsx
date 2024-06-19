"use client";

import { useTranslations } from "next-intl";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/dashboard/tabs";
import { FixtureDetailTable } from "@/components/fixture/fixture-detail-table";
import { PredictionForm } from "@/components/forms/prediction-form";
import { PredictionDetailTable } from "@/components/prediction/prediction-detail-table";
import { FixturesResult } from "@/types";
import { Prediction } from "@prisma/client";

export function FixtureDetailTabs({
  fixture,
  prediction,
}: {
  fixture: FixturesResult;
  prediction: Prediction | null;
}) {
  const t = useTranslations("CompetitionDetail.Fixtures.FixtureDetailTabs");

  const defaultValue = prediction ? "prediction" : "predict";

  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger value="prediction" disabled={!prediction}>
          {t("yourPrediction")}
        </TabsTrigger>
        <TabsTrigger value="predict" disabled={!!prediction}>
          {t("makePrediction")}
        </TabsTrigger>
        <TabsTrigger value="fixture">{t("fixture")}</TabsTrigger>
      </TabsList>
      <TabsContent value="prediction">
        {!!prediction ? (
          <PredictionDetailTable fixture={fixture} prediction={prediction} />
        ) : null}
      </TabsContent>
      <TabsContent value="predict">
        {!prediction ? (
          <PredictionForm
            fixture={{
              awayTeam: fixture.awayTeam.name,
              homeTeam: fixture.homeTeam.name,
              timestamp: fixture.timestamp,
            }}
            defaultValues={{
              awayGoals: 0,
              homeGoals: 0,
              fixtureId: fixture.id,
            }}
          />
        ) : null}
      </TabsContent>
      <TabsContent value="fixture">
        <FixtureDetailTable fixture={fixture} />
      </TabsContent>
    </Tabs>
  );
}
