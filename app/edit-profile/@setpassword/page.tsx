import React from "react";
import { CardBody } from "@nextui-org/card";

import { CardPagePaper } from "@/components/basic";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";
import PasswordsForm from "@/app/edit-profile/_components/passwords-form";

const SetPassword = () => {
  return (
    <CardPagePaper>
      <ProfileCardHeader
        description="Set your account password"
        title="Set Password"
      />
      <CardBody>
        <PasswordsForm actionType="set" />
      </CardBody>
    </CardPagePaper>
  );
};

export default SetPassword;
