"use client";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export const SettingsButton = () => {
  return (
    <Link href={"/settings"}>
      <Button
        variant="secondary"
        size="xl"
        className="group flex w-full cursor-pointer justify-start rounded-none bg-gray-900 p-3 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        <div className="flex flex-1 items-center font-semibold">
          <Settings className="mr-3 text-gray-400" />
          Settings
        </div>
      </Button>
    </Link>
  );
};
