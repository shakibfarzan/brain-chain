import React from "react";
import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <Spinner label="Loading" size="lg" />
    </div>
  );
};

export default Loading;
