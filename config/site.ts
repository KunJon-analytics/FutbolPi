import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
  name: "FutbolPi",
  description: "Predict, compete, win! FutbolPi – powered by Pi Network",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    telegram: {
      channel: "https://t.me/futbolpioneers",
      group: "https://t.me/futbolpichat",
    },
    piNetwork: "https://minepi.com/gshawn",
    twitter: "https://x.com/FutbolPioneers",
  },
  businessLogic: { tipsPoint: 30, tipsAmount: 1 },
};
