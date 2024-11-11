"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDropdownStore } from "@/store/dropdown.store";
import { SidebarProps } from "@/types/services";
import { Plan } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
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
              {user.plan === Plan.PREMIUM ? (
                <Badge className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-1 text-sm font-semibold uppercase text-white shadow-lg shadow-indigo-500/50">
                  {user.plan}
                </Badge>
              ) : (
                <Badge
                  className="rounded-full border-black/5 
                        bg-gradient-to-r from-gray-50 to-gray-200 px-4 py-1 text-sm font-semibold uppercase text-slate-800 shadow-lg shadow-slate-500/50"
                >
                  {`${user.plan} plan`}
                </Badge>
              )}
            </div>

            {down ? (
              <ChevronUp className="ml-auto size-6 text-gray-400" />
            ) : (
              <ChevronDown className="ml-auto size-6 text-gray-400" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 rounded-md border-2 border-gray-400 bg-gray-900 pt-2 sm:w-80 md:w-64 lg:w-64 xl:w-64 2xl:w-64">
          <div className="mt-2 flex w-full flex-col items-center">
            <div className="mb-2 h-[2px] w-48 space-y-1 bg-gray-800"></div>
          </div>
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
