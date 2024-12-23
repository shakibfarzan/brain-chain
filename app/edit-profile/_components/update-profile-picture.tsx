"use client";
import React from "react";

import { UploadImage } from "@/components/basic";
import { updateProfilePicture } from "@/app/edit-profile/actions";
import useCurrentUser from "@/hooks/use-current-user";

const UpdateProfilePicture: React.FC = () => {
  const { data: user, reload } = useCurrentUser();

  return (
    <UploadImage
      initialPreview={user?.image ?? undefined}
      previewClassName="w-32 h-32"
      onSave={async (file) => {
        await updateProfilePicture(file);
        await reload();
      }}
    />
  );
};

export default UpdateProfilePicture;
