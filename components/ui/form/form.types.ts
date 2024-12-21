import React, { useActionState } from "react";

import CustomForm from "@/components/ui/form/custom-form";

export type ZodFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export type FormItemProps = {
  fieldName: string;
  isRealTime?: boolean;
};

export type FormState = { errors: ZodFieldErrors; isSuccess: boolean };

export type ActionState = typeof useActionState<FormState, FormData>;

export type FormAction = Parameters<ActionState>[0];

export type FormFunctionalChildren = React.ComponentProps<
  typeof CustomForm
>["children"];
