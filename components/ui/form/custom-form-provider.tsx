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
  shouldReset: boolean;
  setReset: (value: boolean) => void;
  shouldClearErrors: boolean;
  setShouldClearErrors: Dispatch<SetStateAction<boolean>>;
};

const CustomFormContext = createContext<CustomFormContextType | undefined>(
  undefined,
);

type Props = PropsWithChildren<{
  schema?: z.ZodObject<any>;
  state?: FormState;
  defaultFormValues?: CustomFormContextType["realTimeData"];
  shouldReset: boolean;
  setReset: (value: boolean) => void;
}>;

const CustomFormProvider: React.FC<Props> = ({
  children,
  schema,
  state,
  defaultFormValues,
  setReset,
  shouldReset,
}) => {
  const [shouldClearErrors, setShouldClearErrors] = useState(false);
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

  useEffect(
    function effectOnReset() {
      if (shouldReset) {
        setRealTimeData(defaultFormValues ?? {});
        setShouldClearErrors(true);
        setReset(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shouldReset],
  );

  useEffect(
    function effectForClearErrors() {
      if (shouldClearErrors && Object.keys(errors).length) {
        setErrors({});
      }
    },
    [errors, shouldClearErrors],
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
        setReset,
        shouldReset,
        setShouldClearErrors,
        shouldClearErrors,
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
