"use client";
import React from "react";
import { CardHeader } from "@nextui-org/card";

import { CardPagePaper, H2 } from "@/components/basic";
import { useCustomForm } from "@/components/ui/form/custom-form-provider";

const PreviewQuestion: React.FC = () => {
  const { realTimeData } = useCustomForm();

  console.log(realTimeData);

  return (
    <CardPagePaper className="w-1/2">
      <CardHeader className="flex flex-col gap-2 items-start">
        <H2>Preview</H2>
        <p className="font-extralight text-sm">
          This is how your question will appear
        </p>
      </CardHeader>
    </CardPagePaper>
  );
};

export default PreviewQuestion;
