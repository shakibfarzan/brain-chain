"use server";

import { z } from "zod";

import { FormAction } from "@/components/ui/form/form.types";
import updateFormActionErrors from "@/components/ui/form/utils/updateFormActionErrors";
import { emailSchema, requiredString } from "@/utils";

export const loginFormAction: FormAction = async (prevState, formData) => {
  const loginFormSchema = z.object({
    email: emailSchema,
    password: requiredString,
  });
  const result = loginFormSchema.safeParse(Object.fromEntries(formData));

  if (!result.success)
    return updateFormActionErrors(
      prevState,
      result?.error?.flatten().fieldErrors,
    );
  else if (formData.get("password") !== "12345678")
    return updateFormActionErrors(
      prevState,
      undefined,
      "password",
      "Password does not match",
    );

  return prevState;
};
