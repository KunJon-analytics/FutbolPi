import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stringCardVariants = cva("flex flex-col px-3 py-2 border rounded-lg", {
  variants: {
    variant: {
      default: "border-transparent",
      positive:
        "border-green-500/20 bg-green-500/10 [&>p]:text-green-600 dark:[&>p]:text-green-400",
      negative:
        "border-red-500/20 bg-red-500/10 [&>p]:text-red-600 dark:[&>p]:text-red-400",
      neutral: "border-border/80 bg-muted/30",
      warning:
        "border-yellow-500/20 bg-yellow-500/10 [&>p]:text-yellow-600 dark:[&>p]:text-yellow-400",
      info: "border-blue-500/20 bg-blue-500/10 [&>p]:text-blue-600 dark:[&>p]:text-blue-400",
    },
    fading: {
      true: "opacity-70",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface MetricsCardProps
  extends VariantProps<typeof stringCardVariants> {
  title: string;
  value?: string | null;
  suffix: string;
  /**
   * If true, the card will have a fading effect. Useful for cards that are
   * not yet ready to be displayed or data is empty.
   */
  fading?: boolean;
  className?: string;
}

export function StringCard({
  title,
  value,
  suffix,
  className,
  variant,
  fading,
}: MetricsCardProps) {
  return (
    <div className={cn(stringCardVariants({ variant, fading, className }))}>
      <p className="font-light text-muted-foreground text-sm uppercase">
        {title}
      </p>
      <div className="flex flex-1 items-center gap-2">
        <p className="flex">
          <code className="mr-1 font-mono font-semibold text-xl empty:mr-0">
            {value}
          </code>
          <span className="self-center text-muted-foreground text-xs">
            {suffix}
          </span>
        </p>
      </div>
    </div>
  );
}
