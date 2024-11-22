"use client";
import React, { useActionState } from "react";
import Form from "next/form";

import CustomFormProvider from "@/components/ui/form/custom-form-provider";
import { ZodFieldErrors } from "@/components/ui/form/form.types";

type Props = {
  action: Parameters<typeof useActionState<{ errors: ZodFieldErrors }>>[0];
  initialState?: Parameters<
    typeof useActionState<{ errors: ZodFieldErrors }>
  >[1];
} & React.ComponentProps<typeof CustomFormProvider>;

const CustomForm: React.FC<Props> = ({
  children,
  schema,
  action,
  initialState = { errors: {} },
}) => {
  const [state, formAction] = useActionState<{ errors: ZodFieldErrors }>(
    action,
    initialState,
  );

  return (
    <CustomFormProvider schema={schema} state={state}>
      <Form action={formAction}>{children}</Form>
    </CustomFormProvider>
  );
};

export default CustomForm;
