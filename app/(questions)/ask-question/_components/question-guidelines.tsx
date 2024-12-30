"use client";
import React, { useState } from "react";
import { CardBody, CardHeader } from "@nextui-org/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import { CardPagePaper, H2 } from "@/components/basic";

const QuestionGuidelines: React.FC = () => {
  const [shouldShow, setShouldShow] = useState(true);

  if (!shouldShow) return null;

  return (
    <CardPagePaper>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 w-full">
          <H2>Guidelines for Asking a Good Question</H2>
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faTimesCircle}
            onClick={() => setShouldShow(false)}
          />
        </div>
      </CardHeader>
      <CardBody>
        <ul className="list-disc ml-4 flex flex-col gap-1">
          <li>Make your title clear and concise</li>
          <li>Provide enough detail in the description</li>
          <li>Add relevant tags to categorize your question</li>
          <li>Check for similar questions before posting</li>
          <li>Be respectful and open to feedback</li>
        </ul>
      </CardBody>
    </CardPagePaper>
  );
};

export default QuestionGuidelines;
