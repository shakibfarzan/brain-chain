"use client";
import React, { useEffect } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { areNearlyEqual, safePromise } from "@/utils";

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
  const ref = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(initialData);
  const [isLoading, setLoading] = React.useState(false);
  const noResultsFound = !initialData.length;

  useEffect(
    function scrollToTop() {
      ref.current?.scrollTo({ behavior: "instant", top: 0 });
      setPage(1);
      setData(initialData);
    },
    [initialData],
  );

  return (
    <ScrollShadow
      {...rest}
      ref={ref}
      onScroll={async (e) => {
        if (data.length < totalCount || totalCount > pageSize) {
          const { target } = e;

          if (
            areNearlyEqual(
              (target as any).scrollTop + (target as any).offsetHeight,
              (target as any).scrollHeight,
              1,
            )
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
