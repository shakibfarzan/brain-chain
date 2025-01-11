"use server";
import { getAllTags } from "@/db/tag";
import { FormState } from "@/components/ui/form/form.types";
import { askQuestionFormSchema } from "@/app/(questions)/form-schemas";
import updateFormActionErrors from "@/components/ui/form/utils/update-form-action-errors";
import { createQuestion } from "@/db/question";

export const fetchAllTags: typeof getAllTags = async () => await getAllTags();

export const askQuestionFormAction = async (
  prevState: FormState,
  formData: Record<string, any>,
) => {
  const {
    success,
    data,
    error: schemaError,
  } = askQuestionFormSchema.safeParse(formData);

  if (!success)
    return updateFormActionErrors(
      prevState,
      schemaError?.flatten().fieldErrors,
    );

  const { dbError } = await createQuestion(data);

  if (dbError)
    return updateFormActionErrors(prevState, undefined, "tags", dbError);

  return { ...prevState, isSuccess: true };
};
