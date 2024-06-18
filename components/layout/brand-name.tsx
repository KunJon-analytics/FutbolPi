import Link from "next/link";
import * as React from "react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

// Hottake: you don't need a features page if you have a changelog page
// Except for SEO

export function BrandName() {
  const t = useTranslations("Layout.MarketingHeader.BrandName");

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href="/"
          className="font-cal text-lg text-muted-foreground hover:text-foreground"
        >
          {siteConfig.name}
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem asChild>
          <a href="/assets/logos/logo.svg" download="logo.svg">
            {t("downloadSVG")}
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
