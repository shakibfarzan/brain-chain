"use client";
import React from "react";

import FormPreviewWrapper from "@/app/(questions)/ask-question/_components/form-preview-wrapper";
import QuestionGuidelines from "@/app/(questions)/ask-question/_components/question-guidelines";

const AskQuestionPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <QuestionGuidelines />
      <FormPreviewWrapper />
    </div>
  );
};

export default AskQuestionPage;
