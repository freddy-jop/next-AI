"use client";

import { BackButton } from "@/features/buttonEditor/BackButton";
import { DownloadButtonOptimizer } from "@/features/buttonEditor/DownloadButtonOptimizer";
import { NewButton } from "@/features/buttonEditor/NewButton";
import { OpimizerEditor } from "@/features/editor/OptimizerEditor";
import { LoaderEffect } from "@/features/loader/LoaderEffect";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const ReplicateComponent = ({ processId }: { processId: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["replicateData", processId],
    enabled: !!processId,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const result = await axios.get("/api/replicateoptimized", {
          params: {
            processId: processId,
          },
        });
        toast.success(`YOUR PICTURE IS AVAILABLE !!!`);
        return result.data; // Retourne les données de la requête
      } catch (err) {
        const error = err as Error;
        toast.error(`Error uploading file: ${error.message}`);
        throw err; // Propagation de l'erreur pour que React Query la prenne en compte
      }
    },
  });

  if (isPending) {
    return <LoaderEffect />;
  }

  return (
    <div>
      {/* <div className="flex flex-col items-center justify-center"> */}
      <div className="mx-5 flex items-start space-x-4 rounded-lg bg-gray-100 p-4 sm:mx-5 md:mx-0 lg:mx-0 xl:mx-0 2xl:mx-0">
        <BackButton />
        <NewButton />
        <DownloadButtonOptimizer replicateData={data} />
      </div>
      <OpimizerEditor replicateData={data} />
    </div>
  );
};
