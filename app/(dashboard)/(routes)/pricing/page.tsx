import { baseAuth } from "@/auth/auth";
import { Payments } from "@/features/premium/Payments";
import { redirect } from "next/navigation";

export default async function RoutePage() {
  const session = await baseAuth();

  if (!session) {
    redirect("/login");
  }

  return <Payments />;
}
