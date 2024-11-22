import { FormState, ZodFieldErrors } from "@/components/ui/form/form.types";

const updateFormActionErrors = (
  prevState: FormState,
  errors?: ZodFieldErrors,
  fieldName?: string,
  errorMessage?: string,
) => ({
  ...prevState,
  errors: errors
    ? { ...prevState.errors, ...errors }
    : fieldName && errorMessage
      ? { ...prevState.errors, [fieldName]: [errorMessage] }
      : {},
});

export default updateFormActionErrors;
