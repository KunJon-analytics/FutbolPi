import { addDays, format } from "date-fns";

import { inngest } from "@/inngest/client";
import { getCompetitionFixtures } from "@/inngest/utils/api-calls";
import prisma from "@/lib/prisma";
import { FixtureReturnType } from "@/types/football-api";
import { Prisma } from "@prisma/client";

//call once everyday at 00:00hrs
export const getFixtures = inngest.createFunction(
  { id: "fixtures/current-week.get" },
  { cron: "0 0 * * *" },
  async ({ step }) => {
    // get active competitions
    const activeCompetitions = await step.run(
      "get-active-competitions",
      async () => {
        return await prisma.competition.findMany({
          where: { isActive: true },
          select: { apiLeagueId: true, id: true, season: true },
        });
      }
    );

    // get active competitions not started fixtures for the next 7 days
    const notStartedFixtures = await step.run(
      "get-not-started-fixtures",
      async () => {
        if (activeCompetitions.length > 0) {
          let fixtures: FixtureReturnType[] = [];
          for (let index = 0; index < activeCompetitions.length; index++) {
            const competition = activeCompetitions[index];
            const { response } = await getCompetitionFixtures({
              params: {
                from: format(new Date(), "yyyy-MM-dd"),
                league: competition.apiLeagueId,
                season: competition.season,
                status: "NS",
                to: format(addDays(new Date(), 7), "yyyy-MM-dd"),
              },
            });
            if (response && response.length > 0) {
              fixtures = [...fixtures, ...response];
            }
          }
          return fixtures;
        } else {
          return [];
        }
      }
    );

    // get teams and fixtures createmany params.
    const createManyParams = await step.run(
      "get-create-many-params",
      async () => {
        if (notStartedFixtures.length > 0) {
          const teamsInput: Prisma.TeamCreateManyInput[] =
            notStartedFixtures.flatMap((notStartedFixture) => {
              const homeTeam = {
                id: notStartedFixture.teams.home.id,
                logo: notStartedFixture.teams.home.logo,
                name: notStartedFixture.teams.home.name,
              };
              const awayTeam = {
                id: notStartedFixture.teams.away.id,
                logo: notStartedFixture.teams.away.logo,
                name: notStartedFixture.teams.away.name,
              };
              return [homeTeam, awayTeam];
            });
          const fixturesInput: Prisma.FixtureCreateManyInput[] =
            notStartedFixtures.map((notStartedFixture) => {
              const currentCompetition = activeCompetitions.find(
                ({ apiLeagueId, season }) => {
                  return (
                    apiLeagueId === notStartedFixture.league.id &&
                    season === notStartedFixture.league.season
                  );
                }
              );
              return {
                awayTeamId: notStartedFixture.teams.away.id,
                competitionId: currentCompetition?.id as string,
                homeTeamId: notStartedFixture.teams.home.id,
                date: new Date(notStartedFixture.fixture.date),
                id: notStartedFixture.fixture.id,
                round: notStartedFixture.league.round,
                status: "NOT_STARTED",
                timestamp: notStartedFixture.fixture.timestamp,
              };
            });

          return { teamsInput, fixturesInput };
        } else {
          return { teamsInput: [], fixturesInput: [] };
        }
      }
    );

    // create team in database if not created
    const createdTeams = await step.run("create-teams", async () => {
      if (createManyParams.teamsInput.length > 0) {
        return await prisma.team.createMany({
          data: createManyParams.teamsInput,
          skipDuplicates: true,
        });
      }
    });

    // create fixture in database if not created
    const createdFixtures = await step.run("create-fixtures", async () => {
      if (createManyParams.fixturesInput.length > 0) {
        return await prisma.fixture.createMany({
          data: createManyParams.fixturesInput,
          skipDuplicates: true,
        });
      }
    });

    return { createdTeams, createdFixtures };
  }
);
