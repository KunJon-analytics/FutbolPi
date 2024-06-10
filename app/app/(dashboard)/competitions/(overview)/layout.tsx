import type { ReactNode } from "react";

import { Header } from "@/components/dashboard/header";
import AppPageLayout from "@/components/layout/app-page-layout";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <AppPageLayout withHelpCallout>
      <Header
        title="Competitions"
        description="Overview of all competitions."
      />
      {children}
    </AppPageLayout>
  );
}
