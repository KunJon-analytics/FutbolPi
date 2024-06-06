import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/header/app-header";

// TODO: make the container min-h-screen and the footer below!
export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4">
      <AppHeader />
      <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
        {children}
      </main>
    </div>
  );
}
