import React from "react";
import clsx from "clsx";

const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <h2 {...props} className={clsx(props.className, "md:text-2xl text-lg")}>
      {props.children}
    </h2>
  );
};

export default H2;
