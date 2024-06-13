import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";

// Some function we'll call
export const cancelFixtures = inngest.createFunction(
  { id: "cancel-fixtures" },
  { event: "fixtures/fixture.cancel" },
  async ({ event, step }) => {
    const { idsToDelete } = event.data;

    // send cancelled event notification

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

    // send notification

    // return deleted fixtures id
    return { idsToDelete, ...deletedFixtures };
  }
);
