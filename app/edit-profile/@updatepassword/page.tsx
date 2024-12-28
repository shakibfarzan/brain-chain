import React from "react";
import { CardBody } from "@nextui-org/card";

import { CardPagePaper } from "@/components/basic";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";
import PasswordsForm from "@/app/edit-profile/_components/passwords-form";

const UpdatePassword = () => {
  return (
    <CardPagePaper>
      <ProfileCardHeader
        description="Change your account password"
        title="Update Password"
      />
      <CardBody>
        <PasswordsForm actionType="update" />
      </CardBody>
    </CardPagePaper>
  );
};

export default UpdatePassword;
