"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Shell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("NotFoundPage");
  // user should go back to dashboard

  return (
    <main className="flex min-h-screen w-full flex-col space-y-6 p-4 md:p-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="mx-auto max-w-xl text-center">
          <Shell>
            <div className="flex flex-col gap-4 p-6 sm:p-12">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-muted-foreground sm:text-lg">
                  {t("firstParagraph")}
                </p>
                <h2 className="font-cal text-2xl sm:text-3xl">{t("title")}</h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {t("secondParagraph")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  variant="link"
                  size="lg"
                  onClick={() => void router.back()}
                >
                  {t("backButton")}
                </Button>
                <Button size="lg" asChild>
                  <Link href={`/${locale}`}>{t("homeButton")}</Link>
                </Button>
              </div>
            </div>
          </Shell>
        </div>
      </div>
    </main>
  );
}
