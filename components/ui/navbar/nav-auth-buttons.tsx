"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import routes from "@/config/routes";

const NavAuthButtons: React.FC = () => {
  const { push } = useRouter();

  return (
    <div className="gap-2 sm:flex hidden">
      <Button
        color="primary"
        variant="light"
        onPress={() => push(routes.AUTH.LOG_IN)}
      >
        Log in
      </Button>
      <Button
        color="primary"
        href={routes.AUTH.SIGN_UP}
        variant="flat"
        onPress={() => push(routes.AUTH.SIGN_UP)}
      >
        Sign up
      </Button>
    </div>
  );
};

export default NavAuthButtons;
