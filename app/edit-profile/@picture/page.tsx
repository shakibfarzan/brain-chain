import React from "react";
import { CardBody } from "@nextui-org/card";

import { CardPagePaper, UploadImage } from "@/components/basic";
import { updateProfilePicture } from "@/app/edit-profile/actions";
import { getImageUrl } from "@/app/actions";
import { getCurrentUser } from "@/db/user";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";

const ProfilePicture = async () => {
  const { data: user } = await getCurrentUser();
  const imageUrl = await getImageUrl(user?.image ?? "");

  return (
    <CardPagePaper>
      <ProfileCardHeader
        description="Update your profile picture"
        title="Profile Picture"
      />
      <CardBody>
        <UploadImage
          initialPreview={imageUrl ?? undefined}
          previewClassName="w-32 h-32"
          onSave={updateProfilePicture}
        />
      </CardBody>
    </CardPagePaper>
  );
};

export default ProfilePicture;
