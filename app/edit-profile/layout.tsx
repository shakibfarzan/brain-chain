import React, { PropsWithChildren } from "react";

import { currentUserHasPassword } from "@/db/user";

type Props = PropsWithChildren<{
  information: React.ReactNode;
  picture: React.ReactNode;
  "set-password": React.ReactNode;
  "update-password": React.ReactNode;
}>;

const EditProfileLayout = async ({
  information,
  picture,
  "update-password": updatePassword,
  "set-password": setPassword,
  children,
}: Props) => {
  const { data: hasPassword } = await currentUserHasPassword();

  return (
    <div className="flex flex-col gap-4 w-full">
      {children}
      <div className="flex flex-col gap-4 md:flex-row-reverse w-full">
        {information}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {picture}
          {hasPassword ? updatePassword : setPassword}
        </div>
      </div>
    </div>
  );
};

export default EditProfileLayout;
