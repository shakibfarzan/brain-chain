import React from "react";

import { getAnswersOfCurrentUser } from "@/db/answers";
import CardsContainer from "@/app/my-dashboard/@tabs/_components/cards-container";
import AnswerCard from "@/app/my-dashboard/@tabs/_components/answer-card";
import NotFoundResults from "@/app/my-dashboard/@tabs/_components/not-found-results";

const MyDashboardAnswersPage = async () => {
  const { data } = await getAnswersOfCurrentUser();
  const noAnswersFound = data && !data.length;

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
      {noAnswersFound && <NotFoundResults title="No answers found :(" />}
    </CardsContainer>
  );
};

export default MyDashboardAnswersPage;
