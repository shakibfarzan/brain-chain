"use client";
import React, { useMemo } from "react";

import { Select } from "@/components/basic";
import { FormItemProps } from "@/components/ui/form/form.types";
import useCommonInputProps from "@/components/ui/form/hooks/use-common-input-props";

type SelectProps = React.ComponentProps<typeof Select>;

type Props = Omit<
  SelectProps,
  "onChange" | "value" | "name" | "labelPlacement" | "selectedKeys"
> &
  FormItemProps;

const FormSelect: React.FC<Props> = ({
  isRealTime = false,
  fieldName,
  ...rest
}) => {
  const commonProps = useCommonInputProps(isRealTime, fieldName, false, true);

  commonProps.classNames = undefined;

  const selectedKeys: SelectProps["selectedKeys"] = useMemo(() => {
    if (Array.isArray(commonProps.value)) return commonProps.value;
    else if (commonProps.value && typeof commonProps.value === "string")
      return commonProps.value.split(",");
  }, [commonProps.value]);

  return (
    <Select
      {...rest}
      {...commonProps}
      classNames={{
        trigger: "bg-default-400/20 dark:bg-default-500/20",
      }}
      selectedKeys={selectedKeys}
      value={undefined}
      variant="flat"
    />
  );
};

export default FormSelect;
