"use client";
import React from "react";

import { FormInput } from "@/components/ui/form/elements";
import RichTextEditor from "@/components/basic/rich-text-editor";

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
    </div>
  );
};

export default AskQuestionForm;
