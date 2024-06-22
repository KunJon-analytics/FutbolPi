// HACK: because the `getRowCanExpand` `renderSubComponent` functions
// have to be in a Client Component

"use client";

import type {
  ColumnFiltersState,
  PaginationState,
  Row,
} from "@tanstack/react-table";
import { Suspense } from "react";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { LoadingAnimation } from "@/components/loading-animation";
import { DataTable } from "@/components/data-table/data-table";
import { FixturesResult } from "@/types";
import useCurrentSession from "@/components/providers/session-provider";
import { LoginButton } from "@/components/layout/login-button";

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
  const fixtureId = row.original.id;
  const t = useTranslations("CompetitionDetail.Fixtures.FixtureDetailTabs");

  const { session, status: sessionStatus } = useCurrentSession();
  const canFetch = session.isLoggedIn && sessionStatus === "success";

  const { status, data, isLoading } = useQuery({
    queryKey: ["fixtures", fixtureId, "predictions"],
    queryFn: canFetch
      ? async () => {
          const response = await fetch(
            `/api/fixtures/${fixtureId}/predictions?token=${session.id}`
          );
          if (!response.ok) {
            throw new Error(t("networkError"));
          }
          return response.json();
        }
      : skipToken,
  });

  if (!canFetch) {
    return (
      <div className="flex items-center justify-center">
        <LoginButton buttonText={t("signIn")} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-4">
        <LoadingAnimation variant="inverse" />
      </div>
    );
  }

  if (status === "error") return <p>{t("errorMessage")}</p>;

  return <FixtureDetailTabs fixture={row.original} prediction={data} />;
}
