"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { TabsContainer, TabsLink } from "@/components/dashboard/tabs-link";
import { pagesConfig } from "@/config/pages";

export function AppTabs() {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <div className="-mb-3">
      <TabsContainer>
        {pagesConfig.map(({ title, segment, href }) => {
          const active = segment === selectedSegment;
          return (
            <TabsLink key={title} active={active} href={`/app${href}`}>
              {title}
            </TabsLink>
          );
        })}
      </TabsContainer>
    </div>
  );
}
