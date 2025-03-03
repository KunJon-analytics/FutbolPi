"use client";

import { useTranslations } from "next-intl";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

import useUpdateSearchParams from "@/hooks/use-update-search-params";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

// REMINDER: pageIndex pagination issue - jumping back to 0 after change

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const updateSearchParams = useUpdateSearchParams();
  const router = useRouter();

  const t = useTranslations("DataTable.Pagination");

  const updatePageSearchParams = (
    values: Record<string, number | string | null>
  ) => {
    const newSearchParams = updateSearchParams(values);
    router.replace(`?${newSearchParams}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div>
        <p className="text-muted-foreground text-sm hidden sm:flex">
          {table.getFilteredRowModel().rows.length} {t("rowsFiltered")}
        </p>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-sm">{t("rowsPerPage")}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              updatePageSearchParams({ pageSize: value });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center font-medium text-sm">
          {t("page", {
            pageIndex: table.getState().pagination.pageIndex + 1,
            pageCount: table.getPageCount(),
          })}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">{t("firstPage")}</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">{t("previousPage")}</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">{t("nextPage")}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">{t("lastPage")}</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
