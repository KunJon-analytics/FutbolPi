"use client";

import { useTranslations } from "next-intl";
import { ChevronsUpDown } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Page } from "@/config/pages";

import { AppSidebar } from "./app-sidebar";

export function AppMenu({ page }: { page?: Page }) {
  const [open, setOpen] = React.useState(false);

  const selectedSegment = useSelectedLayoutSegment();
  const t = useTranslations("PageTitles");

  if (!page) return null;

  const activeChild = page?.children?.find(
    ({ segment }) => segment === selectedSegment
  );

  return (
    <Collapsible open={open} onOpenChange={(value) => setOpen(value)}>
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        <span className="font-medium text-foreground">
          {activeChild?.title && t(`${activeChild.title}.title`)}
        </span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md font-medium text-sm transition-colors disabled:pointer-events-none hover:bg-accent hover:text-accent-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <ChevronsUpDown className="h-4 w-4" />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <AppSidebar page={page} />
      </CollapsibleContent>
    </Collapsible>
  );
}
