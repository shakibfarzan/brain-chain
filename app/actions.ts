"use server";
import { pinata } from "@/utils/config";
import { safePromise } from "@/utils";
import { getCurrentUser } from "@/db/user";

export const getImageUrl = async (urlOrCid: string): Promise<string | null> => {
  if (!urlOrCid) return null;
  const url = await pinata.gateways.createSignedURL({
    cid: urlOrCid,
    expires: 3600,
  });

  return urlOrCid.includes("https") ? urlOrCid : url;
};

export const currentUserAction = async () => {
  const [res] = await safePromise(getCurrentUser());

  return res;
};
