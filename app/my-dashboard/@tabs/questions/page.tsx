import React from "react";

import { getQuestionsOfCurrentUser } from "@/db/question";
import QuestionCard from "@/app/my-dashboard/@tabs/_components/question-card";
import CardsContainer from "@/app/my-dashboard/@tabs/_components/cards-container";
import NotFoundResults from "@/app/my-dashboard/@tabs/_components/not-found-results";

const MyDashboardQuestionsPage = async () => {
  const { data } = await getQuestionsOfCurrentUser();
  const notFoundQuestions = data && !data.length;

  return (
    <CardsContainer>
      {data?.map((q) => (
        <QuestionCard
          {...q}
          key={q.slug}
          answersCount={q.answers.length}
          votesCount={q.votes.length}
        />
      ))}
      {notFoundQuestions && <NotFoundResults title="No questions found :(" />}
    </CardsContainer>
  );
};

export default MyDashboardQuestionsPage;
