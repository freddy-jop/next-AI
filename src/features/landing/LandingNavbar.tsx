"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <nav className="flex items-center justify-between bg-transparent p-8">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative mr-4">
          <Image
            src="/images/logo_opti_pix.svg"
            alt="optima pix"
            width={290}
            height={80}
            layout="responsive"
          />
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/login" className="gap-2">
          <Button
            size="xl"
            variant="premium"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 text-white"
          >
            Launch App
          </Button>
        </Link>
      </div>
    </nav>
  );
};
