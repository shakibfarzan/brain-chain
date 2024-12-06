"use client";
import React from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { safePromise } from "@/utils";

type Props<T> = React.ComponentProps<typeof ScrollShadow> & {
  initialData: T[];
  loadMore: (page: number, pageSize?: number) => Promise<T[]>;
  totalCount: number;
  pageSize?: number;
  renderData: (data: T[], isLoading: boolean) => React.ReactNode;
  notFound?: React.ReactNode;
};

function InfiniteScroll<T>({
  onScroll,
  loadMore,
  initialData,
  totalCount,
  pageSize = 10,
  renderData,
  notFound,
  ...rest
}: Props<T>): ReturnType<React.FC> {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(initialData);
  const [isLoading, setLoading] = React.useState(false);
  const noResultsFound = !initialData.length;

  return (
    <ScrollShadow
      {...rest}
      onScroll={async (e) => {
        if (data.length < totalCount || totalCount > pageSize) {
          const { target } = e;

          if (
            (target as any).scrollTop + (target as any).offsetHeight ===
            (target as any).scrollHeight
          ) {
            setLoading(true);
            const newPage = page + 1;
            const [newData] = await safePromise(loadMore(newPage, pageSize));

            if (newData) {
              setData((prev) => [...prev, ...newData]);
              setPage(newPage);
            }
            setLoading(false);
          }
        }

        onScroll?.(e);
      }}
    >
      {renderData(data, isLoading)}
      {noResultsFound &&
        (notFound ?? (
          <div className="flex items-center justify-center h-[20vh]">
            No results found :(
          </div>
        ))}
    </ScrollShadow>
  );
}

export default InfiniteScroll;
