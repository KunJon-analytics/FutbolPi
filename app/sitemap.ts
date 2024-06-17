import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const addPathToBaseURL = (path: string) => `${siteConfig.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/app/login",
    "/blog/iphone-enable-cookies",
  ].map((route) => ({
    url: addPathToBaseURL(route),
    lastModified: new Date(),
  }));

  return [...routes];
}
