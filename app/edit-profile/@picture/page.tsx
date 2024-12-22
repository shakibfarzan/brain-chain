import React from "react";
import { CardBody } from "@nextui-org/card";

import { CardPagePaper } from "@/components/basic";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";
import UpdateProfilePicture from "@/app/edit-profile/@picture/_components/update-profile-picture";

const ProfilePicture = () => {
  return (
    <CardPagePaper>
      <ProfileCardHeader
        description="Update your profile picture"
        title="Profile Picture"
      />
      <CardBody>
        <UpdateProfilePicture />
      </CardBody>
    </CardPagePaper>
  );
};

export default ProfilePicture;
