import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { auth } from "@/auth";
import { H2, UploadImage } from "@/components/basic";

const ProfilePicture = async () => {
  const session = await auth();

  return (
    <Card isBlurred className="shadow-small p-2 w-full">
      <CardHeader className="flex-col items-start">
        <H2>Profile Picture</H2>
        <p className="text-foreground-500">Update your profile picture</p>
      </CardHeader>
      <CardBody>
        <UploadImage
          initialPreview={session?.user?.image ?? undefined}
          previewClassName="w-32 h-32"
        />
      </CardBody>
    </Card>
  );
};

export default ProfilePicture;
