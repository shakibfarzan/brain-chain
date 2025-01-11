"use client";
import React, {
  ReactNode,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import Form from "next/form";
import { FormStatus, useFormStatus } from "react-dom";

import CustomFormProvider from "@/components/ui/form/custom-form-provider";
import { ActionState, FormState } from "@/components/ui/form/form.types";

type ChildrenProps = {
  children: ReactNode | ((formStatus: FormStatus) => ReactNode);
};

type Props = {
  action?: Parameters<ActionState>[0];
  initialState?: Parameters<ActionState>[1];
  onSuccess?: () => void;
  shouldResetAfterSuccess?: boolean;
} & Omit<
  React.ComponentProps<typeof CustomFormProvider>,
  "shouldReset" | "setReset"
> &
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
  shouldResetAfterSuccess = false,
  defaultFormValues,
  ...formProps
}) => {
  const [state, formAction] = useActionState<FormState, FormData>(
    //@ts-ignore
    async (state, payload: FormData | null) => {
      if (!payload) return initialState;

      return action?.(state, payload);
    },
    initialState,
  );

  const [shouldReset, setShouldReset] = useState(false);

  useEffect(
    function effectOnSuccess() {
      if (!action) return;
      if (state?.isSuccess) {
        startTransition(() => {
          // @ts-ignore
          formAction(null);
        });
        onSuccess?.();
        setShouldReset(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.isSuccess],
  );

  return (
    <CustomFormProvider
      defaultFormValues={defaultFormValues}
      schema={schema}
      setReset={(value) =>
        shouldResetAfterSuccess ? setShouldReset(value) : {}
      }
      shouldReset={shouldReset}
      state={state}
    >
      <Form {...formProps} action={action ? formAction : () => {}}>
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
