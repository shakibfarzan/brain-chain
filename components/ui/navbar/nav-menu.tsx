import React from "react";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";

import { siteConfig } from "@/config/site";
import NavLink from "@/components/ui/navbar/nav-link";

const NavMenu: React.FC = () => {
  return (
    <NavbarMenu className="!h-full">
      {siteConfig.navItems.map((ni) => (
        <NavLink {...ni} key={ni.label} WrapperComponent={NavbarMenuItem} />
      ))}
    </NavbarMenu>
  );
};

export default NavMenu;
