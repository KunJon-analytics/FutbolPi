import { FixtureReturnType } from "@/types/football-api";

import { footHeaders, getApi } from "./api-football-client";

export type CompFixturesParams = {
  params: {
    league: number; // form db apileagueid
    season: number; // from db league seasons
    from: string; //now
    to: string; // 7days later
    status: "NS";
  };
};

export type TodayFixturesParams = {
  params: {
    ids: string;
  };
};

// returns 1 week NS fixtures/error for a competition
export const getCompetitionFixtures = async (_opts: CompFixturesParams) => {
  const options = { ..._opts, headers: footHeaders };
  const data: { response?: FixtureReturnType[] } = await getApi(
    "fixtures",
    options
  );
  return data;
};

// returns today fixtures with fixture ids string
export const getTodayFixtures = async (_opts: TodayFixturesParams) => {
  const options = { ..._opts, headers: footHeaders };
  const data: { response?: FixtureReturnType[] } = await getApi(
    "fixtures",
    options
  );
  return data;
};
