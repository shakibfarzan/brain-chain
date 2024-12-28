import { z } from "zod";

import { optionalString, passwordSchema, requiredString } from "@/utils";

export const profileInformationSchema = z.object({
  name: requiredString,
  bio: optionalString,
});

export const passwordsFormSchema = (isUpdate = true) => {
  const schema = z.object({
    currentPassword: requiredString,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  });

  return isUpdate ? schema : schema.omit({ currentPassword: true });
};
