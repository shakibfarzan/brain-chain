import React from "react";

import { CardPagePaper } from "@/components/basic";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";

const ProfileInformation = () => {
  return (
    <CardPagePaper className="md:w-1/2">
      <ProfileCardHeader
        description="Update your profile details"
        title="Profile Information"
      />
    </CardPagePaper>
  );
};

export default ProfileInformation;
