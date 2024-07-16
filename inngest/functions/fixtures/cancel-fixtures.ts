import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";

// Some function we'll call
export const cancelFixtures = inngest.createFunction(
  { id: "cancel-fixtures" },
  { event: "fixtures/fixture.cancel" },
  async ({ event, step }) => {
    const { idsToDelete } = event.data;

    // let it wait for 10 minutes then check the fixture again

    const toDeleteFixures = await step.run(
      "get-fixtures-to-delete",
      async () => {
        return await prisma.fixture.findMany({
          where: { id: { in: idsToDelete } },
          select: {
            homeTeam: { select: { name: true } },
            awayTeam: { select: { name: true } },
          },
        });
      }
    );

    // send cancelled event notification
    let message = `🔔 <b>Fixture Update: Cancellations</b>\n\nDear FutbolPi community,\n\nUnfortunately, due to unforeseen circumstances, some fixtures have been <b>canceled</b>. As a result, all predictions for the following matches are <b>voided</b>:\n`;

    for (let index = 0; index < toDeleteFixures.length; index++) {
      const fixture = toDeleteFixures[index];
      const fixtureText = `\n- <b>${fixture.homeTeam.name}</b> vs. <b>${fixture.awayTeam.name}</b>`;
      message = message.concat(fixtureText);
    }
    message = message.concat(
      "\n\nWe appreciate your understanding, and stay tuned for more exciting matches! ⚽️🔮 \n\nBest regards,\nThe FutbolPi Team 🚀"
    );

    await step.sendEvent("send-cancelled-fixtures-notification", {
      name: "notifications/telegram.send",
      data: { message, type: "BROADCAST" },
    });

    // delete fixtures
    const deletedFixtures = await step.run("bulk-delete-fixtures", async () => {
      return await prisma.fixture.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
        },
      });
    });

    // return deleted fixtures id
    return { idsToDelete, ...deletedFixtures };
  }
);
