"use client";
import React from "react";
import { Answer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import dayjs from "dayjs";
import clsx from "clsx";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";

import { useReplaceParams } from "@/hooks";
import routes from "@/config/routes";
import { DATETIME_FORMATS, SEARCH_PARAMS_KEYS } from "@/config/constants";

type Props = Partial<
  Pick<Answer, "createdAt" | "content" | "isAccepted" | "id">
> & {
  questionTitle: string;
  votesCount: number;
  questionSlug: string;
};

const AnswerCard: React.FC<Props> = ({
  questionTitle,
  votesCount,
  createdAt,
  content,
  isAccepted,
  id,
  questionSlug,
}) => {
  const { manual } = useReplaceParams();
  const { push } = useRouter();

  return (
    <Card
      isHoverable
      isPressable
      className={clsx(
        "overflow-visible border-2 border-solid mb-4 w-full",
        isAccepted ? "border-success" : "border-gray-600",
      )}
      onPress={() => {
        if (questionSlug && id)
          push(
            manual(routes.QUESTIONS.DETAIL, {
              params: [questionSlug],
              searchParams: { [SEARCH_PARAMS_KEYS.ANSWER_ID]: id },
            }),
          );
      }}
    >
      <CardHeader className="flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <p className="text-xl">{questionTitle}</p>
          {isAccepted && (
            <Tooltip
              color="success"
              content="This answer is accepted"
              placement="top-end"
            >
              <Chip color="success" variant="flat">
                ✔
              </Chip>
            </Tooltip>
          )}
        </div>
        <p className="text-sm">
          Posted on{" "}
          {dayjs(createdAt).format(DATETIME_FORMATS.DATE_DASH_SEPARATOR)}
        </p>
      </CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter className="text-sm">{votesCount} votes</CardFooter>
    </Card>
  );
};

export default AnswerCard;
