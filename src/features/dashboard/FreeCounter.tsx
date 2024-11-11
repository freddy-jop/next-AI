"use client";

import { MAX_FREE_COUNTS } from "@/constants";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type FreeCounterProps = {
  apiLimitCount: number;
  isPro: boolean;
};

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    setProgress((apiLimitCount / MAX_FREE_COUNTS) * 100);
  }, [apiLimitCount]);

  if (!mounted || isPro) {
    return null;
  }

  return (
    <div className="relative flex w-full max-w-md items-center overflow-hidden rounded-full bg-gray-800 px-3 py-1 shadow-md">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      />

      <div className="relative z-10 flex items-center space-x-1 text-sm font-semibold text-purple-300">
        <Zap className="size-4 text-purple-300" />
        <span>
          {apiLimitCount} / {MAX_FREE_COUNTS}
        </span>{" "}
      </div>

      <div className="grow" />

      <motion.button
        className="relative z-10 flex items-center space-x-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-1 text-sm font-semibold text-white shadow-lg shadow-indigo-500/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => redirect("/payments")}
      >
        <span>Upgrade</span>
        <Zap className="size-4 fill-yellow-300 text-yellow-300 hover:animate-pulse" />{" "}
      </motion.button>
    </div>
  );
};
