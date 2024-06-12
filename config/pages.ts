import type { ValidIcon } from "@/components/icons";

import { siteConfig } from "./site";

export type Page = {
  title: string;
  description: string;
  href: string;
  icon: ValidIcon;
  disabled?: boolean;
  segment: string;
  children?: Page[];
};

export const settingsPagesConfig: Page[] = [
  {
    title: "Appearance",
    description: "Appearance settings for the user.",
    href: "/settings/appearance",
    icon: "sun",
    segment: "appearance",
  },
  {
    title: "User",
    description: "Profile settings for the user.",
    href: "/settings/user",
    icon: "user",
    segment: "user",
  },
];

export const competitionPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "View all competitions",
    href: "/competitions/[id]/overview",
    icon: "line-chart",
    segment: "overview",
  },
  {
    title: "Leaderboard",
    description: "View top players",
    href: "/competitions/[id]/leaderboard",
    icon: "table",
    segment: "leaderboard",
  },
  {
    title: "Fixtures",
    description: "View all competition fixtures.",
    href: "/competitions/[id]/fixtures",
    icon: "play",
    segment: "fixtures",
  },
];

export type PageId = (typeof pagesConfig)[number]["segment"];

export const pagesConfig = [
  {
    title: "Competitions",
    description: "See all available competitions",
    href: "/competitions",
    icon: "activity",
    segment: "competitions",
    children: competitionPagesConfig,
  },
  {
    title: "Settings",
    description: "Your profile settings",
    href: "/settings/user",
    icon: "user",
    segment: "settings",
    children: settingsPagesConfig,
  },
] as const satisfies readonly Page[];

export const marketingPagesConfig = [
  {
    href: "/about",
    title: "About",
    description:
      "Discover our story, mission, and the exciting world of FutbolPi!",
    segment: "about",
    icon: "search",
  },
  {
    href: "/app/competitions",
    title: "Predict",
    description:
      "Explore upcoming fixtures and make your predictions for active leagues and cups!",
    segment: "predict",
    icon: "toy-brick",
  },
  {
    href: siteConfig.links.telegram,
    title: "Telegram",
    description:
      "Join our lively Telegram group to discuss football, share predictions, and connect with fellow fans",
    segment: "telegram",
    icon: "telegram",
  },
] as const satisfies readonly Page[];

export function getPageBySegment(
  segment: string | string[],
  currentPage: readonly Page[] = pagesConfig
): Page | undefined {
  if (typeof segment === "string") {
    const page = currentPage.find((page) => page.segment === segment);
    return page;
  }
  if (Array.isArray(segment) && segment.length > 0) {
    const [firstSegment, ...restSegments] = segment;
    const childPage = currentPage.find((page) => page.segment === firstSegment);
    if (childPage?.children) {
      return getPageBySegment(restSegments, childPage.children);
    }
    return childPage;
  }
  return undefined;
}

export const defaultRedirectTo = "/app/competitions";
