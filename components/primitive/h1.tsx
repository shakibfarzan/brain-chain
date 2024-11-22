import clsx from "clsx";
import React from "react";

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <h1 {...props} className={clsx(props.className, "text-3xl")}>
      {props.children}
    </h1>
  );
};

export default H1;
