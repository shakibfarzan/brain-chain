"use client";
import React from "react";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";
import { useIsCurrentPath } from "@/hooks";

const NavItems: React.FC = () => {
  const isCurrentPath = useIsCurrentPath();

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {siteConfig.navItems.map(({ label, href }) => (
        <NavbarItem key={label} isActive={isCurrentPath(href)}>
          <Link
            color={isCurrentPath(href) ? "primary" : "foreground"}
            href={href}
          >
            {label}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );
};

export default NavItems;
