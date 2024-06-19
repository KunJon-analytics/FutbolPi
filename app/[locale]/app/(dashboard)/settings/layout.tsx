import { ReactNode } from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import AppPageWithSidebarLayout from "@/components/layout/app-page-with-sidebar-layout";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function SettingsLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  return (
    <AppPageWithSidebarLayout id="settings">
      {children}
    </AppPageWithSidebarLayout>
  );
}
