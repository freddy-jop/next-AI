"use client";

import { Button } from "@/components/ui/button";
import { toolsServices } from "@/lib/toolsList";
import axios from "axios";
import { Check, Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const Payments = () => {
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-100 py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap lg:items-center">
          {/* Plan Description */}
          <div className="w-full p-8 lg:w-1/2">
            <div className="lg:max-w-lg">
              <h2 className="mb-8 text-4xl font-extrabold text-gray-900 lg:text-5xl">
                Accès Complet Premium
              </h2>
              <p className="mb-6 text-lg font-medium text-gray-700">
                Investissez dans l&apos;IA et donnez un coup de pouce à votre
                succès pour le prix d&apos;un repas par mois.
              </p>
            </div>
          </div>
          {/* Features & Pricing */}
          <div className="w-full p-8 lg:w-1/2">
            <div className="mx-auto overflow-hidden rounded-3xl bg-white shadow-2xl lg:max-w-md">
              <div className="space-y-6 p-8 text-center">
                <span className="text-sm font-semibold uppercase text-gray-500">
                  Ce que vous obtenez
                </span>
                <ul className="space-y-2 text-left font-medium text-gray-800">
                  {toolsServices.map((tool) => (
                    <li
                      key={tool.label}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-full p-2 ${tool.bgColorService}`}
                        >
                          <tool.icon
                            className={`${tool.colorService} size-5`}
                          />
                        </div>
                        <span className="text-sm font-semibold">
                          {tool.label}
                        </span>
                      </div>
                      <Check className="text-green-500" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-b-3xl bg-gray-100 p-8 text-center">
                <div className="text-xl font-bold text-gray-800">
                  <span className="text-5xl">$19.99</span>
                  <span className="text-lg text-gray-500"> /mois</span>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Pas d&apos;engagement – annulez quand vous voulez.
                </p>
                <Button
                  onClick={onSubscribe}
                  disabled={loading}
                  size="lg"
                  variant="premium"
                  className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-pink-500 py-4 font-semibold text-white shadow-lg shadow-indigo-500/50"
                >
                  Débloquer l&apos;Accès Complet
                  <Zap className="ml-2 size-4 fill-yellow-300 text-yellow-300 hover:animate-pulse" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
