import React from "react";

import { getAnswersOfCurrentUser } from "@/db/answers";
import AnswerCard from "@/app/my-dashboard/@tabs/_components/answer-card";
import NotFoundResults from "@/app/my-dashboard/@tabs/_components/not-found-results";
import { PropsWithParams } from "@/types/AppParams";
import TabContentContainer from "@/app/my-dashboard/@tabs/_components/tab-content-container";

const PAGE_SIZE = 5;

const MyDashboardAnswersPage = async ({ searchParams }: PropsWithParams) => {
  const { page } = await searchParams;

  const { data } = await getAnswersOfCurrentUser(Number(page ?? 1), PAGE_SIZE);
  const noAnswersFound = data && !data.count;

  return (
    <TabContentContainer pageSize={PAGE_SIZE} totalCount={data?.count ?? 0}>
      {data?.results.map((d) => (
        <AnswerCard
          {...d}
          key={d.id}
          questionSlug={d.question.slug}
          questionTitle={d.question.title}
          votesCount={d.votes.length}
        />
      ))}
      {noAnswersFound && <NotFoundResults title="No answers found :(" />}
    </TabContentContainer>
  );
};

export default MyDashboardAnswersPage;
