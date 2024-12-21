import React from "react";
import { CardBody } from "@nextui-org/card";

import { CardPagePaper } from "@/components/basic";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";
import InformationForm from "@/app/edit-profile/@information/_components/information-form";

const ProfileInformation = () => {
  return (
    <CardPagePaper className="md:w-1/2 h-min">
      <ProfileCardHeader
        description="Update your profile details"
        title="Profile Information"
      />
      <CardBody>
        <InformationForm />
      </CardBody>
    </CardPagePaper>
  );
};

export default ProfileInformation;
