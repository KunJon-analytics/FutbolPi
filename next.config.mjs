import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./intl/i18n.tsx");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  async redirects() {
    return [
      {
        source: "/telegram",
        destination: "https://t.me/futbolpichat",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/FutbolPioneers",
        permanent: true,
      },
      {
        source: "/announcements",
        destination: "https://t.me/futbolpioneers",
        permanent: true,
      },
      {
        source: "/pi",
        destination: "https://minepi.com/gshawn",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        port: "",
        pathname: "/football/**",
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withNextIntl(withMDX(nextConfig));
