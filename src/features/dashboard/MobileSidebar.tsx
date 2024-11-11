"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/features/dashboard/Sidebar";
import { SidebarProps } from "@/types/services";
import { Menu, PanelLeftClose } from "lucide-react";

const MobileSidebar = ({ user }: SidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="h-screen">
          <SheetTitle className="h-screen">
            <Sidebar user={user} />
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="absolute right-2 top-2 md:flex lg:hidden xl:hidden">
          <SheetFooter>
            <SheetClose asChild>
              <PanelLeftClose className="size-9 cursor-pointer fill-gray-200" />
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
