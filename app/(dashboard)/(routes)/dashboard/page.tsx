import { baseAuth } from "@/auth/auth";
import { ListTools } from "@/features/dashboard/ListTools";
import { redirect } from "next/navigation";

export default async function RoutePage() {
  const session = await baseAuth();

  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <ListTools />
    </>
  );
}
