import { unstable_setRequestLocale } from "next-intl/server";

import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Hero } from "@/components/marketing/hero";
import { BottomCTA } from "@/components/marketing/in-between-cta";
import { Stats } from "@/components/marketing/stats";
import { TopBallers } from "@/components/marketing/top-ballers";

export const revalidate = 3600; // revalidate at most every hour

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return (
    <MarketingLayout>
      <div className="grid gap-8">
        <Hero />
        <Stats />
        <TopBallers />
        <BottomCTA />
      </div>
    </MarketingLayout>
  );
}
