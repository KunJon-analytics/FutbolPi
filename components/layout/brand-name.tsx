import Link from "next/link";
import * as React from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { siteConfig } from "@/config/site";

// Hottake: you don't need a features page if you have a changelog page
// Except for SEO

export function BrandName() {
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
          <a href="/assets/logos/OpenStatus.svg" download="openstatus.svg">
            Download SVG
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
