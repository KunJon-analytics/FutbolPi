import { unstable_setRequestLocale } from "next-intl/server";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Enable static rendering
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  // Create any shared layout or styles here
  return (
    <MarketingLayout>
      <article className="mx-auto max-w-xl px-6 py-20">
        <div className="">
          <div
            className={cn(
              "prose prose-slate max-w-none dark:prose-invert dark:text-slate-400",
              // headings
              "prose-headings:scroll-mt-28 prose-headings:font-cal prose-headings:font-semibold lg:prose-headings:scroll-mt-[8.5rem]",
              // lead
              "prose-lead:text-slate-500 dark:prose-lead:text-slate-400",
              // links
              "prose-a:font-semibold dark:prose-a:text-blue-400",
              // link underline
              "prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.blue.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.blue.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]",
              // pre
              "prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10",
              // hr
              "dark:prose-hr:border-slate-800"
            )}
          >
            {children}
          </div>
        </div>
      </article>
    </MarketingLayout>
  );
}
