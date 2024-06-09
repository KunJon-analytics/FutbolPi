export const fixtureStatus = ["NOT_STARTED", "COMPLETED", "ALL"] as const;

export type FixtureFilter = (typeof fixtureStatus)[number];

export function fixtureStatusFormatter(status: FixtureFilter) {
  switch (status) {
    case "ALL":
      return "All Fixtures";
    case "COMPLETED":
      return "Completed Fixtures";
    case "NOT_STARTED":
      return "Scheduled Fixtures";
    default: {
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
    }
  }
}
