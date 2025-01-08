"use client";
import React from "react";

import CustomForm from "@/components/ui/form";
import AskQuestionForm from "@/app/(questions)/ask-question/_components/ask-question-form";
import PreviewQuestion from "@/app/(questions)/ask-question/_components/preview-question";
import { askQuestionFormSchema } from "@/app/(questions)/form-schemas";

const FormPreviewWrapper: React.FC = () => {
  return (
    <CustomForm
      action={async (state, payload) => {
        return { ...state };
      }}
      className="flex flex-col md:flex-row gap-6 w-full"
      schema={askQuestionFormSchema}
    >
      <AskQuestionForm />
      <PreviewQuestion />
    </CustomForm>
  );
};

export default FormPreviewWrapper;
