import { copaAmerica, euros } from "@/lib/api-football/constants";
import {
  champion,
  goldenBootStrikers,
  matchdayHeroes,
  rookie,
} from "@/lib/badges/constant";
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

  await prisma.badge.upsert({
    where: { name: rookie.name },
    create: { ...rookie, icon: "award" },
    update: { ...rookie },
  });
  await prisma.badge.upsert({
    where: { name: champion.name },
    create: { ...champion, icon: "award" },
    update: { ...champion },
  });
  await prisma.badge.upsert({
    where: { name: goldenBootStrikers.name },
    create: { ...goldenBootStrikers, icon: "award" },
    update: { ...goldenBootStrikers },
  });
  await prisma.badge.upsert({
    where: { name: matchdayHeroes.name },
    create: { ...matchdayHeroes, icon: "award" },
    update: { ...matchdayHeroes },
  });

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
