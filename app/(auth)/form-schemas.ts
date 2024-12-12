import { z } from "zod";

import { emailSchema, requiredString } from "@/utils";

export const loginFormSchema = z.object({
  email: emailSchema,
  password: requiredString,
});
