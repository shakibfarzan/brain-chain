import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { H2, UploadImage } from "@/components/basic";
import { updateProfilePicture } from "@/app/edit-profile/actions";
import { getImageUrl } from "@/app/actions";
import { getCurrentUser } from "@/db/user";

const ProfilePicture = async () => {
  const { data: user } = await getCurrentUser();
  const imageUrl = await getImageUrl(user?.image ?? "");

  return (
    <Card isBlurred className="shadow-small p-2 w-full">
      <CardHeader className="flex-col items-start">
        <H2>Profile Picture</H2>
        <p className="text-foreground-500">Update your profile picture</p>
      </CardHeader>
      <CardBody>
        <UploadImage
          initialPreview={imageUrl}
          previewClassName="w-32 h-32"
          onSave={updateProfilePicture}
        />
      </CardBody>
    </Card>
  );
};

export default ProfilePicture;
