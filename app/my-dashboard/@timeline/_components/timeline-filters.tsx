"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";

const TimelineFilters: React.FC = () => {
  return (
    <div className="flex w-full items-center gap-2 flex-wrap justify-between">
      {/* @ts-ignore */}
      <Select
        className="max-w-xs"
        placeholder="Filter by type"
        variant="bordered"
      >
        <SelectItem key="test" variant="faded">
          Test
        </SelectItem>
        <SelectItem key="test2" variant="faded">
          Test2
        </SelectItem>
      </Select>
      {/* @ts-ignore */}
      <Select className="max-w-xs" placeholder="Sort order" variant="bordered">
        <SelectItem key="test" variant="faded">
          Test
        </SelectItem>
        <SelectItem key="test2" variant="faded">
          Test2
        </SelectItem>
      </Select>
    </div>
  );
};

export default TimelineFilters;
