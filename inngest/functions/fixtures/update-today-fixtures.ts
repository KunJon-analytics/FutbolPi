import { addHours, fromUnixTime, isThisHour, subHours } from "date-fns";

import { FinishFixture, inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { getTodayFixtures } from "@/inngest/utils/api-calls";
import { fixtureReminder } from "@/lib/notifications/telegram";
import { env } from "@/env.mjs";

type SendFinishEventParam = FinishFixture & { name: "fixtures/fixture.finish" };

//call every hour
export const updateTodayFixtures = inngest.createFunction(
  { id: "fixtures/today.update" },
  { cron: "0 * * * *" },
  async ({ step }) => {
    // get not started fixtures for today
    const todayFixtures = await step.run("get-today-fixtures", async () => {
      return await prisma.fixture.findMany({
        where: {
          status: "NOT_STARTED",
          date: {
            gte: subHours(new Date(), 12), // 12 hours earlier
            lte: addHours(new Date(), 12), // 12 hours ahead
          },
        },
        select: { id: true },
      });
    });

    // use ids to query football api for the fixtures
    const todayFixturesApi = await step.run(
      "query-today-fixtures-api",
      async () => {
        if (todayFixtures.length < 1) {
          return [];
        }
        const ids = todayFixtures.map(({ id }) => id).toString();
        const { response } = await getTodayFixtures({
          params: {
            ids,
          },
        });
        return response ? response : [];
      }
    );

    // update game date and time stamp just in case it was changed
    const updatedTimestamps = await step.run(
      "update-fixtures-timestamp",
      async () => {
        if (todayFixturesApi.length < 1) {
          return [];
        }
        const result = await prisma.$transaction(
          todayFixturesApi.map((fixture) =>
            prisma.fixture.update({
              where: { id: fixture.fixture.id },
              data: {
                date: new Date(fixture.fixture.date),
                timestamp: fixture.fixture.timestamp,
              },
              select: {
                timestamp: true,
                competitionId: true,
                homeTeam: true,
                awayTeam: true,
              },
            })
          )
        );
        return result;
      }
    );

    // send notification of updatedFixtures about to start (2 hours ahead)
    const deadlineFixtures = updatedTimestamps.filter((fixture) => {
      const kickoff = fromUnixTime(fixture.timestamp);
      const kickoffTimeSubTwoHours = subHours(kickoff, 2);
      return isThisHour(kickoffTimeSubTwoHours);
    });

    if (deadlineFixtures.length > 0) {
      let message = fixtureReminder;

      for (let index = 0; index < deadlineFixtures.length; index++) {
        const fixture = deadlineFixtures[index];
        const fixtureText = `\n\n<b>${fixture.homeTeam.name}</b> vs. <b>${fixture.awayTeam.name}</b>\n📲 <a href='${env.NEXT_PUBLIC_APP_URL}/app/competitions/${fixture.competitionId}/fixtures'>Predict now!!!</a>`;

        message = message.concat(fixtureText);
      }
      message = message.concat("\n\n Get ready to score big! ⚽️🔮");
      await step.sendEvent("send-deadline-fixtures-reminder", {
        name: "notifications/telegram.send",
        data: { message, type: "BROADCAST" },
      });
    }

    // get finshed fixtures by filtering
    const finishedFixtures = await step.run(
      "get-fixtures-finished",
      async () => {
        if (todayFixturesApi.length < 1) {
          return [];
        }
        const fixturesFinished = todayFixturesApi.filter((fixture) => {
          const status = fixture.fixture.status.short;
          return ["FT", "AET", "PEN"].includes(status);
        });

        // return finished fixtures array
        return fixturesFinished;
      }
    );

    let sentFinishFixture: SendFinishEventParam[] = [];

    // send finish event using fan out ... don't nest steps
    if (finishedFixtures.length > 0) {
      sentFinishFixture = finishedFixtures.map((fixture) => {
        return {
          name: "fixtures/fixture.finish",
          data: {
            awayGoals: fixture.goals.away || 0,
            homeGoals: fixture.goals.home || 0,
            fixtureId: fixture.fixture.id,
          },
        };
      });

      await step.sendEvent("send-finish-fixture-event", sentFinishFixture);
    }

    // get cancelled fixtures
    const cancelledFixtures = await step.run(
      "get-cancelled-fixtures",
      async () => {
        if (todayFixturesApi.length < 1) {
          return [];
        }
        const fixturesCancelled = todayFixturesApi.filter((fixture) => {
          const status = fixture.fixture.status.short;
          return ["PST", "CANC", "ABD", "AWD", "WO"].includes(status);
        });

        // delete fixtures and predictions
        return fixturesCancelled.map(({ fixture }) => fixture.id);
      }
    );

    // send cancel fixtures event
    if (cancelledFixtures.length > 0) {
      await step.sendEvent("send-cancel-fixtures-event", {
        name: "fixtures/fixture.cancel",
        data: { idsToDelete: cancelledFixtures },
      });
    }

    return { sentFinishFixture, cancelledFixtures, updatedTimestamps };
  }
);
