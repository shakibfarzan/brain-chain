"use server";
import { UploadResponse } from "pinata";
import { revalidatePath } from "next/cache";

import { pinata } from "@/utils/config";
import { updateUserImage, updateUserInformation } from "@/db/user";
import { unstable_update } from "@/auth";
import { safePromise } from "@/utils";
import routes from "@/config/routes";
import { FormAction } from "@/components/ui/form/form.types";
import { profileInformationSchema } from "@/app/edit-profile/form-schemas";
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
  const [res, error] = await safePromise(updateUserInformation(data));

  if (error)
    return updateFormActionErrors(
      prevState,
      undefined,
      "bio",
      error?.cause?.err?.message,
    );
  if (res?.data) await unstable_update({ user: { ...res?.data } });

  return { ...prevState, isSuccess: true };
};
