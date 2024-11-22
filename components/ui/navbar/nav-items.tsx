import React from "react";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";

import { siteConfig } from "@/config/site";
import NavLink from "@/components/ui/navbar/nav-link";

const NavItems: React.FC = () => {
  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {siteConfig.navItems.map((ni) => (
        <NavLink {...ni} key={ni.label} WrapperComponent={NavbarItem} />
      ))}
    </NavbarContent>
  );
};

export default NavItems;
