import React from "react";

import ActivityTimeline from "@/app/my-dashboard/@timeline/page";
import { PropsWithParams } from "@/types/app-params";

const Default = (props: PropsWithParams) => {
  return <ActivityTimeline {...props} />;
};

export default Default;
