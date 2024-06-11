import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
  name: "FutbolPi",
  description:
    "Predict football scores with FutbolPi! Get match predictions, earn points, and climb the leaderboard. Join our community of passionate football fans.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
    telegram: "https://t.me/futbolpioneers",
  },
};
