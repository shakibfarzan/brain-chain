"use client";
import React from "react";
import { Comment } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { format } from "date-fns";

import { useReplaceParams } from "@/hooks";
import routes from "@/config/routes";
import { DATETIME_FORMATS, SEARCH_PARAMS_KEYS } from "@/config/constants";

type Props = Partial<Pick<Comment, "id" | "createdAt" | "content">> & {
  answer: { content: string; id: string } | null;
  question: { title: string; slug: string } | null;
};

const CommentCard: React.FC<Props> = ({
  answer,
  id,
  content,
  question,
  createdAt,
}) => {
  const { manual } = useReplaceParams();
  const { push } = useRouter();

  const onPress = (): void => {
    if (id && question) {
      const searchParams: Record<string, string> = {
        [SEARCH_PARAMS_KEYS.COMMENT_ID]: id,
      };

      if (answer) {
        searchParams[SEARCH_PARAMS_KEYS.ANSWER_ID] = answer.id;
      }
      push(
        manual(routes.QUESTIONS.DETAIL, {
          params: [question.slug],
          searchParams,
        }),
      );
    }
  };

  return (
    <Card
      isBlurred
      isPressable
      className="overflow-visible mb-4 w-full shadow-small transition hover:scale-[1.01]"
      onPress={onPress}
    >
      <CardHeader className="flex flex-col items-start">
        <div className="flex gap-4 justify-between w-full items-center">
          <div className="font-semibold text-start">
            On: {answer?.content ?? question?.title}
          </div>
          <Chip variant="shadow">{answer ? "Answer" : "Question"}</Chip>
        </div>
        {answer && (
          <p className="text-sm text-start">Question: {question?.title}</p>
        )}
      </CardHeader>
      <CardBody className="font-extralight text-lg">{content}</CardBody>
      <CardFooter className="text-sm">
        Posted on{" "}
        {format(createdAt ?? "", DATETIME_FORMATS.DATE_DASH_SEPARATOR)}
      </CardFooter>
    </Card>
  );
};

export default CommentCard;
