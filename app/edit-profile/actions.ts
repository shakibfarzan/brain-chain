"use server";
import { UploadResponse } from "pinata";
import { revalidatePath } from "next/cache";

import { pinata } from "@/utils/config";
import { updateUserImage } from "@/db/user";
import { unstable_update } from "@/auth";
import { safePromise } from "@/utils";
import routes from "@/config/routes";

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
