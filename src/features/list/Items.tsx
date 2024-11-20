/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@/components/ui/card";
import { formatEnumToPath } from "@/lib/formatEnumToPath";
import { useReplicateStore } from "@/store/replicate.store";
import { Replicate, Services } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { LoaderEffectUpgrade } from "../loader/LoaderEffectUpgrade";

export const Items = ({
  replicateData,
}: {
  replicateData: Array<Replicate>;
}) => {
  return (
    <div className="grid gap-6 py-6 sm:grid-cols-2 sm:px-10 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-3">
      {replicateData.map((item: Replicate, index) => {
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: Number(index) * 0.2,
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
  const router = useRouter();
  const filterReplicateList = useReplicateStore(
    useShallow((state) => state.filterReplicateList)
  );
  const setIfDropZoneActive = useReplicateStore(
    useShallow((state) => state.setIfDropZoneActive)
  );
  useQuery({
    queryKey: ["AiOptimizationProcess", props.slug],
    enabled: props.replicateOptimized === null,
    refetchOnWindowFocus: true,
    refetchInterval: 5000, // 5 seconds
    queryFn: async () => {
      try {
        const result = await axios.get("/api/replicateoptimized", {
          params: {
            processId: props.slug,
          },
        });
        const resultData = result.data;
        if (resultData && resultData.replicateOptimized !== null) {
          const dataPublished = [];
          dataPublished.push(resultData);
          filterReplicateList(dataPublished);
          setIfDropZoneActive(false);

          toast.success(`redirection in progress...`);

          router.push(
            `${formatEnumToPath(resultData.serviceName)}/${resultData.slug}`
          );
        }
        if (resultData && resultData.replicateOptimized === null) {
          setIfDropZoneActive(true);
        }
        return result.data; // Retourne les données de la requête
      } catch (err) {
        const error = err as Error;
        console.log("Item/refetch:::: ");
        toast.error(`Error uploading file: ${error.message}`);
        throw err; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });
  return (
    <Link
      className={props.replicateOptimized === null ? "pointer-events-none" : ""}
      aria-disabled={props.replicateOptimized === null}
      tabIndex={props.replicateOptimized === null ? -1 : undefined}
      href={`${formatEnumToPath(props.serviceName as keyof typeof Services)}/${
        props.slug
      }`}
    >
      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
        <div className="relative">
          <img
            src={
              props.replicateOptimized === null
                ? props.replicateOriginal
                : props.replicateOptimized
            }
            alt={props.slug}
            className="h-64 w-full object-cover"
          />
          <div className="flex justify-between bg-sky-200 p-2" />
        </div>
        {props.replicateOptimized === null ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black opacity-80">
            {/* Icône centrée au survol */}
            <LoaderEffectUpgrade />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-40">
            {/* Icône centrée au survol */}
            <ArrowRight className="size-12 text-white opacity-100" />
          </div>
        )}
      </Card>
    </Link>
  );
};
