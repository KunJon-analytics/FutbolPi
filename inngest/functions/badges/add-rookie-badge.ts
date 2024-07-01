import { inngest } from "@/inngest/client";
import { rookie } from "@/lib/badges/constant";
import prisma from "@/lib/prisma";

// Some function we'll call
export const addRookieBadge = inngest.createFunction(
  { id: "badges/rookie.add" },
  { cron: "5 1 * * *" },
  async ({ step }) => {
    const rookieHolders = await step.run("get-rookie-holders", async () => {
      const holders = await prisma.userBadge.findMany({
        where: { badge: { name: rookie.name } },
        select: { user: { select: { username: true } } },
      });
      return holders.map((holder) => holder.user.username);
    });

    const eligibleRookies = await step.run("get-eligible-rookies", async () => {
      return await prisma.prediction.groupBy({
        by: ["username"],
        where: {
          username: {
            notIn: rookieHolders,
          },
        },
        _sum: {
          points: true,
        },
        having: {
          points: {
            _sum: {
              gte: rookie.requiredPoints,
            },
          },
        },
      });
    });

    if (eligibleRookies.length > 0) {
      const rookieBadge = await step.run("get-rookie-badge", async () => {
        return await prisma.badge.findUniqueOrThrow({
          where: { name: rookie.name },
          select: { id: true },
        });
      });

      const createRookiesParam = await step.run(
        "get-create-many-params",
        async () => {
          const eligibleRookiesUsername = eligibleRookies.map(
            (rookie) => rookie.username
          );
          const eligigibleRookiesId = await prisma.user.findMany({
            where: { username: { in: eligibleRookiesUsername } },
            select: { id: true },
          });
          return eligigibleRookiesId.map((rookie) => ({
            userId: rookie.id,
            badgeId: rookieBadge.id,
          }));
        }
      );

      const newRookieHolders = await step.run(
        "create-rookie-holders",
        async () => {
          const holders = await prisma.userBadge.createMany({
            data: createRookiesParam,
          });
          return holders;
        }
      );

      // return deleted fixtures id
      return { newRookieHolders };
    }

    return { newRookieHolders: 0 };
  }
);
