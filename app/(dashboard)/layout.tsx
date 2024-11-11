import { baseAuth } from "@/auth/auth";
import Navbar from "@/features/dashboard/Navbar";
import { Sidebar } from "@/features/dashboard/Sidebar";
import { RouteLayoutType } from "@/types/next";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function RouteLayout({ children }: RouteLayoutType) {
  const session = await baseAuth();
  if (!session || !session?.user) {
    redirect("/login");
  }
  const user = session.user as User;
  return (
    <div className="relative h-full">
      {/* <div className="fixed flex h-full w-72 flex-col"> */}
      <div className="hidden h-full md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar user={user} />
      </div>
      {/*  */}
      <main className="md:pl-72">
        <div className="md:hidden lg:hidden xl:hidden  2xl:hidden">
          <Navbar user={user} />
        </div>
        {children}
      </main>
    </div>
  );
}
