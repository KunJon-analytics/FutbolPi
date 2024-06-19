import type { Column } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: "name" | "season" | "created";
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const t = useTranslations("DataTable.CompetitionsTable.Header");

  return <div className={cn(className)}>{t(title)}</div>;
}
