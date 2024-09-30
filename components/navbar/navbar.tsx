import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/navbar";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@nextui-org/shared-icons";

import Logo from "@/public/logo.svg";
import NavItems from "@/components/navbar/nav-items";
import NavAuthButtons from "@/components/navbar/nav-auth-buttons";

const Navbar = () => {
  return (
    <NextUINavbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand>
          <Image alt="BrainChain logo" className="w-[15%] h-[15%]" src={Logo} />
          <p className="hidden sm:block font-bold text-inherit">BrainChain</p>
        </NavbarBrand>
        <NavItems />
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[12rem] h-10",
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
        <NavAuthButtons />
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
