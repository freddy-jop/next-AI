import { baseAuth } from "@/auth/auth";
import { LandingPage } from "@/features/landing/LandingPage";
import { redirect } from "next/navigation";

export default async function RoutePage() {
  const session = await baseAuth();
  if (!session) {
    return <LandingPage />;
  }
  if (session) {
    redirect("/dashboard");
  }
}
