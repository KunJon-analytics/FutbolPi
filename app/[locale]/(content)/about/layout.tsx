import { Metadata } from "next";

import {
  defaultMetadata,
  ogMetadata,
  twitterMetadata,
} from "@/app/shared-metadata";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const title = "About FutbolPi";
  const description = "Discover our mission. Join the game!";

  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...ogMetadata,
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/about`,
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${title}&description=${description}`,
        },
      ],
    },
    twitter: {
      ...twitterMetadata,
      title,
      description,
      images: [
        `${siteConfig.url}/api/og?title=${title}&description=${description}`,
      ],
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create any shared layout or styles here
  return <>{children}</>;
}
