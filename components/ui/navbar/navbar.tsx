import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@nextui-org/shared-icons";

import Logo from "@/public/logo.svg";
import NavItems from "@/components/ui/navbar/nav-items";
import NavAuthButtons from "@/components/ui/navbar/nav-auth-buttons";
import NavMenu from "@/components/ui/navbar/nav-menu";
import { auth } from "@/auth";
import UserDropdown from "@/components/ui/user-dropdown";

const Navbar = async () => {
  const session = await auth();

  return (
    <NextUINavbar isBordered>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Image alt="BrainChain logo" className="w-[20%] h-[20%]" src={Logo} />
          <p className="hidden sm:block font-bold text-inherit">BrainChain</p>
        </NavbarBrand>
        <NavItems />
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[12rem] min-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon />}
          type="search"
        />
        {session ? <UserDropdown /> : <NavAuthButtons />}
      </NavbarContent>
      <NavMenu />
    </NextUINavbar>
  );
};

export default Navbar;
