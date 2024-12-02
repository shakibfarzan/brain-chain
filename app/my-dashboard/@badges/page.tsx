import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { getBadgesOfCurrentUser } from "@/db/badges";
import UserBadge from "@/app/my-dashboard/@badges/_components/user-badge";

const Badges = async () => {
  const { data } = await getBadgesOfCurrentUser();
  const notFoundAnyBadges = data && !data.length;

  return (
    <Card className="w-full sm:w-1/2 p-2">
      <CardHeader className="text-2xl font-semibold">Badges</CardHeader>
      <CardBody className="flex flex-wrap flex-row gap-x-4">
        {data?.map((bg) => (
          <UserBadge
            key={bg.id}
            description={bg.badge.description}
            title={bg.badge.title}
          />
        ))}
        {notFoundAnyBadges && <p>You have not earned any badges :(</p>}
      </CardBody>
    </Card>
  );
};

export default Badges;
