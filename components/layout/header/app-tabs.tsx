"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { TabsContainer, TabsLink } from "@/components/dashboard/tabs-link";
import { pagesConfig } from "@/config/pages";

export function AppTabs() {
  const selectedSegment = useSelectedLayoutSegment();
  const t = useTranslations("DashboardLayout.Pages");
  const locale = useLocale();

  return (
    <div className="-mb-3">
      <TabsContainer>
        {pagesConfig.map(({ title, segment, href }) => {
          const active = segment === selectedSegment;
          return (
            <TabsLink
              key={title}
              active={active}
              href={`/${locale}/app${href}`}
            >
              {t(`${title}.title`)}
            </TabsLink>
          );
        })}
      </TabsContainer>
    </div>
  );
}
