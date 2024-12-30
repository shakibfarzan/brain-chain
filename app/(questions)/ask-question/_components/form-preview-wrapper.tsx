"use client";
import React from "react";

import CustomForm from "@/components/ui/form";
import AskQuestionForm from "@/app/(questions)/ask-question/_components/ask-question-form";
import PreviewQuestion from "@/app/(questions)/ask-question/_components/preview-question";

const FormPreviewWrapper: React.FC = () => {
  return (
    <CustomForm
      action={async (state, payload) => {
        return { ...state };
      }}
      className="flex flex-col md:flex-row gap-6 w-full"
    >
      <AskQuestionForm />
      <PreviewQuestion />
    </CustomForm>
  );
};

export default FormPreviewWrapper;
