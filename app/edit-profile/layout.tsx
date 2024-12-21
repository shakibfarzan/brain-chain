import React, { PropsWithChildren } from "react";

import { currentUserHasPassword } from "@/db/user";

type Props = PropsWithChildren<{
  information: React.ReactNode;
  picture: React.ReactNode;
  setpassword: React.ReactNode;
  updatepassword: React.ReactNode;
}>;

const EditProfileLayout = async ({
  information,
  picture,
  updatepassword,
  setpassword,
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
          {hasPassword ? updatepassword : setpassword}
        </div>
      </div>
    </div>
  );
};

export default EditProfileLayout;
