"use client";
import React from "react";
import { Question } from "@prisma/client";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { DATETIME_FORMATS } from "@/config/constants";
import { useReplaceParams } from "@/hooks";
import routes from "@/config/routes";

type Props = Partial<
  Pick<Question, "title" | "createdAt" | "views" | "slug">
> & {
  answersCount: number;
  votesCount: number;
};

const QuestionCard: React.FC<Props> = ({
  answersCount,
  votesCount,
  slug,
  title,
  views,
  createdAt,
}) => {
  const { manual } = useReplaceParams();
  const { push } = useRouter();

  return (
    <Card
      isHoverable
      isPressable
      className="overflow-visible border-2 border-solid border-gray-600 mb-4"
      onPress={() => {
        if (slug) push(manual(routes.QUESTIONS.DETAIL, { params: [slug] }));
      }}
    >
      <CardBody>
        <p className="text-xl">{title}</p>
        <p className="text-sm">
          Posted on{" "}
          {dayjs(createdAt).format(DATETIME_FORMATS.DATE_DASH_SEPARATOR)}
        </p>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm">{votesCount} votes</span>
        <span className="text-sm">{answersCount} answers</span>
        <span className="text-sm">{views} views</span>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
