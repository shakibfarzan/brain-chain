import React from "react";

import { CardPagePaper } from "@/components/basic";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";

const SetPassword = () => {
  return (
    <CardPagePaper>
      <ProfileCardHeader
        description="Set your account password"
        title="Set Password"
      />
    </CardPagePaper>
  );
};

export default SetPassword;
