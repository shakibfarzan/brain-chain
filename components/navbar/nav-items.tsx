"use client";
import React from "react";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

const NavItems: React.FC = () => {
  const pathname = usePathname();

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {siteConfig.navItems.map(({ label, href }) => (
        <NavbarItem key={label} isActive={href === pathname}>
          <Link
            color={href === pathname ? "primary" : "foreground"}
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
