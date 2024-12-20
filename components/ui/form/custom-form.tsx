"use client";
import React, { ReactNode, useActionState, useEffect } from "react";
import Form from "next/form";
import { FormStatus, useFormStatus } from "react-dom";

import CustomFormProvider from "@/components/ui/form/custom-form-provider";
import { ActionState, FormState } from "@/components/ui/form/form.types";

type ChildrenProps = {
  children: ReactNode | ((formStatus: FormStatus) => ReactNode);
};

type Props = {
  action: Parameters<ActionState>[0];
  initialState?: Parameters<ActionState>[1];
  onSuccess?: () => void;
} & React.ComponentProps<typeof CustomFormProvider> &
  Omit<
    React.ComponentProps<typeof Form>,
    "action" | "defaultValue" | "children"
  > &
  ChildrenProps;

const CustomForm: React.FC<Props> = ({
  children,
  schema,
  action,
  onSuccess,
  initialState = { errors: {}, isSuccess: false },
  defaultFormValues,
  ...formProps
}) => {
  const [state, formAction] = useActionState<FormState, FormData>(
    action,
    initialState,
  );

  useEffect(
    function effectOnSuccess() {
      if (state?.isSuccess) onSuccess?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.isSuccess],
  );

  return (
    <CustomFormProvider
      defaultFormValues={defaultFormValues}
      schema={schema}
      state={state}
    >
      <Form {...formProps} action={formAction}>
        <FormStatusWrapper>{children}</FormStatusWrapper>
      </Form>
    </CustomFormProvider>
  );
};

export default CustomForm;

const FormStatusWrapper: React.FC<ChildrenProps> = ({ children }) => {
  const isChildrenFunction = typeof children === "function";
  const formStatus = useFormStatus();

  return isChildrenFunction ? children(formStatus) : children;
};
