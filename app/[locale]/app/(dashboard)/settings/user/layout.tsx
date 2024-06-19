import { useTranslations } from "next-intl";

import { Header } from "@/components/dashboard/header";
import { getPageBySegment } from "@/config/pages";

const page = getPageBySegment(["settings", "user"]);

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("PageTitles");

  return (
    <>
      <Header
        title={page?.title && t(`${page.title}.title`)}
        description={page?.title && t(`${page.title}.description`)}
      />
      {children}
    </>
  );
}
