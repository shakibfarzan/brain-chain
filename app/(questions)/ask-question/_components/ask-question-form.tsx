"use client";
import React from "react";
import { Button } from "@nextui-org/button";

import { FormInput } from "@/components/ui/form/elements";
import FormSelect from "@/components/ui/form/elements/form-select";
import FormRichTextEditor from "@/components/ui/form/elements/form-rich-text-editor";
import { useFetchData } from "@/hooks";
import { fetchAllTags } from "@/app/(questions)/actions";

const AskQuestionForm: React.FC = () => {
  const { data, isLoading } = useFetchData(fetchAllTags);

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
        optionProps={(data?.data ?? []).map(({ name }) => ({
          value: name,
          label: name,
        }))}
        placeholder="Add up to 5 tags"
        selectionMode="multiple"
      />
      <div className="w-full flex items-center justify-between">
        <Button variant="bordered">Cancel</Button>
        <Button color="primary">Submit Question</Button>
      </div>
    </div>
  );
};

export default AskQuestionForm;
