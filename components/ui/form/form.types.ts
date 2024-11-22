import { useActionState } from "react";

export type ZodFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export type FormItemProps = {
  fieldName: string;
  isRealTime?: boolean;
};

export type FormState = { errors: ZodFieldErrors };

export type ActionState = typeof useActionState<FormState, FormData>;

export type FormAction = Parameters<ActionState>[0];
