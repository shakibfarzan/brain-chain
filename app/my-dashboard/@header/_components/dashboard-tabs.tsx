"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/tabs";

import routes from "@/config/routes";

const DashboardTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-black bg-opacity-10 px-3 pt-3 rounded-t-xl">
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
