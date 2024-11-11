"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GripHorizontal, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "../auth/auth.action";
import { SidebarProps } from "@/types/services";

export const MobileUserButton = ({ user }: SidebarProps) => {
  return (
    <div className="absolute right-6 top-4 text-right">
      <DropdownMenu>
        {/* <DropdownMenuTrigger asChild>hello</DropdownMenuTrigger> */}
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src={user.image ? user.image : `https://github.com/shadcn.png`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-6 rounded-md border-2 border-gray-400 bg-gray-900 pt-2 sm:w-80 md:w-64 lg:w-64 xl:w-64">
          <DropdownMenuItem className="w-full p-0">
            <div className="w-full p-2 hover:bg-gray-700">
              <Link href={"/settings"}>
                <div className="flex flex-1 items-center font-semibold">
                  <Settings className="mr-3 text-gray-400" />
                  <span className="font-semibold text-white">Settings</span>
                </div>
              </Link>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full p-0">
            <div className="w-full p-2 hover:bg-gray-700">
              <div
                className="group flex w-full flex-1 items-center font-semibold"
                onClick={() => {
                  signOutAction();
                }}
              >
                <LogOut className="mr-3 text-gray-400" />
                <span className="font-semibold text-white">Logout</span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex w-full flex-col items-center justify-center bg-gray-800 p-0 outline-none">
            <GripHorizontal className="text-slate-200" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
