import dayjs from "dayjs";

import { DATETIME_FORMATS } from "@/config/constants";

const getRelativeDateTitle = (date: dayjs.ConfigType): string | undefined => {
  const dateObj = dayjs(date);
  const now = dayjs(new Date());

  if (dateObj.isBefore(now)) {
    const diffsByDays = dateObj.diff(now, "days");

    if (diffsByDays === 0) return "Today";
    else if (diffsByDays === 1) return "Yesterday";
    else if (diffsByDays > 1 && diffsByDays <= 7)
      return dateObj.format(DATETIME_FORMATS.FULL_WEEKDAY);
  } else return dateObj.format(DATETIME_FORMATS.DATE_DASH_SEPARATOR);
};

export default getRelativeDateTitle;
