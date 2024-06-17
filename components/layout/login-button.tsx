"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "../ui/button";

export function LoginButton({ className, ...props }: ButtonProps) {
  const session = { status: "unauthenticated" };

  return (
    <Button asChild className={cn("rounded-full", className)} {...props}>
      {session.status === "authenticated" ? (
        <Link href="/app/competitions">Dashboard</Link>
      ) : (
        <Link href="/app/competitions">Sign In</Link>
      )}
    </Button>
  );
}
