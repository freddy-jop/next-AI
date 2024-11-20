import { baseAuth } from "@/auth/auth";
import { PremiumConfirmation } from "@/features/premium/PremiumConfirmation";
import { Plan, User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function RoutePage() {
  const session = await baseAuth();
  if (!session || !session?.user) {
    redirect("/login");
  }
  const user = session.user as User;
  if (user.plan === Plan.FREE) {
    redirect("/pricing");
  }
  return <PremiumConfirmation />;
}
