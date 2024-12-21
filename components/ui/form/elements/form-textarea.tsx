"use client";
import React from "react";
import { Textarea } from "@nextui-org/input";

import { FormItemProps } from "@/components/ui/form/form.types";
import useCommonInputProps from "@/components/ui/form/hooks/use-common-input-props";

type Props = Omit<
  React.ComponentProps<typeof Textarea>,
  "onChange" | "value" | "name" | "labelPlacement"
> &
  FormItemProps;

const FormTextarea: React.FC<Props> = ({
  isRealTime = false,
  fieldName,
  ...rest
}) => {
  const commonProps = useCommonInputProps(isRealTime, fieldName);

  return <Textarea {...rest} {...commonProps} />;
};

export default FormTextarea;
