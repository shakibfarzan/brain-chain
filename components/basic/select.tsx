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
    <NextUISelect
      aria-label="Select"
      variant="bordered"
      {...rest}
      classNames={{ ...rest.classNames, popoverContent: "bg-primary-50" }}
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
