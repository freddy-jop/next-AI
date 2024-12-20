type Dimensions = {
  width: number;
  height: number;
};

export const getImageDimensions = (src: string): Promise<Dimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = src;
  });
};
