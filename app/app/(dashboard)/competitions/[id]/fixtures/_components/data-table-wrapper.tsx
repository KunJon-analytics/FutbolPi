// HACK: because the `getRowCanExpand` `renderSubComponent` functions
// have to be in a Client Component

"use client";

import type {
  ColumnFiltersState,
  PaginationState,
  Row,
} from "@tanstack/react-table";
import { Suspense, use } from "react";

import { LoadingAnimation } from "@/components/loading-animation";
import { DataTable } from "@/components/data-table/data-table";
import { FixturesResult } from "@/types";
import { getPrediction } from "@/lib/prediction/schema";

import { columns } from "./columns";
import { FixtureDetailTabs } from "./fixture-detail-tabs";

export function DataTableWrapper({
  data,
  filters,
  pagination,
}: {
  data: FixturesResult[];
  filters?: ColumnFiltersState;
  pagination?: PaginationState;
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      getRowCanExpand={() => true}
      renderSubComponent={renderSubComponent}
      defaultColumnFilters={filters}
      defaultPagination={pagination}
    />
  );
}

function renderSubComponent({ row }: { row: Row<FixturesResult> }) {
  return (
    <Suspense
      fallback={
        <div className="py-4">
          <LoadingAnimation variant="inverse" />
        </div>
      }
    >
      <Details row={row} />
    </Suspense>
  );
}

function Details({ row }: { row: Row<FixturesResult> }) {
  const data = use(getPrediction(row.original.id));

  if (!data) return <p>Something went wrong</p>;

  return <FixtureDetailTabs fixture={row.original} prediction={data} />;
}
