import Link from "next/link";
import type { ReactNode } from "react";

import { Header } from "@/components/dashboard/header";
import AppPageLayout from "@/components/layout/app-page-layout";
import { ButtonWithDisableTooltip } from "@/components/ui/button-with-disable-tooltip";
import { getSession } from "@/actions/session";
import { isAdmin } from "@/lib/utils";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();
  const disabled = !isAdmin(session.username);

  return (
    <AppPageLayout withHelpCallout>
      <Header
        title="Competitions"
        description="Overview of all competitions."
        actions={
          <ButtonWithDisableTooltip
            tooltip="You reached the limits"
            asChild={!disabled}
            disabled={disabled}
          >
            <Link href="./competitions/new">Create</Link>
          </ButtonWithDisableTooltip>
        }
      />
      {children}
    </AppPageLayout>
  );
}
