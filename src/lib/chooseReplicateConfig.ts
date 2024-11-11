import { Services } from "@prisma/client";

export const chooseReplicateConfig = async (
  serviceName: string,
  url: string
) => {
  // const getBokehParameters = (distance: number) => {
  //   const a = 10; // Scale factor for K
  //   const b = 10; // Base level for K
  //   const c = 0.3; // Scale factor for focus inverse relationship
  //   const f_0 = 0.6; // Offset for focus

  //   // Calculate K and focus based on distance
  //   const icK = a * distance + b;
  //   const fos = c / distance + f_0;

  //   const config = {
  //     K: icK,
  //     focus: fos,
  //   };

  //   return config;
  // };

  const process = {
    input: {} as Record<string, unknown>, // assure que input est de type objet
  };
  if (serviceName === Services.CARTOONIFY) {
    process.input = {
      seed: 2862431,
      image: url,
    };
  }
  if (serviceName === Services.BACKGROUND_ERASER) {
    process.input = {
      image: url,
    };
  }
  if (serviceName === Services.COLORIZATION) {
    process.input = {
      model_name: "Artistic",
      input_image: url,
      render_factor: 35,
    };
  }
  if (serviceName === Services.VINTAGE_RESTORATION) {
    process.input = {
      img: url,
      scale: 2,
      version: "v1.4",
    };
  }
  if (serviceName === Services.ULTRA_RESOLUTION) {
    // process.input = {
    //   task: "real_sr",
    //   image: url,
    // };
    process.input = {
      image: url,
      scale: 2,
      face_enhance: false,
    };
  }
  if (serviceName === Services.DEBLUR) {
    process.input = {
      image: url,
    };
    // process.input = {
    //   jpeg: 40,
    //   image: encodeURI(url),
    //   noise: 15,
    //   task_type: "Real-World Image Super-Resolution-Large",
    // };
  }
  if (serviceName === Services.HDR_ENHANCEMENT) {
    process.input = {
      image: url,
    };
  }
  // if (serviceName === Services.BOKEH_EFFECT) {
  //   process.input = {
  //     ...getBokehParameters(2.5),
  //     image: url,
  //     x_coord_focus: 0,
  //     y_coord_focus: 0,
  //   };
  // }
  return process;
};
