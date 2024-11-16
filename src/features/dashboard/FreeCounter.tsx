"use client";

import { MAX_FREE_COUNTS } from "@/constants";
import { useFreeCountStore } from "@/store/count.store";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { LoaderEffectUpgrade } from "../loader/LoaderEffectUpgrade";

type FreeCounterProps = {
  user: User;
};

export const FreeCounter = ({ user }: FreeCounterProps) => {
  const counter = useFreeCountStore(useShallow((state) => state.freeCount));
  const isMounted = useFreeCountStore(useShallow((state) => state.isMounted));
  const updateAvailableCount = useFreeCountStore(
    useShallow((state) => state.updateAvailableCount)
  );
  const { data, isPending } = useQuery({
    queryKey: ["apiLimit", counter],
    enabled: isMounted,
    queryFn: async () => {
      try {
        const result = await axios.get("/api/userapilimit", {
          params: {
            limitUserId: user.id,
          },
        });
        updateAvailableCount(false);
        return result.data;
      } catch (err) {
        const error = err as Error;
        toast.error(`Error On Counter: ${error.message}`);
        throw err; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });

  if (isPending) {
    return <LoaderEffectUpgrade />;
  }

  return (
    <div className="relative flex w-full max-w-md items-center overflow-hidden rounded-full bg-gray-800 px-3 py-1 shadow-md">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{ width: `${(data.count / MAX_FREE_COUNTS) * 100}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${(data.count / MAX_FREE_COUNTS) * 100}%` }}
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
          {data.count} / {MAX_FREE_COUNTS}
        </span>{" "}
      </div>

      <div className="grow" />

      <motion.button
        className={`relative z-10 flex ${
          data.count >= 3 ? "animate-bounce" : ""
        } items-center space-x-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-1 text-sm font-semibold text-white shadow-lg shadow-indigo-500/50`}
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
