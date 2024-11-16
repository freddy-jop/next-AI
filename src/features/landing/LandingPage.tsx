"use client";

import { LandingHero } from "@/features/landing/LandingHero";
import { LandingNavbar } from "@/features/landing/LandingNavbar";
import { LandingUseCase } from "@/features/landing/LandingUseCase";

export const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingUseCase />
    </div>
  );
};
