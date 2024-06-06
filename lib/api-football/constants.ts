export type LeagueType = "Cup" | "League";

export type FixtureStatus = "NS" | "FT" | "AET" | "PEN";

// FIXTURE STATUS = NOT_STARTED, LIVE, FINISHED

export type League = {
  id: number;
  name: string;
  type: LeagueType;
  logo: string;
  season: number;
};

export const euros: League = {
  id: 4,
  name: "Euro Championship",
  type: "Cup",
  logo: "https://media.api-sports.io/football/leagues/4.png",
  season: 2024,
};

export const copaAmerica: League = {
  id: 9,
  name: "Copa America",
  type: "Cup",
  logo: "https://media.api-sports.io/football/leagues/9.png",
  season: 2024,
};
