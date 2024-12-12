import { useSearchParams } from "next/navigation";
import { ActivityType } from "@prisma/client";

import { SEARCH_PARAMS_KEYS } from "@/config/constants";
import { OrderType } from "@/types";

type ActivitiesFilterValues = {
  activityType: ActivityType | undefined;
  orderType: OrderType | undefined;
};

const useActivitiesFilterValues = (): ActivitiesFilterValues => {
  const searchParams = useSearchParams();
  let activityType: any = searchParams.get(SEARCH_PARAMS_KEYS.ACTIVITY_TYPE);
  let orderType: any = searchParams.get(SEARCH_PARAMS_KEYS.ACTIVITY_LOG_ORDER);

  activityType = activityType?.length
    ? (activityType as ActivityType)
    : undefined;
  orderType = orderType?.length ? (orderType as OrderType) : undefined;

  return { activityType, orderType };
};

export default useActivitiesFilterValues;
