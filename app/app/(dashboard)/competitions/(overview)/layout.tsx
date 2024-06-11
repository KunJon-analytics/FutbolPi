import type { ReactNode } from "react";

import { Header } from "@/components/dashboard/header";
import AppPageLayout from "@/components/layout/app-page-layout";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <AppPageLayout withHelpCallout>
      <Header
        title="Active Competitions"
        description="Predict outcomes for top leagues and cups. Score big with FootballPi!"
      />
      {children}
    </AppPageLayout>
  );
}
