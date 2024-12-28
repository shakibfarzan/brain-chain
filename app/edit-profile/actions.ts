"use server";
import { UploadResponse } from "pinata";
import { revalidatePath } from "next/cache";

import { pinata } from "@/utils/config";
import {
  updateUserImage,
  updateUserInformation,
  updateUserPassword,
} from "@/db/user";
import { unstable_update } from "@/auth";
import { safePromise } from "@/utils";
import routes from "@/config/routes";
import { FormAction } from "@/components/ui/form/form.types";
import {
  passwordsFormSchema,
  profileInformationSchema,
} from "@/app/edit-profile/form-schemas";
import updateFormActionErrors from "@/components/ui/form/utils/update-form-action-errors";

export const updateProfilePicture = async (
  file: File | null,
): Promise<void> => {
  let uploadData: UploadResponse | null = null;

  if (file) {
    uploadData = await pinata.upload.file(file);
  }
  const [res] = await safePromise(updateUserImage(uploadData?.cid ?? null));

  if (res?.data?.image)
    await unstable_update({ user: { image: res.data.image } });
  revalidatePath(routes.MY_DASHBOARD.EDIT_PROFILE, "layout");
  revalidatePath(routes.HOME);
};

export const updateProfileInformationAction: FormAction = async (
  prevState,
  formData,
) => {
  const {
    success,
    data,
    error: schemaError,
  } = profileInformationSchema.safeParse(Object.fromEntries(formData));

  if (!success)
    return updateFormActionErrors(
      prevState,
      schemaError?.flatten().fieldErrors,
    );
  const { data: res, dbError } = await updateUserInformation(data);

  if (dbError)
    return updateFormActionErrors(prevState, undefined, "bio", dbError);
  if (res) await unstable_update({ user: { ...res } });

  return { ...prevState, isSuccess: true };
};

export const updatePasswordsAction: FormAction = async (
  prevState,
  formData,
) => {
  const isUpdate = formData.get("actionType") === "update";

  const {
    success,
    data,
    error: schemaError,
  } = passwordsFormSchema(isUpdate).safeParse(Object.fromEntries(formData));

  if (!success)
    return updateFormActionErrors(
      prevState,
      schemaError?.flatten().fieldErrors,
    );

  const { dbError } = await updateUserPassword(data);

  if (dbError)
    return updateFormActionErrors(
      prevState,
      undefined,
      dbError.field,
      dbError.message,
    );

  return { ...prevState, isSuccess: true };
};
