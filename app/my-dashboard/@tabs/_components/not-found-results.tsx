import React from "react";

type Props = {
  title: string;
};

const NotFoundResults: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-[20vh]">{title}</div>
  );
};

export default NotFoundResults;
