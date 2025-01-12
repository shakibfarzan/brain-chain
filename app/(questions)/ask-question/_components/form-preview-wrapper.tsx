"use client";
import React from "react";

import CustomForm from "@/components/ui/form";
import AskQuestionForm from "@/app/(questions)/ask-question/_components/ask-question-form";
import PreviewQuestion from "@/app/(questions)/ask-question/_components/preview-question";
import { askQuestionFormSchema } from "@/app/(questions)/form-schemas";
import { useFetchData } from "@/hooks";
import { fetchAllTags } from "@/app/(questions)/actions";

const FormPreviewWrapper: React.FC = () => {
  const { data, isLoading } = useFetchData(fetchAllTags);
  const commonProps = { tags: data?.data ?? [], isLoading };

  return (
    <CustomForm
      className="flex flex-col md:flex-row gap-6 w-full"
      schema={askQuestionFormSchema}
    >
      <AskQuestionForm {...commonProps} />
      <PreviewQuestion {...commonProps} />
    </CustomForm>
  );
};

export default FormPreviewWrapper;
