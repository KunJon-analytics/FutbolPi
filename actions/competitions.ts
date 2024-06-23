import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";

export const getActiveCompetitions = unstable_cache(
  async () =>
    prisma.competition.findMany({
      where: { isActive: true },
    }),
  ["active-competitions"],
  { revalidate: 100000 }
);

export const getCompetitionOverview = unstable_cache(
  async (id: string) =>
    prisma.competition.findUnique({
      where: { id },
      include: {
        fixtures: {
          include: {
            awayTeam: { select: { name: true, logo: true } },
            homeTeam: { select: { name: true, logo: true } },
            predictions: {
              select: {
                user: { select: { username: true, id: true } },
                points: true,
              },
            },
          },
        },
      },
    }),
  ["active-competitions"],
  { revalidate: 3600 }
);
