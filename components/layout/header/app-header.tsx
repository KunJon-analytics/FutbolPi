import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Shell } from "@/components/dashboard/shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { AppTabs } from "./app-tabs";
import { Breadcrumbs } from "./breadcrumbs";
import { UserNav } from "./user-nav";
import UserNavLoading from "./user-nav-loading";

export function AppHeader() {
  return (
    // TODO: discuss amount of top-3 and top-6
    <header className="sticky top-2 z-50 w-full border-border">
      <Shell className="bg-background/70 px-3 py-3 backdrop-blur-lg md:px-6 md:py-3">
        <div className="flex w-full items-center justify-between">
          <Breadcrumbs />
          {/*  */}
          <div className="flex items-center gap-1">
            <ul className="hidden gap-1 sm:flex">
              <li className="w-full">
                <Button variant="link" asChild>
                  <Link href="/docs" target="_blank">
                    Docs
                    <ArrowUpRight className="ml-1 h-4 w-4 flex-shrink-0" />
                  </Link>
                </Button>
              </li>
            </ul>
            <div className="relative">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="absolute inset-0">
                <Suspense fallback={<UserNavLoading />}>
                  <UserNav />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <AppTabs />
      </Shell>
    </header>
  );
}
