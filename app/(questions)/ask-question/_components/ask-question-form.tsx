"use client";
import React from "react";
import { Button } from "@nextui-org/button";

import { FormInput } from "@/components/ui/form/elements";
import RichTextEditor from "@/components/basic/rich-text-editor";
import FormSelect from "@/components/ui/form/elements/form-select";

const AskQuestionForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <FormInput
        isClearable
        isRealTime
        isRequired
        fieldName="title"
        label="Title"
        placeholder="Be specific and imagine you're asking a question to another person."
      />
      <RichTextEditor placeholder="Include all the information someone would need to answer your question." />
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
