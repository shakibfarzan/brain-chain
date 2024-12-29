"use client";
import React from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/components/basic/rich-text-editor"),
  { ssr: false },
);
const AskQuestionPage = () => {
  return <RichTextEditor />;
};

export default AskQuestionPage;
