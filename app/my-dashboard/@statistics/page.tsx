import React from "react";
import { CardBody, CardHeader } from "@nextui-org/card";

import { getCurrentUserStatistics } from "@/db/user";
import { CardPagePaper } from "@/components/basic";

const UserStatistics = async () => {
  const { data } = await getCurrentUserStatistics();

  return (
    <CardPagePaper className="sm:w-1/2 overflow-visible">
      <CardHeader className="text-2xl font-semibold">
        User Statistics
      </CardHeader>
      <CardBody className="grid grid-cols-2 grid-rows-2 gap-4 my-2">
        <StatisticSection
          description="Total Questions Asked"
          title={data?.totalQuestions.toString() ?? ""}
        />
        <StatisticSection
          description="Total Answers Given"
          title={data?.totalAnswers.toString() ?? ""}
        />
        <StatisticSection
          description="Total Comments"
          title={data?.totalComments.toString() ?? ""}
        />
        <StatisticSection
          description="Upvotes Received"
          title={data?.upvoteReceived.toString() ?? ""}
        />
      </CardBody>
    </CardPagePaper>
  );
};

export default UserStatistics;

type Props = {
  title: string;
  description: string;
};

const StatisticSection: React.FC<Props> = ({ description, title }) => (
  <div className="flex flex-col items-center">
    <p className="text-2xl font-semibold">{title}</p>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);
