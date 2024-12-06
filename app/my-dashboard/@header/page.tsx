import React from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Divider } from "@nextui-org/divider";

import { getCurrentUser } from "@/db/user";
import routes from "@/config/routes";
import UserHeader from "@/app/my-dashboard/@header/_components/user-header";

const DashboardTabs = dynamic(
  () => import("@/app/my-dashboard/@header/_components/dashboard-tabs"),
);

const Header = async () => {
  const { data } = await getCurrentUser();

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="w-full flex items-center justify-between">
        <UserHeader {...(data ?? {})} />
        <Button
          as={Link}
          href={routes.MY_DASHBOARD.EDIT_PROFILE}
          variant="flat"
        >
          Edit Profile
        </Button>
      </div>
      <Divider />
      <DashboardTabs />
    </div>
  );
};

export default Header;
