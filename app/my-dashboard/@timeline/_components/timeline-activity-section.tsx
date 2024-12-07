import React from "react";
import { ActivityLog, ActivityType } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faComment,
  faMedal,
  faPencil,
  faPenToSquare,
  faQuestionCircle,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { DATETIME_FORMATS } from "@/config/constants";
import { IconValue } from "@/types";

const TimelineActivitySection: React.FC<ActivityLog> = ({
  activityType,
  id,
  description,
  createdAt,
  relatedId,
}) => {
  const activityTypeIcon = ActivityTypeIcons[activityType];

  return (
    <li key={id} className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-2 dark:ring-gray-700 dark:bg-gray-900 ring-gray-300 bg-gray-50">
        <FontAwesomeIcon
          color={activityTypeIcon.color}
          icon={activityTypeIcon.icon}
        />
      </span>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </time>
        <span
          className="text-xs text-gray-500 dark:text-gray-400"
          title={format(createdAt, "PPpp")}
        >
          {format(createdAt, DATETIME_FORMATS.SHORT_MONTH_NAME)}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {description}
      </h3>
    </li>
  );
};

export default TimelineActivitySection;

const ActivityTypeIcons: Record<ActivityType, IconValue> = {
  USER_REGISTERED: { icon: faUser, color: "#4CAF50" },
  QUESTION_UPVOTED: { icon: faThumbsUp, color: "#FF9800" },
  QUESTION_POSTED: { icon: faQuestionCircle, color: "#6a81ec" },
  PROFILE_UPDATED: { icon: faPencil, color: "#607D8B" },
  COMMENT_POSTED: { icon: faComment, color: "#9C27B0" },
  BADGE_EARNED: { icon: faMedal, color: "#FFD700" },
  ANSWER_UPVOTED: { icon: faThumbsUp, color: "#ff8000" },
  ANSWER_POSTED: { icon: faPenToSquare, color: "#2196F3" },
  ANSWER_ACCEPTED: { icon: faCheckSquare, color: "#1abd24" },
};
