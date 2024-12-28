import { Input } from "@nextui-org/input";
import React from "react";

import { useCustomForm } from "@/components/ui/form/custom-form-provider";
import useOnChange from "@/components/ui/form/hooks/use-on-change";

type InputParams = Parameters<typeof useOnChange>;

type Inputs = HTMLInputElement | HTMLTextAreaElement;

type LabelPlacementType = React.ComponentProps<typeof Input>["labelPlacement"];

const useCommonInputProps = (...params: InputParams) => {
  const { errors } = useCustomForm();
  const errorMessage = errors[params[1]];

  const { value, onChange, onClear } = useOnChange<Inputs>(...params);

  return {
    classNames: { inputWrapper: "bg-default-400/20 dark:bg-default-500/20" },
    errorMessage: errorMessage?.[0],
    isInvalid: !!errorMessage,
    labelPlacement: "outside" as LabelPlacementType,
    name: params[1],
    value: value ? (value as string) : "",
    onChange,
    onClear,
  };
};

export default useCommonInputProps;
