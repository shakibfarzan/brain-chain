import { z } from "zod";

import { requiredString } from "@/utils";

export const askQuestionFormSchema = z.object({
  title: requiredString,
  description: z
    .string()
    .min(26, "Description must be more than 20 characters!"),
  tags: z.array(z.string()).nonempty("Is Required"),
});
