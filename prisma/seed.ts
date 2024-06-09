import { copaAmerica, euros, carioca2 } from "@/lib/api-football/constants";
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

  const existingCarioca = await prisma.competition.findFirst({
    where: { apiLeagueId: carioca2.id },
  });

  if (!existingCarioca) {
    await prisma.competition.create({
      data: {
        apiLeagueId: carioca2.id,
        isActive: true,
        logo: carioca2.logo,
        name: carioca2.name,
        season: carioca2.season,
        type: carioca2.type,
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

  const allCompetitions = await prisma.competition.findMany();
  console.log({ allCompetitions });
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
