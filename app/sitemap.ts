import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const addPathToBaseURL = (path: string) => `${siteConfig.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/"].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: new Date(),
  }));

  return [...routes];
}
