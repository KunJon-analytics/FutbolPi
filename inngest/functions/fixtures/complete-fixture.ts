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
          select: {
            outcome: true,
            awayGoals: true,
            homeGoals: true,
          },
        });
      }
    );

    if (!!fixtureToComplete?.outcome) {
      //start marking corect outcome
      const markCorrectOutcome = step.run(
        "update-correct-outcome-predictions",
        async () => {
          return prisma.prediction.updateMany({
            where: { fixtureId, predictedOutcome: fixtureToComplete.outcome! },
            data: { points: { increment: 3 } },
          });
        }
      );

      // start marking correct score
      const markCorrectScore = step.run(
        "update-correct-score-predictions",
        async () => {
          return prisma.prediction.updateMany({
            where: {
              fixtureId,
              awayGoals: fixtureToComplete.awayGoals || 0,
              homeGoals: fixtureToComplete.homeGoals || 0,
            },
            data: { points: { increment: 10 } },
          });
        }
      );

      // Run both steps in parallel
      const [correctOutcomePredictions, correctScorePredictions] =
        await Promise.all([markCorrectOutcome, markCorrectScore]);

      // mark fixture as complete
      const completedFixture = await step.run(
        "mark-fixture-complete",
        async () => {
          return await prisma.fixture.update({
            where: {
              id: fixtureId,
            },
            data: { status: "COMPLETED" },
            select: {
              outcome: true,
              awayGoals: true,
              homeGoals: true,
              homeTeam: { select: { name: true } },
              awayTeam: { select: { name: true } },
              _count: { select: { predictions: true } },
            },
          });
        }
      );

      // send notification
      const correctOutcome =
        correctOutcomePredictions.count === 0
          ? "0.00"
          : (
              (correctOutcomePredictions.count /
                completedFixture._count.predictions) *
              100
            ).toFixed(2);
      const correctScoreline =
        correctScorePredictions.count === 0
          ? "0.00"
          : (
              (correctScorePredictions.count /
                completedFixture._count.predictions) *
              100
            ).toFixed(2);
      const message = `🔔 <b>Fixture Update: Results In!</b>

Dear FutbolPi predictors,

The matches are in, and here are the results:

1. <b>${completedFixture.homeTeam.name}</b> vs. <b>${completedFixture.awayTeam.name}</b>
   - Scoreline: <b>${completedFixture.homeGoals}-${completedFixture.awayGoals}</b>
   - Correct outcome predictions: <b>${correctOutcome}%</b>
   - Correct scoreline predictions: <b>${correctScoreline}%</b>

Keep up the great work, and stay tuned for more exciting matches! ⚽️🔮

Best regards,
The FutbolPi Team 🚀`;

      await step.sendEvent("send-completed-fixtures-notification", {
        name: "notifications/telegram.send",
        data: { message, type: "BROADCAST" },
      });

      return {
        completedFixture,
        correctOutcomePredictions,
        correctScorePredictions,
      };
    }
  }
);
