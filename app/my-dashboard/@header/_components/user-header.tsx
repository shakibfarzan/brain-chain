import React from "react";
import { User as UserType } from "@prisma/client";
import { User } from "@nextui-org/user";

import H1 from "@/components/basic/h1";
import { getImageUrl } from "@/app/actions";

type Props = Partial<Pick<UserType, "image" | "name" | "bio" | "reputation">>;

const UserHeader: React.FC<Props> = async ({
  image,
  name,
  bio,
  reputation,
}) => {
  const imageUrl = await getImageUrl(image ?? "");

  return (
    <User
      avatarProps={{
        src: imageUrl ?? undefined,
        className: "md:!size-32 !size-20",
      }}
      description={
        <div>
          <p className="md:text-lg text-base">{bio}</p>
          <p className="md:text-base text-sm">Reputation: {reputation}</p>
        </div>
      }
      name={<H1>{name}</H1>}
    />
  );
};

export default UserHeader;
