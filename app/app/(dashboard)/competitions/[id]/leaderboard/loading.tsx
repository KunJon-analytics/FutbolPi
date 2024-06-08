import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Loading() {
  return (
    <div className="grid gap-4">
      <DataTableSkeleton rows={7} />
    </div>
  );
}
