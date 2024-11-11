"use client";

import CanvasImageWithWatermark from "@/features/editor/CanvasImageWithWatermark";
import { Replicate } from "@prisma/client";
import { ChevronsLeftRightEllipsis } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OpimizerEditor = ({
  replicateData,
}: {
  replicateData: Replicate;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  if (!replicateData.replicateOptimized) return;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="mx-5 mt-4 flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 via-white to-sky-50 p-6 shadow-lg"
      onMouseUp={handleMouseUp}
    >
      <div className="relative mx-auto h-[calc(100vh-150px)] max-h-[calc(70%-10px)] w-full rounded-lg border border-gray-200 p-10">
        <div
          className="relative m-auto size-full select-none overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
        >
          <CanvasImageWithWatermark
            imageUrl={replicateData.replicateOptimized!}
            width={Number(replicateData.width)}
            height={Number(replicateData.height)}
            watermarkText="Optipix"
            ifWatermark={true}
          />
          <div
            className="absolute inset-x-0 top-0 m-auto size-full select-none overflow-hidden"
            style={{
              clipPath: `inset(0% ${100 - sliderPosition}% 0% 0%)`,
            }}
          >
            <CanvasImageWithWatermark
              imageUrl={replicateData.replicateOriginal}
              width={Number(replicateData.width)}
              height={Number(replicateData.height)}
              watermarkText={null}
              ifWatermark={false}
            />
          </div>
          <div
            className="absolute inset-y-0 w-1 cursor-ew-resize bg-gradient-to-r from-cyan-500 to-sky-400"
            style={{ left: `calc(${sliderPosition}% - 1px)` }}
          >
            {/* <UnfoldHorizontal className="absolute -left-6 top-[calc(50%-5px)] size-[52px] -translate-y-1/2 cursor-col-resize rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 text-white" /> */}
            <ChevronsLeftRightEllipsis className="absolute -left-6 top-[calc(50%-5px)] size-[52px] -translate-y-1/2 cursor-col-resize rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
