"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import {
  FormInput,
  FormRichTextEditor,
  FormSelect,
} from "@/components/ui/form/elements";
import { AskQuestionCommonProps } from "@/app/(questions)/questions.types";
import { useCustomForm } from "@/components/ui/form/custom-form-provider";
import { askQuestionFormAction } from "@/app/(questions)/actions";

const AskQuestionForm: React.FC<AskQuestionCommonProps> = ({
  tags,
  isLoading,
}) => {
  const { back } = useRouter();
  const { realTimeData } = useCustomForm();

  const onSubmit = async () => {
    const res = await askQuestionFormAction(
      { errors: {}, isSuccess: false },
      realTimeData,
    );

    if (res.isSuccess) {
      // snackbar
      back();
    } else {
      // snackbar with error
    }
  };

  return (
    <div className="flex flex-col gap-6 md:w-1/2 w-full">
      <FormInput
        isClearable
        isRealTime
        isRequired
        fieldName="title"
        label="Title"
        placeholder="Be specific and imagine you're asking a question to another person."
      />
      <FormRichTextEditor
        isRequired
        fieldName="description"
        label="Description"
        placeholder="Include all the information someone would need to answer your question."
      />
      <FormSelect
        isRealTime
        isRequired
        fieldName="tags"
        isLoading={isLoading}
        label="Tags"
        optionProps={tags.map(({ name, id }) => ({
          value: id,
          label: name,
        }))}
        placeholder="Add up to 5 tags"
        selectionMode="multiple"
      />
      <div className="w-full flex items-center justify-between">
        <Button variant="bordered" onClick={back}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSubmit}>
          Submit Question
        </Button>
      </div>
    </div>
  );
};

export default AskQuestionForm;
