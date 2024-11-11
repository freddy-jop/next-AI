"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOutAction } from "./auth.action";

export const SignOutButton = () => {
  return (
    <Button
      variant="secondary"
      size="xl"
      className="group flex w-full cursor-pointer justify-start rounded-none bg-gray-900 p-3 text-sm font-medium text-white transition hover:bg-gray-700"
      onClick={() => {
        signOutAction();
      }}
    >
      <div className="flex flex-1 items-center font-semibold">
        <LogOut className="mr-3 text-gray-400" />
        Logout
      </div>
    </Button>
  );
};
