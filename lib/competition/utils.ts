import { FixtureStatus } from "@prisma/client";

const fixtureStatus = Object.values(FixtureStatus);

export const extendedFixtureStatus = [...fixtureStatus, "ALL"] as const;

export type FixtureFilter = (typeof extendedFixtureStatus)[number];

export function fixtureStatusFormatter(status: FixtureFilter) {
  switch (status) {
    case "ALL":
      return "All Fixtures";
    case "COMPLETED":
      return "Completed Fixtures";
    case "FINISHED":
      return "Finished Fixtures";
    case "NOT_STARTED":
      return "Scheduled Fixtures";
    default: {
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
    }
  }
}
