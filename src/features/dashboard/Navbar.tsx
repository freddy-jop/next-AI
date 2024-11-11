import { SidebarProps } from "@/types/services";
import MobileSidebar from "./MobileSidebar";
import { MobileUserButton } from "./MobileUserButton";

const Navbar = async ({ user }: SidebarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar user={user} />
      <MobileUserButton user={user} />
    </div>
  );
};

export default Navbar;
