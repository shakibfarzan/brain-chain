import { z } from "zod";

const userNameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must be at least 2 characters long." })
  .max(50, { message: "Name must be at most 50 characters long." })
  .regex(/^[a-zA-ZÀ-ÿ' -]+$/, {
    message: "Name can only contain letters, spaces, hyphens, and apostrophes.",
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

const optionalString = z.string().optional();

export { optionalString, emailSchema, passwordSchema, requiredString, userNameSchema };
