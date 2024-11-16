"use client";
import { Button } from "@/components/ui/button";
import { toolsServices } from "@/lib/toolsList";
import { cn } from "@/lib/utils";
import { PartyPopper } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const PremiumConfirmation = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 text-center text-gray-800 shadow-2xl">
        {/* Section Header */}
        <PartyPopper className="mx-auto mb-4 size-16 animate-bounce text-yellow-400" />
        <h1 className="mb-4 text-4xl font-extrabold text-indigo-600">
          Félicitations, Vous Êtes Maintenant Premium!
        </h1>
        <p className="mb-6 text-lg font-medium text-gray-700">
          Bienvenue dans l&apos;univers des fonctionnalités avancées! Profitez
          de tous nos outils pour vous aider à atteindre vos objectifs plus
          facilement et rapidement.
        </p>

        {/* Summary of Benefits */}
        <div className="mb-8">
          <span className="text-lg font-semibold uppercase text-gray-600">
            Vos Avantages Premium :
          </span>
          <div className="grid grid-cols-6 gap-4 px-1 py-4">
            {toolsServices.map((feature) => (
              <Link
                key={feature.id}
                href={feature.href}
                className="transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <div
                  className={cn("p-2 w-fit rounded-md", feature.bgColorService)}
                >
                  <feature.icon
                    className={cn("w-8 h-8", feature.colorService)}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action or Exploration Button */}
        <Button
          size="lg"
          variant="premium"
          onClick={() => redirect("/dashboard")}
          className="mt-4 w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 py-3 font-semibold text-white hover:shadow-lg"
        >
          Explorer vos nouvelles fonctionnalités
        </Button>
      </div>
    </section>
  );
};
