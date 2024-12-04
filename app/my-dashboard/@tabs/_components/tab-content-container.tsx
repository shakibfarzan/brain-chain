import React, { PropsWithChildren } from "react";

import { Pagination } from "@/components/primitive";
import CardsContainer from "@/app/my-dashboard/@tabs/_components/cards-container";
import { SEARCH_PARAMS_KEYS } from "@/config/constants";

type Props = PropsWithChildren<{
  pageSize: number;
  totalCount: number;
}>;
const TabContentContainer: React.FC<Props> = ({
  totalCount,
  pageSize,
  children,
}) => {
  return (
    <>
      <CardsContainer>{children}</CardsContainer>
      <Pagination
        pageParam={SEARCH_PARAMS_KEYS.TABS_PAGE}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  );
};

export default TabContentContainer;
