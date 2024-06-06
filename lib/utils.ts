import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { SessionData } from "@/types";
import { env } from "@/env.mjs";
import { FixtureOutcome } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberFormatter(value: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(value);
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
  id: "",
};

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
