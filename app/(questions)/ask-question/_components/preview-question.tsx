"use client";
import React, { useMemo } from "react";
import { CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import { CardPagePaper, H2, H3 } from "@/components/basic";
import { useCustomForm } from "@/components/ui/form/custom-form-provider";
import { AskQuestionCommonProps } from "@/app/(questions)/questions.types";

const PreviewQuestion: React.FC<AskQuestionCommonProps> = ({
  tags,
  isLoading,
}) => {
  const { realTimeData } = useCustomForm();

  const title = realTimeData["title"];
  const description = realTimeData["description"];
  const selectedTags = useMemo(
    () => (realTimeData["tags"] ?? []) as string[],
    [realTimeData],
  );

  const tagsName = useMemo(
    () =>
      tags
        .filter((tag) => selectedTags.includes(tag.id))
        .map((tag) => tag.name),
    [selectedTags, tags],
  );

  return (
    <CardPagePaper className="w-full md:w-1/2">
      <CardHeader className="flex flex-col gap-2 items-start">
        <H2>Preview</H2>
        <p className="font-extralight text-sm">
          This is how your question will appear
        </p>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <H3>{title}</H3>
        <div dangerouslySetInnerHTML={{ __html: description as string }} />
        <div className="flex items-center flex-wrap gap-2">
          {tagsName.map((tag) => (
            <Chip key={tag} color="warning" size="sm" variant="flat">
              {tag}
            </Chip>
          ))}
        </div>
      </CardBody>
    </CardPagePaper>
  );
};

export default PreviewQuestion;
