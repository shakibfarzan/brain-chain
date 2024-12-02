import React from "react";

import { getCommentsOfCurrentUser } from "@/db/comments";
import CardsContainer from "@/app/my-dashboard/@tabs/_components/cards-container";
import CommentCard from "@/app/my-dashboard/@tabs/_components/comment-card";
import NotFoundResults from "@/app/my-dashboard/@tabs/_components/not-found-results";

const MyDashboardCommentsPage = async () => {
  const { data } = await getCommentsOfCurrentUser();
  const notFoundComments = data && !data.length;

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
      {notFoundComments && <NotFoundResults title="No comments found :(" />}
    </CardsContainer>
  );
};

export default MyDashboardCommentsPage;
