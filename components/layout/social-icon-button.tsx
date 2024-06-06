import Link from "next/link";

import type { Social } from "@/config/socials";

import { Icons } from "../icons";
import { Button } from "../ui/button";

export function SocialIconButton({ href, title, icon }: Social) {
  const Icon = Icons[icon];

  return (
    <Button asChild size="icon" variant="outline">
      <Link href={href} target="_blank" rel="noreferrer">
        <span className="sr-only">{title}</span>
        <Icon className="h-4 w-4" />
      </Link>
    </Button>
  );
}
