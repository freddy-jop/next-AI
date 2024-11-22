"use client";

import { Button } from "@/components/ui/button";
import { Replicate } from "@prisma/client";
import { DownloadCloud } from "lucide-react";
import toast from "react-hot-toast";

export const DownloadButtonOptimizer = ({
  replicateData,
}: {
  replicateData: Replicate;
}) => {
  const handleDownload = async () => {
    if (replicateData.replicateOptimized) {
      try {
        // Récupérer le fichier sous forme de Blob
        const response = await fetch(replicateData.replicateOptimized);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du fichier.");
        }
        const blob = await response.blob();

        // Déterminer le type de fichier pour l'extension
        let fileType = "png";
        if (replicateData.fileType === "image/png") {
          fileType = "png";
        } else if (
          replicateData.fileType === "image/jpeg" ||
          replicateData.fileType === "image/jpg"
        ) {
          fileType = "jpg";
        }

        // Créer un lien de téléchargement temporaire avec l'URL Blob
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;

        link.download = `optipix-${
          replicateData.serviceName
        }-${Date.now()}.${fileType}`;

        document.body.appendChild(link); // Nécessaire pour Firefox
        link.click();
        document.body.removeChild(link);

        // Libérer l'URL Blob de la mémoire
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Erreur lors du téléchargement :", error);
        toast.error("Erreur lors du téléchargement du fichier.");
      }
    }
  };

  return (
    <div className="flex-1 flex-col justify-end">
      <Button
        variant="outline"
        disabled={!replicateData.replicateOptimized}
        className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 font-bold text-white transition-colors duration-200 hover:opacity-80"
        onClick={handleDownload}
      >
        <DownloadCloud className="size-5 sm:mr-2 sm:size-5" />
        <span className="hidden text-center text-sm font-bold text-white sm:inline">
          Download
        </span>
      </Button>
    </div>
  );
};
