import { inngest } from "@/inngest/client";
import {
  champion,
  goldenBootStrikers,
  matchdayHeroes,
} from "@/lib/badges/constant";
import prisma from "@/lib/prisma";

// Some function we'll call
export const completeSeason = inngest.createFunction(
  { id: "complete-season" },
  { event: "seasons/season.complete" },
  async ({ step }) => {
    // get season players
    const seasonPlayers = await step.run("get-season-players", async () => {
      return await prisma.prediction.groupBy({
        where: {
          fixture: { competition: { isActive: true } },
        },
        by: ["username"],
        _sum: { points: true },
        orderBy: { _sum: { points: "desc" } },
      });
    });

    if (seasonPlayers.length > 0) {
      const seasonUsernames = seasonPlayers.map((player) => player.username);

      // get user Ids for season players
      const seasonUserIds = await step.run("get-username-and-ids", async () => {
        const players = await prisma.user.findMany({
          where: { username: { in: seasonUsernames } },
          select: { username: true, id: true },
        });
        return seasonUsernames.map((username) => {
          const userId = players.find(
            (seasonPlayer) => seasonPlayer.username === username
          )?.id as string;
          return userId;
        });
      });

      // give out season badge (users with at least 1 prediction) for end of season
      // get season matchday heroes badge
      const matchdayHeroesBadge = await step.run(
        "get-matchday-heroes-badge",
        async () => {
          return await prisma.badge.findUnique({
            where: { name: matchdayHeroes.name },
            select: { id: true },
          });
        }
      );
      // award season heroes badge
      if (!!matchdayHeroesBadge) {
        await step.run("award-matchday-heroes-badge", async () => {
          const params = seasonUserIds.map((userId) => ({
            userId,
            badgeId: matchdayHeroesBadge.id,
          }));

          return prisma.userBadge.createMany({
            data: params,
            skipDuplicates: true,
          });
        });
      }

      // give out top 5 badge
      // get season goldenBootStrikers badge
      const goldenBootStrikersBadge = await step.run(
        "get-golden-boot-strikers-badge",
        async () => {
          return await prisma.badge.findUnique({
            where: { name: goldenBootStrikers.name },
            select: { id: true },
          });
        }
      );
      // award goldenBootStrikers badge
      if (!!goldenBootStrikersBadge) {
        await step.run("award-golden-boot-strikers-badge", async () => {
          const params = seasonUserIds
            .slice(0, goldenBootStrikers.requiredPoints)
            .map((userId) => ({
              userId,
              badgeId: goldenBootStrikersBadge.id,
            }));

          return prisma.userBadge.createMany({
            data: params,
            skipDuplicates: true,
          });
        });
      }

      // give out champion badge
      // get champion badge
      const championBadge = await step.run("get-champion-badge", async () => {
        return await prisma.badge.findUnique({
          where: { name: champion.name },
          select: { id: true },
        });
      });
      // award champion badge
      if (!!championBadge) {
        await step.run("award-champion-badge", async () => {
          const params = seasonUserIds
            .slice(0, champion.requiredPoints)
            .map((userId) => ({
              userId,
              badgeId: championBadge.id,
            }));

          return prisma.userBadge.createMany({
            data: params,
            skipDuplicates: true,
          });
        });
      }
    }

    // make active competitions inactive
    await step.run("make-active-competitions-inactive", async () => {
      return await prisma.competition.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    });

    // send out notification

    // return success
    return { success: true };
  }
);
