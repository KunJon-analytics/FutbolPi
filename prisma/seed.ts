import { copaAmerica, euros } from "@/lib/api-football/constants";
import { rookie } from "@/lib/badges/constant";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingEuros = await prisma.competition.findFirst({
    where: { apiLeagueId: euros.id },
  });

  if (!existingEuros) {
    await prisma.competition.create({
      data: {
        apiLeagueId: euros.id,
        isActive: true,
        logo: euros.logo,
        name: euros.name,
        season: euros.season,
        type: "Cup",
      },
    });
  }

  const existingCopa = await prisma.competition.findFirst({
    where: { apiLeagueId: copaAmerica.id },
  });

  if (!existingCopa) {
    await prisma.competition.create({
      data: {
        apiLeagueId: copaAmerica.id,
        isActive: true,
        logo: copaAmerica.logo,
        name: copaAmerica.name,
        season: copaAmerica.season,
        type: "Cup",
      },
    });
  }

  const existingRookie = await prisma.badge.findUnique({
    where: { name: rookie.name },
  });
  if (!existingRookie) {
    await prisma.badge.create({ data: { ...rookie, icon: "award" } });
  }

  const allCompetitions = await prisma.competition.findMany();
  const allBadges = await prisma.badge.findMany();
  console.log({ allCompetitions });
  console.log({ allBadges });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
