"use client";
import React, { useActionState } from "react";
import Form from "next/form";

import CustomFormProvider from "@/components/ui/form/custom-form-provider";
import { ActionState, FormState } from "@/components/ui/form/form.types";

type Props = {
  action: Parameters<ActionState>[0];
  initialState?: Parameters<ActionState>[1];
} & React.ComponentProps<typeof CustomFormProvider> &
  Omit<React.ComponentProps<typeof Form>, "action" | "defaultValue">;

const CustomForm: React.FC<Props> = ({
  children,
  schema,
  action,
  initialState = { errors: {} },
  defaultFormValues,
  ...formProps
}) => {
  const [state, formAction] = useActionState<FormState, FormData>(
    action,
    initialState,
  );

  return (
    <CustomFormProvider
      defaultFormValues={defaultFormValues}
      schema={schema}
      state={state}
    >
      <Form {...formProps} action={formAction}>
        {children}
      </Form>
    </CustomFormProvider>
  );
};

export default CustomForm;
