import React from "react";
import {
  faBook,
  faComments,
  faHandPointUp,
  faLightbulb,
  faSquareCheck,
  faStar,
  faTrophy,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { faEarlybirds } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";

import { IconValue } from "@/types";

type Props = {
  description: string;
  title: string;
};

const UserBadge: React.FC<Props> = ({ title, description }) => {
  const iconProps = titleIconMap[title];

  return (
    <Tooltip content={description} placement="top">
      <Chip className="bg-gradient-to-br from-primary-100 p-2 to-secondary-100">
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon color={iconProps.color} icon={iconProps.icon} />
          {title}
        </div>
      </Chip>
    </Tooltip>
  );
};

export default UserBadge;

const titleIconMap: Record<string, IconValue> = {
  "First Question": { icon: faLightbulb, color: "#4CAF50" },
  "First Answer": { icon: faHandPointUp, color: "#8fc1ee" },
  "Top Contributor": { icon: faTrophy, color: "#FFC107" },
  "Popular Question": { icon: faStar, color: "#FF5722" },
  "Accepted Answer": { icon: faSquareCheck, color: "#8BC34A" },
  "Tag Specialist": { icon: faUserTag, color: "#b03c27" },
  "Early Bird": { icon: faEarlybirds, color: "#FFEB3B" },
  "Community Helper": { icon: faComments, color: "#03A9F4" },
  Mentor: { icon: faBook, color: "#aa93d9" },
};
