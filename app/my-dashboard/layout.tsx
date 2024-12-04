import React, { PropsWithChildren } from "react";
import { Divider } from "@nextui-org/divider";

type Props = PropsWithChildren<{
  tabs: React.ReactNode;
  header: React.ReactNode;
  statistics: React.ReactNode;
  badges: React.ReactNode;
  timeline: React.ReactNode;
}>;

const MyDashboardLayout = ({
  children,
  tabs,
  badges,
  header,
  statistics,
  timeline,
}: Props) => {
  return (
    <div>
      {header}
      <div className="w-full flex flex-col items-center bg-black bg-opacity-10 rounded-b-xl px-2 pt-2 pb-4">
        {tabs}
      </div>
      {children}
      <Divider className="my-4" />
      <div className="w-full flex flex-col sm:flex-row gap-4 my-8">
        {statistics}
        {badges}
      </div>
      <Divider className="my-4" />
      {timeline}
    </div>
  );
};

export default MyDashboardLayout;
