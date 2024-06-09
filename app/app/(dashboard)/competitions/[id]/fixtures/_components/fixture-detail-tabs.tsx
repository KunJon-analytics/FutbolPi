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

export async function FixtureDetailTabs({
  fixture,
  prediction,
}: {
  fixture: FixturesResult;
  prediction: Prediction | null;
}) {
  const defaultValue = prediction ? "prediction" : "predict";
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger value="prediction" disabled={!prediction}>
          Your Prediction
        </TabsTrigger>
        <TabsTrigger value="predict" disabled={!!prediction}>
          Make Prediction
        </TabsTrigger>
        <TabsTrigger value="fixture">Fixture</TabsTrigger>
      </TabsList>
      <TabsContent value="prediction">
        {!!prediction ? (
          <PredictionDetailTable fixture={fixture} prediction={prediction} />
        ) : null}
      </TabsContent>
      <TabsContent value="predict">
        <PredictionForm
          fixture={{
            awayTeam: fixture.awayTeam.name,
            homeTeam: fixture.homeTeam.name,
            timestamp: fixture.timestamp,
          }}
          defaultValues={{ awayGoals: 0, homeGoals: 0, fixtureId: fixture.id }}
        />
      </TabsContent>
      <TabsContent value="fixture">
        <FixtureDetailTable fixture={fixture} />
      </TabsContent>
    </Tabs>
  );
}
