import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const TITLE = "FutbolPi: Predict Football Scores | Match Predictions";
export const DESCRIPTION =
  "Predict football scores with FutbolPi! Get match predictions, earn points, and climb the leaderboard. Join our community of passionate football fans.";

export const defaultMetadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  metadataBase: new URL(siteConfig.url),
};

export const twitterMetadata: Metadata["twitter"] = {
  title: TITLE,
  description: DESCRIPTION,
  card: "summary_large_image",
  images: ["/api/og"],
};

export const ogMetadata: Metadata["openGraph"] = {
  title: TITLE,
  description: DESCRIPTION,
  type: "website",
  images: ["/api/og"],
};
