export const fixtureStatus = ["NOT_STARTED", "COMPLETED", "ALL"] as const;

export type FixtureFilter = (typeof fixtureStatus)[number];
