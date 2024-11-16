"use client";

import { LoaderEffect } from "@/features/loader/LoaderEffect";
import { ErrorList } from "@/lib/errorList";
import { formatEnumLowerString } from "@/lib/formatEnumLowerString";
import { getImageDimensions } from "@/lib/getImageDimension";
import { useFreeCountStore } from "@/store/count.store";
import { useFileStore } from "@/store/file.store";
import { Services } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AlertTriangle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import { DragContainer } from "./DragContainer";

const maxSizeBytes = 4 * 1024 * 1024;
const maxSizeMb = maxSizeBytes / 1024 / 1024;
const acceptedFiles = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

export const ManageDropZone = ({
  serviceName,
}: {
  serviceName: keyof typeof Services;
}) => {
  const service = formatEnumLowerString(serviceName);
  const router = useRouter();
  const setFile = useFileStore(useShallow((state) => state.setFile));
  const setFileDimension = useFileStore(
    useShallow((state) => state.setFileDimension)
  );
  const setFileType = useFileStore(useShallow((state) => state.setFileType));

  const setFreeCount = useFreeCountStore(
    useShallow((state) => state.setFreeCount)
  );
  const updateAvailableCount = useFreeCountStore(
    useShallow((state) => state.updateAvailableCount)
  );

  const { isPending: isPendingReplicate, mutate: processRelicateUlr } =
    useMutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationFn: async (slug: string) => {
        try {
          const result = await axios.post("/api/replicateprocess", {
            processId: slug,
          });
          updateAvailableCount(true);
          setFreeCount();
          const responseData = result.data;
          toast.success(`File Optimized successfully`);
          router.push(`/${service}/${responseData.slug}`);
          //return result.data; // Retourne les données de la requête
        } catch (err) {
          const error = err as AxiosError;
          //toast.error(`Error uploading file: ${error.message}`);
          throw error; // Propagation de l'erreur pour que React Query la prenne en compte
        }
      },
    });

  const { mutate: updateFile } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      try {
        const result = await axios.post("/api/uploadprocess", data);
        const { slug } = result.data;
        console.log("res.data/Slug ::: ", slug);
        toast.success(`File uploaded successfully`);
        processRelicateUlr(slug); // Appel de la mutation pour relire le fichier
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.data === ErrorList.FREE_TRIAL_HAS_EXPIRED) {
          toast.custom(
            (t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } flex w-full max-w-md items-center rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex items-center p-4">
                  <AlertTriangle className="size-6 text-red-500" />
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Your Free Trial has expired !
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Go back to the payment page to complete your order and
                      enjoy our services!
                    </p>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => {
                      toast.dismiss(t.id);
                      redirect("/payments");
                    }}
                    className="mx-2 w-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/50 hover:text-slate-800"
                  >
                    Go to Payments
                  </button>
                </div>
              </div>
            ),
            {
              duration: 10000,
            }
          );
        }
        throw error;
      }
    },
  });

  const validateFile = <T extends File>(
    file: T
  ): FileError | readonly FileError[] | null => {
    const errors: FileError[] = [];
    const acceptedFormats = acceptedFiles.map((format) => format.trim());

    // Check if the file format is in the accepted formats
    const isAcceptedFormat = acceptedFormats.some((format) => {
      if (format === "image/jpeg") {
        // Exclude .jfif extension for image/jpeg
        return (
          file.type === "image/jpeg" &&
          !file.name.toLowerCase().endsWith(".jfif")
        );
      }
      return file.type === format;
    });

    // Add an error if the format is not accepted
    if (!isAcceptedFormat) {
      errors.push({
        code: "Unsupported-type-jfif",
        message: `Unsupported file type: image/jfif. Allowed types are: ${acceptedFormats.join(
          ", "
        )}.`,
      });
    }

    // Return the errors if any exist, otherwise return null (valid file)
    return errors.length > 0 ? errors : null;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!acceptedFiles) {
        toast.error("File Error: probably too big Or Many Files");
        return;
      }
      if (rejectedFiles.length > 0) {
        for (let i = 0; i < rejectedFiles.length; i++) {
          if (rejectedFiles[i].errors.length > 0) {
            for (let j = 0; j < rejectedFiles[i].errors.length; j++) {
              if (rejectedFiles[i].errors[j]?.code === "file-too-large") {
                toast.error(`File is too large. Max size is ${maxSizeMb}MB`);
                break;
              }
              if (
                rejectedFiles[i].errors[j]?.code === "Unsupported-type-jfif"
              ) {
                toast.error(rejectedFiles[i].errors[j]?.message);
                break;
              }
              if (rejectedFiles[i].errors[j]?.message) {
                toast.error(rejectedFiles[i].errors[j].message);
                break;
              }
            }
          }
        }
      }

      const file = acceptedFiles[0];

      const fileType = file.type.split("/");
      setFileType(fileType[1]);
      const url = URL.createObjectURL(file);
      setFile(url);
      const dimensions = await getImageDimensions(url);
      setFileDimension(dimensions);

      const formData = new FormData();
      formData.append("file", file); // Ajoute le fichier directement
      formData.append("service", service);
      formData.append("width", dimensions.width.toString());
      formData.append("height", dimensions.height.toString());

      updateFile(formData);
    },
    [setFileType, setFile, setFileDimension, service, updateFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
      "image/bmp": [".bmp"],
    },
    maxSize: maxSizeBytes,
    multiple: false,
    validator: validateFile,
  });

  if (isPendingReplicate) {
    return <LoaderEffect />;
  }

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <DragContainer isDragActive={isDragActive} serviceName={service} />
    </div>
  );
};
