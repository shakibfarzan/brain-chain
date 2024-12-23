"use client";

import React from "react";
import {
  Select as NextUISelect,
  SelectItem,
  SelectProps,
} from "@nextui-org/select";

import { SelectOptionProp } from "@/types";

type Props = Omit<SelectProps, "children"> & {
  optionProps: SelectOptionProp[];
  renderOption?: (optionProp: SelectOptionProp) => React.ReactNode;
};

const Select: React.FC<Props> = ({ optionProps, renderOption, ...rest }) => {
  return (
    // @ts-ignore
    <NextUISelect
      {...rest}
      aria-label="Select"
      classNames={{ popoverContent: "bg-primary-50" }}
      variant="bordered"
    >
      {optionProps?.map((op) => (
        <SelectItem key={op.value} value={op.value} variant="faded">
          {renderOption ? renderOption(op) : op.label}
        </SelectItem>
      ))}
    </NextUISelect>
  );
};

export default Select;
