"use client";
import { Input } from "@nextui-org/input";
import React from "react";

import { FormItemProps } from "@/components/ui/form/form.types";
import useCommonInputProps from "@/components/ui/form/hooks/use-common-input-props";

type Props = Omit<
  React.ComponentProps<typeof Input>,
  "onChange" | "value" | "name" | "labelPlacement"
> &
  FormItemProps;

const FormInput: React.FC<Props> = ({
  isRealTime = false,
  fieldName,
  ...rest
}) => {
  const commonProps = useCommonInputProps(
    isRealTime,
    fieldName,
    !!rest.isClearable,
  );

  return (
    <Input {...rest} {...commonProps} value={commonProps.value as string} />
  );
};

export default FormInput;
