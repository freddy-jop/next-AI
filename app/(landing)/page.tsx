import { baseAuth } from "@/auth/auth";
import { LandingHero } from "@/features/landing/LandingHero";
import { LandingNavbar } from "@/features/landing/LandingNavbar";
import { redirect } from "next/navigation";

export default async function RoutePage() {
  const session = await baseAuth();
  if (!session) {
    return (
      <div className="h-full">
        <LandingNavbar />
        <LandingHero />
      </div>
    );
  }
  if (session) {
    redirect("/dashboard");
  }
}
