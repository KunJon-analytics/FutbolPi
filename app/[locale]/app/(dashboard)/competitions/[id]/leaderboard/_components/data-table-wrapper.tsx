// HACK: because the `getRowCanExpand` `renderSubComponent` functions
// have to be in a Client Component

"use client";

import type {
  ColumnFiltersState,
  PaginationState,
  Row,
} from "@tanstack/react-table";

import { Prisma } from "@prisma/client";
import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";

export function DataTableWrapper({
  data,
  filters,
  pagination,
}: {
  data: (Prisma.PickEnumerable<
    Prisma.PredictionGroupByOutputType,
    "username"[]
  > & {
    _sum: {
      points: number | null;
    };
  })[];
  filters?: ColumnFiltersState;
  pagination?: PaginationState;
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      getRowCanExpand={() => false}
      renderSubComponent={renderSubComponent}
      defaultColumnFilters={filters}
      defaultPagination={pagination}
    />
  );
}

function renderSubComponent({
  row,
}: {
  row: Row<
    Prisma.PickEnumerable<Prisma.PredictionGroupByOutputType, "username"[]> & {
      _sum: {
        points: number | null;
      };
    }
  >;
}) {
  return <></>;
}
