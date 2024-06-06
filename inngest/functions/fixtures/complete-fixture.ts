import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";

// Some function we'll call
export const completeFixtures = inngest.createFunction(
  { id: "complete-fixture" },
  { event: "fixtures/fixture.complete" },
  async ({ event, step }) => {
    const { fixtureId } = event.data;

    // get fixtures
    const fixtureToComplete = await step.run(
      "get-fixture-to-complete",
      async () => {
        return await prisma.fixture.findUnique({
          where: { id: fixtureId, status: "FINISHED" },
        });
      }
    );

    if (!!fixtureToComplete?.outcome) {
      //start marking corect outcome
      const correctOutcomePredictions = await step.run(
        "update-correct-outcome-predictions",
        async () => {
          return await prisma.prediction.updateMany({
            where: { fixtureId, predictedOutcome: fixtureToComplete.outcome! },
            data: { points: { increment: 3 } },
          });
        }
      );

      // start marking correct score
      const correctScorePredictions = await step.run(
        "update-correct-score-predictions",
        async () => {
          return await prisma.prediction.updateMany({
            where: {
              fixtureId,
              awayGoals: fixtureToComplete.awayGoals || 0,
              homeGoals: fixtureToComplete.homeGoals || 0,
            },
            data: { points: { increment: 10 } },
          });
        }
      );

      // mark fixture as complete
      const completedFixture = await step.run(
        "update-correct-score-predictions",
        async () => {
          return await prisma.fixture.update({
            where: {
              id: fixtureId,
            },
            data: { status: "COMPLETED" },
          });
        }
      );

      // send notification

      return {
        completedFixture,
        correctOutcomePredictions,
        correctScorePredictions,
      };
    }
  }
);
