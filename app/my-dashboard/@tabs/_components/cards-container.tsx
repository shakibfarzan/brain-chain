import React, { PropsWithChildren } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

const CardsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollShadow
      className="flex flex-col my-4 max-h-[60vh] p-2 w-full"
      size={20}
    >
      {children}
    </ScrollShadow>
  );
};

export default CardsContainer;
