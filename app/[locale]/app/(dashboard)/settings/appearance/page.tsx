"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

// TODO: improve keyboard navigation

export default function AppearancePage() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("Settings.Appearance");

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2">
      <button type="button" onClick={() => setTheme("light")}>
        <LightModeCard active={theme === "light"} />
        <span className="mt-2 font-light text-muted-foreground text-sm">
          {t("light")}
        </span>
      </button>
      <button type="button" onClick={() => setTheme("dark")}>
        <DarkModeCard active={theme === "dark"} />
        <span className="mt-2 font-light text-muted-foreground text-sm">
          {t("dark")}
        </span>
      </button>
      <button type="button" onClick={() => setTheme("system")}>
        <div className="relative">
          <LightModeCard active={theme === "system"} />
          <div
            className="absolute top-0 right-0 bottom-0 left-0"
            style={{
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            }}
          >
            <DarkModeCard active={theme === "system"} />
          </div>
        </div>
        <span className="mt-2 font-light text-muted-foreground text-sm">
          {t("system")}
        </span>
      </button>
    </div>
  );
}

function LightModeCard({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "items-center rounded-md border-2 border-muted p-1",
        active && "ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
    >
      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
      </div>
    </div>
  );
}

function DarkModeCard({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "items-center rounded-md border-2 border-muted bg-popover p-1",
        active && "ring-2 ring-ring ring-offset-2 ring-offset-background"
      )}
    >
      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
      </div>
    </div>
  );
}
