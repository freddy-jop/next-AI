"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDropdownStore } from "@/store/dropdown.store";
import { SidebarProps } from "@/types/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { SettingsButton } from "../auth/SettingsButton";
import { SignOutButton } from "../auth/SignOutButton";

export const LoggedDropdown = ({ user }: SidebarProps) => {
  const toggleDropdown = useDropdownStore(
    useShallow((state) => state.toggleDropdown)
  );
  const down = useDropdownStore(useShallow((state) => state.openDropdown));
  return (
    <div className="mb-4">
      <DropdownMenu onOpenChange={() => toggleDropdown()}>
        {/* <DropdownMenuTrigger asChild>hello</DropdownMenuTrigger> */}
        <DropdownMenuTrigger asChild>
          <Button className="flex w-full items-center rounded-none bg-transparent px-2 py-8 hover:bg-gray-700">
            <div className="mr-3 size-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-sky-400">
              <div className="flex size-full flex-col items-center justify-center">
                <Avatar>
                  <AvatarImage
                    src={
                      user.image ? user.image : `https://github.com/shadcn.png`
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="text-left">
              <span className="block font-semibold text-gray-300">
                {user.name}
              </span>
            </div>

            {down ? (
              <ChevronUp className="ml-auto size-6 text-gray-400" />
            ) : (
              <ChevronDown className="ml-auto size-6 text-gray-400" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 rounded-md border-2 border-gray-400 bg-gray-900 pt-2 sm:w-80 md:w-64 lg:w-64 xl:w-64 2xl:w-64">
          <DropdownMenuItem className="w-full py-1 outline-none hover:bg-gray-700">
            <div className="flex w-full items-center px-2">
              <div className="mr-3 size-8 shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-sky-400">
                {/* Image de l'utilisateur, si disponible */}
                <div className="flex size-full flex-col items-center justify-center">
                  <Avatar>
                    <AvatarImage
                      src={
                        user.image
                          ? user.image
                          : `https://github.com/shadcn.png`
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Texte avec deux lignes */}
              <div className="text-left">
                <span className="block text-sm font-semibold text-gray-300">
                  {user.name}
                </span>
                <span className="block text-sm text-gray-500">{user.plan}</span>
              </div>
              <Check className="ml-auto size-6 text-gray-400" />
            </div>
          </DropdownMenuItem>
          <div className="mt-2 flex w-full flex-col items-center">
            <div className="mb-2 h-[2px] w-48 space-y-1 bg-gray-800"></div>
          </div>
          <DropdownMenuItem className="w-full outline-none hover:bg-gray-700">
            <div className="space-y-1">
              <SettingsButton />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full outline-none hover:bg-gray-700">
            <div className="space-y-1">
              <SignOutButton />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full bg-gray-800 py-2 outline-none">
            <div className="space-y-1">
              <div className="flex flex-1 flex-col items-center">
                <p className="text-sm text-white">{user.email}</p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
