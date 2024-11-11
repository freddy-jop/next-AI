"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { motion } from "framer-motion";
import { Heart, ListFilter } from "lucide-react";

export const FavoriteButtonFilter = ({
  serviceName,
}: {
  serviceName: string;
}) => {
  const favorite = useCartStore((s) => s.favorite);
  const filterByFavorite = () => {
    console.log("serviceName :: ", serviceName);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start py-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center space-x-1"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={filterByFavorite}
          className="flex w-24 items-center rounded-full bg-slate-100 shadow-lg transition-all duration-200 ease-in-out hover:bg-pink-100"
        >
          {/* Icône ListFilter avec arrière-plan foncé */}
          <div className="flex h-full items-center justify-center rounded-l-full bg-slate-300 p-2">
            <ListFilter className="text-gray-700" size={16} />
          </div>

          {/* Icône Heart et compteur des favoris */}
          <div className="flex items-start px-3">
            {/* Icône de cœur avec couleur vive et animation de pulsation */}
            <motion.div
              className="relative py-[3px]"
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <Heart fill="#ff4d4d" className="text-pink-500" size={20} />
            </motion.div>

            {/* Compteur de favoris */}
            <span className="ml-2 flex flex-col items-center text-base font-semibold text-gray-800">
              {favorite.length}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};
