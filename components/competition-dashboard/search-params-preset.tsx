"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Icons } from "@/components/icons";
import type { ValidIcon } from "@/components/icons";
import useUpdateSearchParams from "@/hooks/use-update-search-params";

export function SearchParamsPreset<T extends string>({
  disabled,
  defaultValue,
  values,
  searchParam,
  icon,
  placeholder,
  formatter,
}: {
  disabled?: boolean;
  defaultValue?: T;
  values: readonly T[];
  searchParam: string;
  icon?: ValidIcon;
  placeholder?: string;
  formatter?(value: T): ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const updateSearchParams = useUpdateSearchParams();

  function onSelect(value: T) {
    const searchParams = updateSearchParams({ [searchParam]: value });
    router.replace(`${pathname}?${searchParams}`, { scroll: false });
  }

  const Icon = icon ? Icons[icon] : undefined;

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={onSelect}
      disabled={disabled}
    >
      <SelectTrigger className="w-[150px] bg-background text-left">
        <span className="flex items-center gap-2">
          {Icon ? <Icon className="h-4 w-4" /> : null}
          <SelectValue placeholder={placeholder} />
        </span>
      </SelectTrigger>
      <SelectContent>
        {values.map((value) => (
          <SelectItem key={value} value={value}>
            {formatter?.(value) || value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
