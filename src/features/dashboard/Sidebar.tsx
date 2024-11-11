"use client";

import { toolsMenu } from "@/lib/toolsList";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./FreeCounter";
import { LoggedDropdown } from "./LoggedDropdown";

type SidebarProps = {
  user: User;
};

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const currentService = toolsMenu.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service: Record<string, any>) => pathname.includes(service.href)
  )[0];
  return (
    <div className="flex h-full flex-col space-y-4 border-r-4 border-sky-300 bg-gray-900 py-4 text-white">
      <div className="flex-1 px-3 py-2">
        <Link href={"/dashboard"} className="mb-7 flex items-center pl-3">
          <div className="relative mr-4">
            <Image
              src="/images/logo_opti_pix.svg"
              alt="optima pix"
              width={290}
              height={80}
            />
          </div>
        </Link>
        <div className="mb-4 h-px w-full space-y-1 bg-sky-900"></div>
        <div>
          <LoggedDropdown user={user} />
        </div>
        <div className="space-y-1">
          {toolsMenu.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                currentService && currentService.href === route.href
                  ? "text-white bg-white/10 font-semibold"
                  : "text-zinc-400"
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn("h-5 w-5 mr-3", route.colorMenu)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={0} isPro={false} />
    </div>
  );
};
