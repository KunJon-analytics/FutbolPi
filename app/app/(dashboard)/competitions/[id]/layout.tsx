import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { Header } from "@/components/dashboard/header";
import AppPageWithSidebarLayout from "@/components/layout/app-page-with-sidebar-layout";
import { StatusDotWithTooltip } from "@/components/competition/status-dot-with-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
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
            {/*  change avatar to <Image/> to help cache image...add remote patterns image*/}
            <Avatar>
              <AvatarImage src={competition.logo} alt={competition.name} />
              <AvatarFallback>
                {competition.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
        }
      />
      {children}
    </AppPageWithSidebarLayout>
  );
}
