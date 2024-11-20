"use client";

import { useEffect, useRef } from "react";

type CanvasImageWithWatermarkType = {
  imageUrl: string;
  width: number;
  height: number;
  watermarkText?: string | null;
  ifWatermark: boolean;
};

const CanvasImageWithWatermark = ({
  imageUrl,
  width,
  height,
  watermarkText,
  ifWatermark,
}: CanvasImageWithWatermarkType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    const img: CanvasImageSource = new Image();
    img.src = imageUrl;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);

      if (watermarkText && ifWatermark) {
        const fontSize =
          width >= height ? Math.floor(height / 5) : Math.floor(width / 5); // Taille de texte très grande
        ctx.font = `bold ${fontSize}px Arial, sans-serif`; // Police moderne sans-serif
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Positionnement du texte au centre avec rotation
        ctx.translate(width / 2, height / 2);
        //ctx.rotate(-Math.PI / 4); // Rotation de -45 degrés

        // Dessine le contour du texte
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; // Couleur du contour (noir léger et opaque)
        ctx.lineWidth = 5; // Épaisseur du contour
        ctx.strokeText(watermarkText, 0, 0);

        // Dessine le remplissage du texte
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // Couleur blanche semi-transparente pour le texte
        ctx.fillText(watermarkText, 0, 0);

        // Réinitialisation des transformations
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    };
  }, [imageUrl, width, height, watermarkText, ifWatermark]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ pointerEvents: "none" }}
      className="size-full object-contain"
    />
  );
};

export default CanvasImageWithWatermark;
