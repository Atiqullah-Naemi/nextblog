"use client";

import { LayoutDashboard, LogOut, Search } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { getNameInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import GlobalSearchModal from "./global-search-modal";

export function NavMenu({
  userName,
  userImage,
}: {
  userName?: string;
  userImage?: string;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu viewport={isMobile} className="mx-auto max-w-full my-5">
      <div className="flex justify-between w-full container">
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem className="hidden md:block">
            <div
              className="mr-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Search />
            </div>

            <GlobalSearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>
              <Avatar className="w-8 h-8 rounded-full">
                <AvatarImage src={userImage} className="rounded-full" />
                <AvatarFallback>{getNameInitials(userName!)}</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard"
                      className="flex-row items-center gap-2"
                    >
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <div
                      className="flex-row items-center gap-2 cursor-pointer"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOut />
                      Signout
                    </div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
