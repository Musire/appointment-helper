"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export type OptionType =
  | "all"
  | "checkedin"
  | "pending"
  | "cancelled"
  | "noshow"
  | "inprogress"
  | "completed";

const options: OptionType[] = [
  "all",
  "cancelled",
  "noshow",
  "completed",
];

export type ItemWithFilters = {
  status: string;
  user?: {
    fullName: string;
  };
  [key: string]: any;
};

type Props = {
  items: {
    id: string;
    scheduledAt: Date;
    clientName: string;
    status: string;
  }[];
};

export type DateRangeValue = {
  from?: string;
  to?: string;
};

export default function useHistoryFilters({ items }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedDate: DateRangeValue = useMemo(
    () => ({
      from: searchParams.get("from") || undefined,
      to: searchParams.get("to") || undefined,
    }),
    [searchParams]
  );

  const [selected, setSelected] = useState<OptionType[]>(["all"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleDateSelect = (range: DateRangeValue) => {
    const { from, to } = range;

    // Only commit a complete date range.
    if (!from || !to) return;

    const params = new URLSearchParams(searchParams.toString());

    // Update both dates together.
    params.set("from", from);
    params.set("to", to);

    // Remove the old single-date parameter.
    params.delete("date");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelect = (rawValue: string) => {
    const value = (rawValue || "").toLowerCase() as OptionType;

    setSelected((prev) => {
      if (prev.includes("all")) {
        if (value === "all") return [];
        return [value];
      }

      if (value === "all") return ["all"];

      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }

      return [...prev, value];
    });
  };

  const filteredItems = useMemo(() => {
    if (!selected.length) return [];

    return items.filter((item) => {
      const itemStatus = (item.status || "").toLowerCase() as OptionType;

      const matchesStatus =
        selected.includes("all") || selected.includes(itemStatus);

      const fullName = item.clientName || "";

      const matchesSearch = fullName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [items, selected, debouncedSearch]);

  return {
    options,
    selected,
    selectedDate,
    searchQuery,
    setSearchQuery,
    handleSelect,
    handleDateSelect,
    filteredItems,
  };
}