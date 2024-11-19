import { ZodError } from "zod";

export type DBReturnType<T> = {
  data?: T;
  dbError?: any;
  schemaError?: ZodError;
};
