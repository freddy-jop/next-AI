import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Dimensions = {
  width: number;
  height: number;
};

export type FileType = {
  file: string | null;
  fileType: string | null;
  fileDimension: Dimensions;
  fileOptimized: string | null;
  setFile: (blob: string) => void;
  setFileOptimized: (blobOptima: string) => void;
  setFileDimension: (objDimension: Dimensions) => void;
  setFileType: (type: string) => void;
  clearFile: () => void;
};

export const useFileStore = create(
  persist<FileType>(
    (set) => ({
      file: null,
      fileType: null,
      fileOptimized: null,
      fileDimension: { width: 0, height: 0 },
      setFile: (blob: string) =>
        set({
          file: blob,
        }),
      setFileOptimized: (blobOptima: string) =>
        set({
          fileOptimized: blobOptima,
        }),
      setFileDimension: (objDimension: Dimensions) =>
        set({
          fileDimension: objDimension,
        }),
      setFileType: (type: string) =>
        set({
          fileType: type,
        }),
      clearFile: () =>
        set({
          file: null,
          fileType: null,
          fileOptimized: null,
          fileDimension: { width: 0, height: 0 },
        }),
    }),
    { name: "file-store" }
  )
);
