import React from "react";
import { CardHeader } from "@nextui-org/card";

import { H2 } from "@/components/basic";

type Props = {
  title: string;
  description: string;
};

const ProfileCardHeader: React.FC<Props> = ({ description, title }) => {
  return (
    <CardHeader className="flex-col items-start">
      <H2>{title}</H2>
      <p className="text-foreground-500">{description}</p>
    </CardHeader>
  );
};

export default ProfileCardHeader;
