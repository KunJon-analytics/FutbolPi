import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/intl/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import StarsBadge, { StarsBadgeFallback } from "./stars-badge";

export async function Hero() {
  const t = await getTranslations("Index.Hero");

  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center md:my-20 md:p-6">
      <div>
        <Badge variant="outline" className="backdrop-blur-[2px]">
          <Link
            href={siteConfig.links.telegram.channel}
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            {t("heroBadgeText")}
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </Badge>
      </div>
      <div className="flex flex-col gap-6">
        <h1
          className={cn(
            "font-cal text-4xl text-foreground md:text-6xl",
            "bg-gradient-to-tl from-0% from-[hsl(var(--muted))] to-40% to-[hsl(var(--foreground))] bg-clip-text text-transparent"
          )}
        >
          {t("heroTitle")}
        </h1>
        <p className="mx-auto max-w-md text-lg text-muted-foreground md:max-w-xl md:text-xl">
          {t("heroDescription")}
        </p>
      </div>
      <div className="my-4 grid gap-2 sm:grid-cols-2">
        <div className="text-center sm:block sm:text-right">
          <Button className="w-48 rounded-full sm:w-auto" asChild>
            <Link href="/app/competitions">{t("heroPrimaryBtnText")}</Link>
          </Button>
        </div>
        <div className="text-center sm:block sm:text-left">
          <Button
            variant="outline"
            className="w-48 rounded-full sm:w-auto"
            asChild
          >
            {/* // change to number of active users */}
            <Link href="/app/competitions">
              {t("heroSecondaryBtnText")}
              <Suspense fallback={<StarsBadgeFallback />}>
                <StarsBadge />
              </Suspense>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
