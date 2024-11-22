export type ZodFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};
