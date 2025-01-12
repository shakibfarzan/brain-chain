import { Input } from "@nextui-org/input";
import React, { ChangeEvent } from "react";

import { useCustomForm } from "@/components/ui/form/custom-form-provider";
import useOnChange from "@/components/ui/form/hooks/use-on-change";

type InputParams = Parameters<typeof useOnChange>;

type Inputs = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type LabelPlacementType = React.ComponentProps<typeof Input>["labelPlacement"];

type UseCommonInputProps = {
  onChange: ((event: ChangeEvent<Inputs>) => void) | undefined;
  onClear: (() => void) | undefined;
  errorMessage: string | undefined;
  name: string | undefined;
  classNames: Record<string, string> | undefined;
  isInvalid: boolean;
  value: string | number | boolean | string[];
  labelPlacement: LabelPlacementType;
};

const useCommonInputProps = (...params: InputParams): UseCommonInputProps => {
  const { errors } = useCustomForm();
  const errorMessage = errors[params[1]];

  const { value, onChange, onClear } = useOnChange<Inputs>(...params);

  return {
    classNames: { inputWrapper: "bg-default-400/20 dark:bg-default-500/20" },
    errorMessage: errorMessage?.[0],
    isInvalid: !!errorMessage,
    labelPlacement: "outside",
    name: params[1],
    value: value ?? "",
    onChange,
    onClear,
  };
};

export default useCommonInputProps;
