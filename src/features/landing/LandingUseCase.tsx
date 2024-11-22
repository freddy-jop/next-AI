/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@/components/ui/card";
import { toolsServices } from "@/lib/toolsList";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const LandingUseCase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Avance automatiquement au mot suivant
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % toolsServices.length);
    }, 4000); // Temps de chaque slide en ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 py-20">
      <div className="mb-8 flex w-full justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            //className="text-xl font-medium text-white md:text-2xl lg:text-3xl"
            className="mt-6 text-center text-2xl font-bold text-cyan-500 md:text-4xl"
          >
            <Card
              className="flex items-center justify-between rounded-lg border-black/5 
                        bg-gradient-to-r from-gray-50 to-gray-200 p-4 
                        transition-shadow hover:shadow-lg"
            >
              <div className="flex w-[300px] items-center justify-center gap-x-4 md:w-[500px]">
                <div
                  className={cn(
                    "p-2 w-fit rounded-md shadow-lg shadow-indigo-500/50",
                    toolsServices[activeIndex].bgColorService
                  )}
                >
                  {toolsServices[activeIndex].icon &&
                    React.createElement(toolsServices[activeIndex].icon, {
                      className: `text-5xl text-cyan-500 w-8 h-8 ${toolsServices[activeIndex].colorService}`,
                    })}
                </div>
                <div
                  className={`bg-clip-text font-semibold text-transparent ${toolsServices[activeIndex].bgColorService}`}
                >
                  {toolsServices[activeIndex].label}
                </div>
              </div>
            </Card>
            {/* {toolsServices[activeIndex].label} */}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Image en pleine largeur avec effet de flou en arrière-plan */}
      <div className="relative h-72 w-96 overflow-hidden md:h-96 md:w-full lg:h-[500px]">
        {/* <div className="absolute inset-0 z-0 rounded-lg bg-black/50 backdrop-blur-lg"></div> */}
        {/* <div className="absolute inset-0 z-0 rounded-lg bg-black/50 backdrop-blur-lg"></div> */}
        <AnimatePresence mode="wait">
          {toolsServices.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any, index: number) =>
              index === activeIndex && (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-10"
                  //className="size-full object-contain"
                >
                  <Image
                    src={`/images/${item.attachedLabel}.png`}
                    alt={item.label}
                    layout="fill"
                    objectFit="cover"
                    // className="size-full rounded-lg border-8 border-white/20 object-contain"
                    className="rounded-lg border-4 border-white/20 shadow-xl"
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
