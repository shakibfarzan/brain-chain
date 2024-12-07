"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Select } from "@/components/basic";
import { SelectOptionProp } from "@/types";
import { useReplaceParams } from "@/hooks";
import { ActivityTypes, SEARCH_PARAMS_KEYS } from "@/config/constants";
import useActivitiesFilterValues from "@/app/my-dashboard/@timeline/_hooks/use-activities-filter-values";

const TimelineFilters: React.FC = () => {
  const { push, refresh } = useRouter();
  const { manual } = useReplaceParams();
  const pathname = usePathname();
  const { activityType, orderType } = useActivitiesFilterValues();

  const activityTypeOptionProps: SelectOptionProp[] = Object.entries(
    ActivityTypes,
  ).map(([key, value]) => ({ value: key, label: value }));

  const sortOptionProps: SelectOptionProp[] = [
    { label: "Newest First", value: "desc" },
    { label: "Oldest First", value: "asc" },
  ];

  return (
    <div className="flex w-full items-center gap-2 flex-wrap justify-between">
      <Select
        className="max-w-xs"
        optionProps={activityTypeOptionProps}
        placeholder="Filter by type"
        selectedKeys={activityType ? [activityType] : []}
        onChange={(e) => {
          push(
            manual(pathname, {
              searchParams: {
                [SEARCH_PARAMS_KEYS.ACTIVITY_TYPE]: e.target.value,
              },
            }),
            { scroll: false },
          );
          refresh();
        }}
      />
      <Select
        className="max-w-xs"
        optionProps={sortOptionProps}
        placeholder="Sort order"
        selectedKeys={orderType ? [orderType] : []}
        onChange={(e) => {
          push(
            manual(pathname, {
              searchParams: {
                [SEARCH_PARAMS_KEYS.ACTIVITY_LOG_ORDER]: e.target.value,
              },
            }),
            { scroll: false },
          );
          refresh();
        }}
      />
    </div>
  );
};

export default TimelineFilters;
