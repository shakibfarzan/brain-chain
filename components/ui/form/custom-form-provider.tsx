"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import * as z from "zod";

import { ZodFieldErrors } from "@/components/ui/form/form.types";

type CustomFormContextType = {
  realTimeData: Record<string, string | number | null | undefined>;
  setRealTimeData: Dispatch<
    SetStateAction<Record<string, string | number | null | undefined>>
  >;
  errors: ZodFieldErrors;
  setErrors: Dispatch<SetStateAction<ZodFieldErrors>>;
};

const CustomFormContext = createContext<CustomFormContextType | undefined>(
  undefined,
);

type Props = PropsWithChildren<{
  schema?: z.ZodObject<any>;
  state?: { errors: ZodFieldErrors };
}>;

const CustomFormProvider: React.FC<Props> = ({ children, schema, state }) => {
  const [realTimeData, setRealTimeData] = useState<
    CustomFormContextType["realTimeData"]
  >({});
  const [errors, setErrors] = useState<CustomFormContextType["errors"]>({});

  useEffect(
    function effectOnRealTimeData() {
      const result = schema?.safeParse(realTimeData);

      if (!result?.success)
        setErrors(result?.error.flatten().fieldErrors ?? {});
    },
    [realTimeData],
  );

  useEffect(
    function effectOnActionState() {
      if (state) setErrors(state?.errors);
    },
    [state],
  );

  return (
    <CustomFormContext.Provider
      value={{ realTimeData, setRealTimeData, errors, setErrors }}
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
