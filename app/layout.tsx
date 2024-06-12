import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";

import {
  defaultMetadata,
  ogMetadata,
  twitterMetadata,
} from "@/app/shared-metadata";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import Background from "@/components/background";
import { PiProvider } from "@/components/pi-provider";
import ReactQueryProvider from "@/components/providers/react-query";
import GoogleAnalytics from "@/components/providers/google-analytics";
import { env } from "@/env.mjs";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  twitter: {
    ...twitterMetadata,
  },
  openGraph: {
    ...ogMetadata,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${
          inter.className
          // biome-ignore lint/nursery/useSortedClasses: <explanation>
        } ${calSans.variable}`}
      >
        <GoogleAnalytics ga_id={env.NEXT_PUBLIC_GOOGLE_TAG} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReactQueryProvider>
            <Background>{children}</Background>
            <Toaster richColors />
            <TailwindIndicator />
          </ReactQueryProvider>
        </ThemeProvider>
        <PiProvider />
      </body>
    </html>
  );
}
