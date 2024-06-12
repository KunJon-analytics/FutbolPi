import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
  name: "FutbolPi",
  description: "Predict, compete, win! FutbolPi – powered by Pi Network",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    telegram: "https://t.me/futbolpioneers",
    piNetwork: "https://minepi.com/gshawn",
  },
};
