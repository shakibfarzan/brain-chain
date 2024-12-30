"use client";
import React from "react";

import AskQuestionForm from "@/app/(questions)/ask-question/_components/ask-question-form";
import CustomForm from "@/components/ui/form";

const AskQuestionPage = () => {
  return (
    <CustomForm
      action={async (state, payload) => {
        return { ...state };
      }}
    >
      <AskQuestionForm />
    </CustomForm>
  );
};

export default AskQuestionPage;
