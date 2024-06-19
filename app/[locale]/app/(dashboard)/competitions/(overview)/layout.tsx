import type { ReactNode } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { Header } from "@/components/dashboard/header";
import AppPageLayout from "@/components/layout/app-page-layout";

type Props = { children: ReactNode; params: { locale: string } };

export default async function Layout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("CompetitionPage");

  return (
    <AppPageLayout withHelpCallout>
      <Header title={t("headerTitle")} description={t("headerDescription")} />
      {children}
    </AppPageLayout>
  );
}
