import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { getOutcome } from "@/lib/utils";

// Some function we'll call
export const finishFixture = inngest.createFunction(
  { id: "finish-fixture" },
  { event: "fixtures/fixture.finish" },
  async ({ event, step }) => {
    const { fixtureId, awayGoals, homeGoals } = event.data;

    // update fixture
    const updatedFixture = await step.run(
      "update-finished-fixture",
      async () => {
        return await prisma.fixture.update({
          where: { id: fixtureId, status: "NOT_STARTED" },
          data: {
            awayGoals,
            homeGoals,
            status: "FINISHED",
            outcome: getOutcome(homeGoals, awayGoals),
          },
        });
      }
    );

    // send complete fixture event
    await step.sendEvent("send-complete-fixture-event", {
      name: "fixtures/fixture.complete",
      data: { fixtureId: updatedFixture.id },
    });

    // send notification

    return updatedFixture;
  }
);
