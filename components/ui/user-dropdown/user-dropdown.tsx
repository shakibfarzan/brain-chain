"use client";
import React, { useEffect, useRef } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User as NextUIUser } from "@nextui-org/user";
import clsx from "clsx";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

import { useAuth } from "@/hooks";
import routes from "@/config/routes";

const UserDropdown: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { session, signOut } = useAuth();
  const avatarProps = {
    isBordered: true,
    src: session?.user?.image ?? undefined,
  };
  // const isMediumScreen = useMediaQuery(`(min-width: 768px)`, {
  //   defaultValue: true,
  // });

  useEffect(() => {
    if (isOpen)
      ref.current?.children[0]?.children[0].classList.add(
        "!opacity-100",
        "!scale-100",
      );
  }, [isOpen]);

  return (
    <Dropdown
      ref={ref}
      isOpen={isOpen}
      placement="bottom-end"
      onOpenChange={(v) => setIsOpen(v)}
    >
      <DropdownTrigger>
        <div>
          <NextUIUser
            as="button"
            avatarProps={avatarProps}
            className={clsx("transition-transform md:flex hidden")}
            description={session?.user?.email}
            name={session?.user?.name}
          />
          <Avatar
            {...avatarProps}
            as="button"
            className={clsx(
              "transition-transform w-9 h-9 md:hidden sm:h-10 sm:w-10",
            )}
          />
        </div>
      </DropdownTrigger>
      {/* @ts-ignore */}
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{session?.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="my_profile" as={Link} href={routes.MY_PROFILE}>
          My Profile
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={async () => await signOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
