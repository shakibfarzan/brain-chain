import { ActivityType } from "@prisma/client";

export const DATETIME_FORMATS = {
  DATE_DASH_SEPARATOR: "YYYY-MM-DD",
  FULL_WEEKDAY: "dddd",
} as const;

export const SIGNS = {
  PARAMS_START: "[",
  PARAMS_END: "]",
  SEGMENT_SEPARATOR: "/",
  SEARCH_PARAM_SEPARATOR: "&",
  SEARCH_PARAM_KEY_VALUE_SEPARATOR: "=",
  SEARCH_PARAM_STARTER: "?",
};

export const SEARCH_PARAMS_KEYS = {
  ANSWER_ID: "answerId",
  COMMENT_ID: "commentId",
  PAGE: "page",
  PAGE_SIZE: "pageSize",
  TABS_PAGE: "tabsPage",
  ACTIVITY_TYPE: "activityType",
  ACTIVITY_LOG_ORDER: "activityLogOrder",
};

export const ActivityTypes: Record<ActivityType, string> = {
  ANSWER_ACCEPTED: "Answer Accepted",
  ANSWER_POSTED: "Answer Posted",
  ANSWER_UPVOTED: "Answer Upvoted",
  BADGE_EARNED: "Badge Earned",
  COMMENT_POSTED: "Comment Posted",
  PROFILE_UPDATED: "Profile Updated",
  QUESTION_POSTED: "Question Posted",
  QUESTION_UPVOTED: "Question Upvoted",
  USER_REGISTERED: "User Registered",
};
