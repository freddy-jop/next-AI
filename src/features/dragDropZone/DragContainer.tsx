"use client";

import { toolsServices } from "@/lib/toolsList";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

type DropZoneType = {
  isDragActive: boolean;
  serviceName: string;
};

export const DragContainer = ({ isDragActive, serviceName }: DropZoneType) => {
  const [isHovered, setIsHovered] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isServicePathName = (service: any) =>
    service.href === "/" + serviceName;
  const serviceIndex = toolsServices.findIndex(isServicePathName);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Positions de départ pour empiler les cartes
  const initialStack = [
    { x: -20, y: 0, rotate: -5, zIndex: 1 },
    { x: 0, y: 0, rotate: 0, zIndex: 2 },
    { x: 20, y: 0, rotate: 5, zIndex: 3 },
  ];

  // Révélation des cartes quand la souris est dans le conteneur
  const revealedStack = [
    { x: -60, y: -30, rotate: -5, zIndex: 1 },
    { x: 0, y: -50, rotate: 0, zIndex: 2 },
    { x: 60, y: -30, rotate: 5, zIndex: 3 },
  ];

  // Icônes de type de fichier et leurs couleurs
  const fileTypes = [
    { label: ".gif", color: "text-pink-500", background: "bg-pink-100" },
    { label: ".jpg", color: "text-blue-500", background: "bg-blue-100" },
    { label: ".png", color: "text-emerald-500", background: "bg-emerald-100" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 px-4",
        "rounded-lg border-2 border-dashed border-cyan-500 text-cyan-500 font-bold transition-colors duration-300 hover:bg-sky-50 hover:shadow-lg hover:shadow-cyan-500/50"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex h-32 w-40 items-center justify-center sm:h-36 sm:w-48 md:h-40 md:w-56 lg:h-48 lg:w-64 xl:h-56 xl:w-72">
        {fileTypes.map((file, index) => (
          <motion.div
            key={index}
            className={cn(
              file.background,
              "absolute flex items-center justify-center rounded-lg shadow-md",
              "w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-20 lg:w-18 lg:h-22 xl:w-20 xl:h-24"
            )}
            style={{ zIndex: initialStack[index].zIndex }}
            initial={initialStack[index]}
            animate={isHovered ? revealedStack[index] : initialStack[index]}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className={`${file.color} text-sm font-bold sm:text-base md:text-lg`}
            >
              {file.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center text-center text-sm font-semibold text-cyan-500 sm:mt-10 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        {isDragActive
          ? "Drag image waiting..."
          : `${toolsServices[Number(serviceIndex)].dargAndDropTextService}`}
      </div>
    </div>
  );
};
