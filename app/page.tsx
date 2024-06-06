import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Hero } from "@/components/marketing/hero";
import { BottomCTA } from "@/components/marketing/in-between-cta";
import { Stats } from "@/components/marketing/stats";

export default function Home() {
  return (
    <MarketingLayout>
      <div className="grid gap-8">
        <Hero />
        <Stats />
        <BottomCTA />
      </div>
    </MarketingLayout>
  );
}
