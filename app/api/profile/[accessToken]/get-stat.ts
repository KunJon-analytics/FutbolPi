import prisma from "@/lib/prisma";

export type UserStatResponse = Awaited<ReturnType<typeof getStats>>;

export const getStats = async (accessToken: string) => {
  const [predictions, badges] = await prisma.$transaction([
    prisma.prediction.aggregate({
      where: { user: { accessToken } },
      _avg: { points: true },
      _count: { id: true },
      _sum: { points: true },
    }),
    prisma.userBadge.findMany({
      where: { user: { accessToken } },
      include: { badge: true },
    }),
  ]);
  return { predictions, badges };
};
