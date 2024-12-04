import React from "react";

import { getQuestionsOfCurrentUser } from "@/db/question";
import QuestionCard from "@/app/my-dashboard/@tabs/_components/question-card";
import NotFoundResults from "@/app/my-dashboard/@tabs/_components/not-found-results";
import { PropsWithParams } from "@/types/AppParams";
import TabContentContainer from "@/app/my-dashboard/@tabs/_components/tab-content-container";

const PAGE_SIZE = 5;

const MyDashboardQuestionsPage = async ({ searchParams }: PropsWithParams) => {
  const { page } = await searchParams;
  const { data } = await getQuestionsOfCurrentUser(
    Number(page ?? 1),
    PAGE_SIZE,
  );
  const notFoundQuestions = data && !data.count;

  return (
    <TabContentContainer pageSize={PAGE_SIZE} totalCount={data?.count ?? 0}>
      {data?.results.map((q) => (
        <QuestionCard
          {...q}
          key={q.slug}
          answersCount={q.answers.length}
          votesCount={q.votes.length}
        />
      ))}
      {notFoundQuestions && <NotFoundResults title="No questions found :(" />}
    </TabContentContainer>
  );
};

export default MyDashboardQuestionsPage;
