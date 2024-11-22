import { z } from "zod";

const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long." })
  .max(20, { message: "Username must be at most 20 characters long." })
  .regex(/^[a-zA-Z0-9._]+$/, {
    message:
      "Username can only contain letters, numbers, underscores, and dots.",
  })
  .refine((username) => !username.includes(" "), {
    message: "Username cannot contain spaces.",
  })
  .refine(
    (username) => !username.startsWith(".") && !username.startsWith("_"),
    {
      message: "Username cannot start with a dot or underscore.",
    },
  )
  .refine((username) => !username.endsWith(".") && !username.endsWith("_"), {
    message: "Username cannot end with a dot or underscore.",
  })
  .refine((username) => !/([._])\1/.test(username), {
    message: "Username cannot have consecutive dots or underscores.",
  });

const emailSchema = z
  .string()
  .trim()
  .min(5, { message: "Email must be more than 5 characters!" })
  .email()
  .max(254, { message: "Email must be less than 254 characters!" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters!" })
  .regex(/[a-zA-Z]/, {
    message: "Password must be contains at least one letter!",
  })
  .regex(/\d/, { message: "Password must be contains at least one number!" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Password must be contains at least one special character!",
  });

const requiredString = z.string().min(1, "Is Required");

export { usernameSchema, emailSchema, passwordSchema, requiredString };
