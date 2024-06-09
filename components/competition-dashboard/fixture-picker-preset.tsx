"use client";

import * as React from "react";

import { SearchParamsPreset } from "./search-params-preset";
import {
  fixtureStatusFormatter,
  type FixtureFilter,
} from "@/lib/competition/utils";

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
      formatter={fixtureStatusFormatter}
    />
  );
}
