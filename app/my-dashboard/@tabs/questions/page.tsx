import React from "react";

import { getQuestionsOfCurrentUser } from "@/db/question";
import QuestionCard from "@/app/my-dashboard/@tabs/_components/question-card";
import CardsContainer from "@/app/my-dashboard/@tabs/_components/cards-container";

const MyDashboardQuestionsPage = async () => {
  const { data } = await getQuestionsOfCurrentUser();

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
    </CardsContainer>
  );
};

export default MyDashboardQuestionsPage;
