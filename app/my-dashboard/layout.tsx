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
      <div className="w-full flex flex-col items-center border-2 border-solid border-gray-400 border-t-0 rounded-b-xl px-2 pt-2 pb-4">
        {tabs}
      </div>
      {children}
      <div className="w-full flex flex-col sm:flex-row gap-4 my-8">
        {statistics}
        {badges}
      </div>
      {timeline}
    </div>
  );
};

export default MyDashboardLayout;
