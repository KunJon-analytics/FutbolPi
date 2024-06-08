import Link from "next/link";

import { MetricsCard } from "./metrics-card";

type CompetitionMetrics = {
  notStartedFixtures: number;
  completedFixtures: number;
  noOfTeams: number;
  activePlayers: number;
  noOfPredictions: number;
};

export function Metrics({ metrics }: { metrics: CompetitionMetrics }) {
  return (
    <div className="@container grid gap-6">
      <div className="grid grid-cols-2 gap-4 @3xl:grid-cols-5 @xl:grid-cols-4 @3xl:gap-6">
        <MetricsCard
          title="teams"
          value={metrics.noOfTeams}
          suffix="#"
          variant="info"
        />
        <MetricsCard
          title="players"
          value={metrics.activePlayers}
          suffix="#"
          variant="info"
        />

        <MetricsCard
          title="predictions"
          value={metrics.noOfPredictions}
          suffix={`#`}
          variant="info"
        />

        <MetricsCard
          title="finished fixtures"
          value={metrics.completedFixtures}
          suffix="#"
          variant="positive"
        />
        <MetricsCard
          title="scheduled fixtures"
          value={metrics.notStartedFixtures}
          suffix="#"
          variant="neutral"
        />
      </div>
      <div className="grid gap-2">
        <p className="text-muted-foreground text-xs">
          Start making predictions in the{" "}
          <Link
            href={`./fixtures`}
            className="underline underline-offset-4 hover:no-underline"
          >
            competition fixtures
          </Link>
        </p>
      </div>
    </div>
  );
}
