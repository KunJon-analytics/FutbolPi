import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fromUnixTime, isFuture, subHours } from "date-fns";

import { env } from "@/env.mjs";
import { FixtureOutcome } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberFormatter(value: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(value);
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export const isAdmin = (username: string) => {
  return username === env.NEXT_PUBLIC_ADMIN_USERNAME;
};

export const getOutcome = (
  homeGoals: number,
  awayGoals: number
): FixtureOutcome => {
  if (homeGoals === awayGoals) {
    return "DRAW";
  } else if (homeGoals > awayGoals) {
    return "HOME_WIN";
  } else {
    return "AWAY_WIN";
  }
};

export async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

export const canPredict = (timestamp?: number) => {
  if (!timestamp) {
    return false;
  }
  const kickoff = fromUnixTime(timestamp);
  const kickoffMinus1hourIsFuture = isFuture(subHours(kickoff, 1));
  return kickoffMinus1hourIsFuture;
};
