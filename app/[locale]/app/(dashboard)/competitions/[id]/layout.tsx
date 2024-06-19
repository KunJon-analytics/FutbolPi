import { notFound } from "next/navigation";
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";

import prisma from "@/lib/prisma";
import { Header } from "@/components/dashboard/header";
import AppPageWithSidebarLayout from "@/components/layout/app-page-with-sidebar-layout";
import { StatusDotWithTooltip } from "@/components/competition/status-dot-with-tooltip";

type Props = {
  children: React.ReactNode;
  params: { id: string; locale: string };
};

export default async function Layout({ children, params }: Props) {
  unstable_setRequestLocale(params.locale);
  const id = params.id;

  const competition = await prisma.competition.findUnique({ where: { id } });

  if (!competition) {
    return notFound();
  }

  return (
    <AppPageWithSidebarLayout id="competitions">
      <Header
        title={competition.name}
        description={
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <span className="max-w-xs truncate md:max-w-md">
              {competition.season}
            </span>
            <span className="text-muted-foreground/50 text-xs">•</span>
            <StatusDotWithTooltip
              isActive={competition.isActive}
              type={competition.type}
            />

            <span className="text-muted-foreground/50 text-xs">•</span>
            <Image
              className="w-8 h-8 rounded-full"
              src={competition.logo}
              alt={competition.name}
              width={8}
              height={8}
            />
          </div>
        }
      />
      {children}
    </AppPageWithSidebarLayout>
  );
}
