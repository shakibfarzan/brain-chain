import React, { PropsWithChildren } from "react";

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
      {tabs}
      {children}
      <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
        {statistics}
        {badges}
      </div>
      {timeline}
    </div>
  );
};

export default MyDashboardLayout;
