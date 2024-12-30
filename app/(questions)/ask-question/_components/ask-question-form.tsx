"use client";
import React from "react";
import { Button } from "@nextui-org/button";

import { FormInput } from "@/components/ui/form/elements";
import FormSelect from "@/components/ui/form/elements/form-select";
import FormRichTextEditor from "@/components/ui/form/elements/form-rich-text-editor";

const AskQuestionForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-1/2">
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
        isRequired
        fieldName="tags"
        label="Tags"
        optionProps={[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
        ]}
        placeholder="Add up to 5 tags"
      />
      <div className="w-full flex items-center justify-between">
        <Button variant="bordered">Cancel</Button>
        <Button color="primary">Submit Question</Button>
      </div>
    </div>
  );
};

export default AskQuestionForm;
