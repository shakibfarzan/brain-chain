import React from "react";

import { getCommentsOfCurrentUser } from "../../../../db/comment";

import CommentCard from "@/app/my-dashboard/@tabs/_components/comment-card";
import NotFoundResults from "@/app/my-dashboard/@tabs/_components/not-found-results";
import { PropsWithParams } from "@/types/app-params";
import TabContentContainer from "@/app/my-dashboard/@tabs/_components/tab-content-container";
import { SEARCH_PARAMS_KEYS } from "@/config/constants";

const PAGE_SIZE = 5;

const MyDashboardCommentsPage = async ({ searchParams }: PropsWithParams) => {
  const { [SEARCH_PARAMS_KEYS.TABS_PAGE]: page } = await searchParams;
  const { data } = await getCommentsOfCurrentUser(Number(page ?? 1), PAGE_SIZE);
  const notFoundComments = data && !data.count;

  return (
    <TabContentContainer pageSize={PAGE_SIZE} totalCount={data?.count ?? 0}>
      {data?.results.map((d) => (
        <CommentCard
          {...d}
          key={d.id}
          answer={d.answer}
          question={d.question ?? d.answer?.question ?? null}
        />
      ))}
      {notFoundComments && <NotFoundResults title="No comments found :(" />}
    </TabContentContainer>
  );
};

export default MyDashboardCommentsPage;
