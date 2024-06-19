"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { type FixtureFilter } from "@/lib/competition/utils";

import { SearchParamsPreset } from "./search-params-preset";

export function FixturesPickerPreset({
  disabled,
  defaultValue,
  values,
}: {
  disabled?: boolean;
  defaultValue?: FixtureFilter;
  values: readonly FixtureFilter[];
}) {
  return (
    <SearchParamsPreset
      disabled={disabled}
      defaultValue={defaultValue}
      values={values}
      searchParam="status"
      icon="tag"
      placeholder="Pick status"
      formatter={FixtureTypeFilter}
    />
  );
}

export const FixtureTypeFilter = (status: FixtureFilter) => {
  const t = useTranslations("CompetitionDetail.Fixtures.Status");
  return <>{t(status)}</>;
};
