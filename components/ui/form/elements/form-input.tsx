"use client";
import { Input } from "@nextui-org/input";
import React from "react";

import { FormItemProps } from "@/components/ui/form/form.types";
import useOnChange from "@/components/ui/form/hooks/useOnChange";
import { useCustomForm } from "@/components/ui/form/custom-form-provider";

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
  const { errors } = useCustomForm();
  const errorMessage = errors[fieldName];

  const { value, onChange, onClear } = useOnChange<HTMLInputElement>(
    isRealTime,
    fieldName,
    !!rest.isClearable,
  );

  return (
    <Input
      {...rest}
      classNames={{
        inputWrapper: "bg-default-400/20 dark:bg-default-500/20",
      }}
      errorMessage={errorMessage?.[0]}
      isInvalid={!!errorMessage}
      labelPlacement="outside"
      name={fieldName}
      value={value as string}
      onChange={onChange}
      onClear={onClear}
    />
  );
};

export default FormInput;
