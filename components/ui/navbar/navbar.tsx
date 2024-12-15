import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Image from "next/image";
import { SearchIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";

import Logo from "@/public/logo.svg";
import NavItems from "@/components/ui/navbar/nav-items";
import NavAuthButtons from "@/components/ui/navbar/nav-auth-buttons";
import NavMenu from "@/components/ui/navbar/nav-menu";
import { auth } from "@/auth";
import UserDropdown from "@/components/ui/user-dropdown";

const Navbar = async () => {
  const session = await auth();

  return (
    <NextUINavbar className="main-background">
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Image
            alt="BrainChain logo"
            className="sm:w-10 sm:h-10 lg:w-14 lg:h-14 w-14 h-14 bg-black rounded-3xl dark:bg-primary-50"
            src={Logo}
          />
          <p className="hidden sm:block font-bold text-inherit ml-1">
            BrainChain
          </p>
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
