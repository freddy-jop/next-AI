/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@/components/ui/card";
import { formatEnumToPath } from "@/lib/formatEnumToPath";
import { Replicate, Services } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Items = ({ replicateData }: { replicateData: any }) => {
  return (
    <div className="grid gap-6 py-6 sm:grid-cols-2 sm:px-10 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-3">
      {replicateData.map((item: Replicate) => {
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: Number(item.id) * 0.2,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="cursor-pointer"
          >
            <Item key={item.id} {...item} />
          </motion.div>
        );
      })}
    </div>
  );
};

const Item = (props: PropsWithChildren<Replicate>) => {
  return (
    <Link
      href={`${formatEnumToPath(props.serviceName as keyof typeof Services)}/${
        props.slug
      }`}
    >
      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
        <div className="relative">
          <img
            src={props.replicateOptimized!}
            alt={props.slug}
            className="h-64 w-full object-cover"
          />
          <div className="flex justify-between bg-sky-200 p-2" />
        </div>
        {/* Overlay couvrant la carte entière au survol */}
        <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-40">
          {/* Icône centrée au survol */}
          <ArrowRight className="size-12 text-white opacity-100" />
        </div>
      </Card>
    </Link>
  );
};
