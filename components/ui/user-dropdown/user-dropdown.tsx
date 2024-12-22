"use client";
import React, { useRef } from "react";
import { User as NextUIUser } from "@nextui-org/user";
import clsx from "clsx";
import Link from "next/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

import { useAuth, useDelayedValue, useIsCurrentPath } from "@/hooks";
import routes from "@/config/routes";
import useCurrentUser from "@/hooks/use-current-user";

const UserDropdown: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isCurrentPath = useIsCurrentPath();
  const [isOpen, setIsOpen] = React.useState(false);
  const { signOut } = useAuth();
  const { data: user } = useCurrentUser();

  const bgOpacity = useDelayedValue("bg-opacity-40", {
    triggerCondition: isOpen,
    delay: 1000,
  });
  const avatarProps = {
    isBordered: true,
    src: user?.image ?? undefined,
  };

  return (
    <Dropdown
      ref={ref}
      classNames={{
        content: clsx("backdrop-blur-lg", bgOpacity),
      }}
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
            description={user?.email}
            name={user?.name}
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
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          className="h-14 gap-2 cursor-default"
          variant="light"
        >
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="my_profile"
          as={Link}
          className={
            isCurrentPath(routes.MY_DASHBOARD.BASE) ? "text-primary" : ""
          }
          href={routes.MY_DASHBOARD.QUESTIONS}
        >
          My Dashboard
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={async () => await signOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
