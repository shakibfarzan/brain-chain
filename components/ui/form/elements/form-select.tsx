"use client";
import React from "react";

import { Select } from "@/components/basic";
import { FormItemProps } from "@/components/ui/form/form.types";
import useCommonInputProps from "@/components/ui/form/hooks/use-common-input-props";

type SelectProps = React.ComponentProps<typeof Select>;

type Props = Omit<
  SelectProps,
  "onChange" | "value" | "name" | "labelPlacement"
> &
  FormItemProps;

const FormSelect: React.FC<Props> = ({
  isRealTime = false,
  fieldName,
  ...rest
}) => {
  const commonProps = useCommonInputProps(isRealTime, fieldName);

  commonProps.classNames = undefined;

  return (
    <Select
      {...rest}
      {...commonProps}
      value={commonProps.value as SelectProps["value"]}
    />
  );
};

export default FormSelect;
