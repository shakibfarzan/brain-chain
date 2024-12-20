"use client";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import * as z from "zod";

import { FormState, ZodFieldErrors } from "@/components/ui/form/form.types";

type CustomFormContextType = {
  realTimeData: Record<string, string | number | boolean | null | undefined>;
  setRealTimeData: Dispatch<
    SetStateAction<Record<string, string | number | boolean | null | undefined>>
  >;
  errors: ZodFieldErrors;
  setErrors: Dispatch<SetStateAction<ZodFieldErrors>>;
  schema?: z.ZodObject<any>;
  isSuccess: boolean;
};

const CustomFormContext = createContext<CustomFormContextType | undefined>(
  undefined,
);

type Props = PropsWithChildren<{
  schema?: z.ZodObject<any>;
  state?: FormState;
  defaultFormValues?: CustomFormContextType["realTimeData"];
}>;

const CustomFormProvider: React.FC<Props> = ({
  children,
  schema,
  state,
  defaultFormValues,
}) => {
  const [realTimeData, setRealTimeData] = useState<
    CustomFormContextType["realTimeData"]
  >({});
  const [errors, setErrors] = useState<CustomFormContextType["errors"]>({});

  useEffect(
    function effectOnActionState() {
      if (state) setErrors(state?.errors);
    },
    [state],
  );

  useEffect(
    function updateFormDataByDefault() {
      if (defaultFormValues) setRealTimeData(defaultFormValues);
    },
    [defaultFormValues],
  );

  return (
    <CustomFormContext.Provider
      value={{
        realTimeData,
        setRealTimeData,
        errors,
        setErrors,
        schema,
        isSuccess: !!state?.isSuccess,
      }}
    >
      {children}
    </CustomFormContext.Provider>
  );
};

export default CustomFormProvider;

export const useCustomForm = (): CustomFormContextType => {
  const context = useContext(CustomFormContext);

  if (!context)
    throw new Error(
      "useCustomForm must be used within the CustomFormProvider or CustomForm",
    );

  return context;
};
