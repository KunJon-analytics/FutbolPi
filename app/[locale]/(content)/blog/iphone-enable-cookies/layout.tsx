import { useLocale } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

import {
  defaultMetadata,
  ogMetadata,
  twitterMetadata,
} from "@/app/shared-metadata";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Enable Cookies on iPhone for Pi Browser: A Step-by-Step Guide";
  const description =
    "Learn how to enable cookies and allow cross-website tracking on your iPhone to enhance your experience with Pi Browser. Follow our easy steps to ensure FutbolPi and other Pi apps work smoothly.";

  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...ogMetadata,
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/blog/iphone-enable-cookies`,
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
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  // Create any shared layout or styles here
  return <>{children}</>;
}
