"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/tabs";

import routes from "@/config/routes";

const DashboardTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="border-2 border-b-0 px-3 pt-3 border-solid border-gray-400 rounded-t-xl">
      <Tabs
        aria-label="Tabs"
        color="primary"
        selectedKey={pathname}
        variant="light"
        onSelectionChange={(key) => router.push(key as string)}
      >
        <Tab key={routes.MY_DASHBOARD.QUESTIONS} title="Questions" />
        <Tab key={routes.MY_DASHBOARD.ANSWERS} title="Answers" />
        <Tab key={routes.MY_DASHBOARD.COMMENTS} title="Comments" />
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
