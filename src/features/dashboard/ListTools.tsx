"use client";

import { Card } from "@/components/ui/card";
import { toolsServices } from "@/lib/toolsList";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// const transition =
//   "transform transition-transform duration-150 hover:scale-105 active:scale-95";

export const ListTools = () => {
  const router = useRouter();
  return (
    <div className="py-14">
      <div className="space-y-4 py-10">
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          Éditez avec Facilité et Simplicité.
        </h2>
        <p className="text-center text-sm font-light text-muted-foreground md:text-lg">
          Optimisez et sublimez vos créations grâce à l&apos;IA
        </p>
      </div>
      {/* sm:grid-cols-1 md:grid-cols-1 md:px-20 lg:grid-cols-2 lg:px-32
      xl:grid-cols-3 */}
      <div className="grid grid-cols-1 gap-6 px-4 sm:px-4 md:px-20 lg:px-32 xl:px-40">
        {toolsServices.map((tool) => (
          <motion.div
            key={tool.id}
            onClick={() => router.push(tool.href)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            //whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.2,
              delay: toolsServices.indexOf(tool) * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`cursor-pointer`}
          >
            <Card
              className="flex items-center justify-between rounded-lg border-black/5 
                        bg-gradient-to-r from-gray-50 to-gray-200 p-4 
                        transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-x-4">
                <div
                  className={cn("p-2 w-fit rounded-md", tool.bgColorService)}
                >
                  <tool.icon className={cn("w-8 h-8", tool.colorService)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <ArrowRight className="size-5" />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
