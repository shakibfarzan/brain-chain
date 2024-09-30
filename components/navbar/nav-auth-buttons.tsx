"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import routes from "@/config/routes";

const NavAuthButtons: React.FC = () => {
  const { push } = useRouter();

  return (
    <>
      <Button
        color="primary"
        variant="light"
        onClick={() => push(routes.AUTH.LOG_IN)}
      >
        Log in
      </Button>
      <Button
        color="primary"
        href={routes.AUTH.SIGN_UP}
        variant="flat"
        onClick={() => push(routes.AUTH.SIGN_UP)}
      >
        Sign up
      </Button>
    </>
  );
};

export default NavAuthButtons;
