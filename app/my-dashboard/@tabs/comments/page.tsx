import React from "react";

import { getCommentsOfCurrentUser } from "@/db/comments";
import CardsContainer from "@/app/my-dashboard/@tabs/_components/cards-container";
import CommentCard from "@/app/my-dashboard/@tabs/_components/comment-card";

const MyDashboardCommentsPage = async () => {
  const { data } = await getCommentsOfCurrentUser();

  return (
    <CardsContainer>
      {data?.map((d) => (
        <CommentCard
          {...d}
          key={d.id}
          answer={d.answer}
          question={d.question ?? d.answer?.question ?? null}
        />
      ))}
    </CardsContainer>
  );
};

export default MyDashboardCommentsPage;
