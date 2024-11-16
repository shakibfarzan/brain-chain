"use client";
import React from "react";
import Link from "next/link";

import { useIsCurrentPath } from "@/hooks";

type TWrapperLink = {
  isActive: boolean;
  children: React.ReactNode;
};

type Props = {
  WrapperComponent: React.FC<TWrapperLink>;
  href: string;
  label: string;
};

const NavLink: React.FC<Props> = ({ label, href, WrapperComponent }) => {
  const isCurrentPath = useIsCurrentPath();

  return (
    <WrapperComponent isActive={isCurrentPath(href)}>
      <Link
        className={isCurrentPath(href) ? "text-primary-400" : ""}
        href={href}
      >
        {label}
      </Link>
    </WrapperComponent>
  );
};

export default NavLink;
