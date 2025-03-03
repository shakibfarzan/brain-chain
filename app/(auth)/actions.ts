"use server";

import { redirect } from "next/navigation";

import { FormAction } from "@/components/ui/form/form.types";
import { safePromise } from "@/utils";
import updateFormActionErrors from "@/components/ui/form/utils/update-form-action-errors";
import { signIn } from "@/auth";
import { loginFormSchema } from "@/app/(auth)/form-schemas";

export const loginFormAction: FormAction = async (prevState, formData) => {
  const actionType = formData.get("action");

  if (actionType === "credentials") {
    const result = loginFormSchema.safeParse(Object.fromEntries(formData));

    if (!result.success)
      return updateFormActionErrors(
        prevState,
        result?.error?.flatten().fieldErrors,
      );
    else {
      const [, error] = await safePromise(
        signIn("credentials", { ...result.data, redirect: false }),
      );

      if (error)
        return updateFormActionErrors(
          prevState,
          undefined,
          "password",
          error?.cause?.err?.message,
        );
      redirect("/");
    }
  } else {
    await signIn(actionType?.toString(), { redirectTo: "/" });
  }

  // need snackbar
  return { ...prevState, isSuccess: true };
};
