import { z } from "zod";

import { optionalString, requiredString } from "@/utils";

export const profileInformationSchema = z.object({
  name: requiredString,
  bio: optionalString,
});
