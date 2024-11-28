import React from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { getQuestionsOfCurrentUser } from "@/db/question";
import QuestionCard from "@/app/my-dashboard/@tabs/questions/_components/question-card";

const MyDashboardQuestionsPage = async () => {
  const { data } = await getQuestionsOfCurrentUser();

  return (
    <ScrollShadow
      hideScrollBar
      className="flex flex-col my-4 max-h-[60vh]"
      size={20}
    >
      {data?.map((q) => (
        <QuestionCard
          {...q}
          key={q.slug}
          answersCount={q.answers.length}
          votesCount={q.votes.length}
        />
      ))}
    </ScrollShadow>
  );
};

export default MyDashboardQuestionsPage;
