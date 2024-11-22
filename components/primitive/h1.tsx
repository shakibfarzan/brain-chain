import React from "react";

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <h1 {...props} className={`${props.className ?? ""} text-3xl`}>
      {props.children}
    </h1>
  );
};

export default H1;
