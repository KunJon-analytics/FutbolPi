import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";

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
import { locales } from "@/intl/config";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${
          inter.className
          // biome-ignore lint/nursery/useSortedClasses: <explanation>
        } ${calSans.variable}`}
      >
        <GoogleAnalytics ga_id={env.NEXT_PUBLIC_GOOGLE_TAG} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ReactQueryProvider>
              <Background>{children}</Background>
              <Toaster richColors />
              <TailwindIndicator />
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <PiProvider />
      </body>
    </html>
  );
}
