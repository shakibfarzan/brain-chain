"use client";
import React from "react";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";
import { useIsCurrentPath } from "@/hooks";

const NavMenu: React.FC = () => {
  const isCurrentPath = useIsCurrentPath();

  return (
    <NavbarMenu>
      {siteConfig.navItems.map(({ href, label }) => (
        <NavbarMenuItem key={label}>
          <Link
            className="w-full"
            color={isCurrentPath(href) ? "primary" : "foreground"}
            href="#"
            size="lg"
          >
            {label}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};

export default NavMenu;
