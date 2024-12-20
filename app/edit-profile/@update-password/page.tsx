import React from "react";

import { CardPagePaper } from "@/components/basic";
import ProfileCardHeader from "@/app/edit-profile/_components/profile-card-header";

const UpdatePassword = () => {
  return (
    <CardPagePaper>
      <ProfileCardHeader
        description="Change your account password"
        title="Update Password"
      />
    </CardPagePaper>
  );
};

export default UpdatePassword;
