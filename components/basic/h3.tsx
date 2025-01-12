import React from "react";
import clsx from "clsx";

const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <h2 {...props} className={clsx(props.className, "md:text-xl text-medium")}>
      {props.children}
    </h2>
  );
};

export default H3;
