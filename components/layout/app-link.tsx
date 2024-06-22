"use client";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Link } from "@/intl/navigation";
import type { pathnames } from "@/intl/config";

import type { ValidIcon } from "../icons";
import { Icons } from "../icons";
import { ComponentProps } from "react";

const linkVariants = cva(
  "text-muted-foreground group flex w-full min-w-[200px] items-center rounded-md border px-3 py-1",
  {
    variants: {
      variant: {
        default: "hover:bg-muted/50 hover:text-foreground border-transparent",
        active: "bg-muted/50 border-border text-foreground font-medium",
        disabled: "pointer-events-none opacity-60 border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AppLinkProps {
  label: string;
  icon?: ValidIcon;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

export function AppLink<Pathname extends keyof typeof pathnames>({
  label,
  href,
  icon,
  disabled,
  className,
  active,
  ...props
}: ComponentProps<typeof Link<Pathname>> & AppLinkProps) {
  const Icon = icon && Icons[icon];

  const variant = disabled ? "disabled" : active ? "active" : "default";

  return (
    <Link
      href={href}
      className={cn(linkVariants({ variant, className }))}
      aria-disabled={disabled}
      {...props}
    >
      {Icon ? <Icon className={cn("mr-2 h-4 w-4")} /> : null}
      {label}
    </Link>
  );
}
