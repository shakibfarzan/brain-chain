import React from "react";

import { getAnswersOfCurrentUser } from "@/db/answers";
import CardsContainer from "@/app/my-dashboard/@tabs/_components/cards-container";
import AnswerCard from "@/app/my-dashboard/@tabs/_components/answer-card";

const MyDashboardAnswersPage = async () => {
  const { data } = await getAnswersOfCurrentUser();

  return (
    <CardsContainer>
      {data?.map((d) => (
        <AnswerCard
          {...d}
          key={d.id}
          questionSlug={d.question.slug}
          questionTitle={d.question.title}
          votesCount={d.votes.length}
        />
      ))}
    </CardsContainer>
  );
};

export default MyDashboardAnswersPage;
