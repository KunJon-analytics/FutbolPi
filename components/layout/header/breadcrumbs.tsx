import { Slash } from "lucide-react";
import { Fragment } from "react";

import { notEmpty } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Link } from "@/intl/navigation";

export function Breadcrumbs() {
  const breadcrumbs = [
    // !isRoot ? page?.title : null,
    // label,
  ].filter(notEmpty);

  return (
    <div className="flex items-center">
      <Link href="/" className="shrink-0">
        <Icons.logo className="rounded-full border border-border h-8 w-8" />
      </Link>
      <Slash className="-rotate-12 mr-0.5 ml-2.5 h-4 w-4 text-muted-foreground" />

      {breadcrumbs.map((breadcrumb) => (
        <Fragment key={breadcrumb}>
          <Slash className="-rotate-12 mr-2.5 ml-0.5 h-4 w-4 text-muted-foreground" />
          <p className="rounded-md font-medium text-primary text-sm">
            {breadcrumb}
          </p>
        </Fragment>
      ))}
    </div>
  );
}
