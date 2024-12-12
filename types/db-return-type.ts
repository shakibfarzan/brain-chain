import { ZodError } from "zod";

export type DbReturnType<T> = {
  data?: T;
  dbError?: any;
  schemaError?: ZodError;
};

export type PaginatedReturnType<T> = {
  results: T[];
  count: number;
};
