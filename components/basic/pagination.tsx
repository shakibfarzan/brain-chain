"use client";
import React from "react";
import { Pagination as NextUIPagination } from "@nextui-org/pagination";
import { usePathname, useRouter } from "next/navigation";

import { SEARCH_PARAMS_KEYS } from "@/config/constants";
import { useReplaceParams } from "@/hooks";

type Props = {
  totalCount: number;
  pageSize?: number;
  initialPage?: number;
  pageParam?: string;
};

const Pagination: React.FC<Props> = ({
  totalCount,
  pageSize = 10,
  initialPage = 1,
  pageParam = SEARCH_PARAMS_KEYS.PAGE,
}) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { manual } = useReplaceParams();

  if (!totalCount) return null;

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <NextUIPagination
      showControls
      color="primary"
      initialPage={initialPage}
      total={totalPages}
      variant="light"
      onChange={(page) =>
        push(
          manual(pathname, {
            searchParams: { [pageParam]: page.toString() },
          }),
        )
      }
    />
  );
};

export default Pagination;
