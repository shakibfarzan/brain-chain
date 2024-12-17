import React from "react";
import { Card } from "@nextui-org/card";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const CardPagePaper: React.FC<Props> = ({ children, className }) => {
  return (
    <Card isBlurred className={clsx("shadow-small p-2 w-full", className)}>
      {children}
    </Card>
  );
};

export default CardPagePaper;
