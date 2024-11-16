import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { env } from "@/env";
import { chooseReplicateConfig } from "@/lib/chooseReplicateConfig";
import { ErrorList } from "@/lib/errorList";
import { formatEnumToTitleCase } from "@/lib/formatEnumToTitleCase";
import { Services, User } from "@prisma/client";
import { put } from "@vercel/blob";
import axios from "axios";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = "force-dynamic";

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

const cartoonify =
  "catacolabs/cartoonify:f109015d60170dfb20460f17da8cb863155823c85ece1115e1e9e4ec7ef51d3b";
const backgrounderaser =
  "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003";
const colorization =
  "arielreplicate/deoldify_image:0da600fab0c45a66211339f1c16b71345d22f26ef5fea3dca1bb90bb5711e950";
const restauration =
  "tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c";
const ultraresolution =
  "nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa";
const deblur =
  "codeslake/ifan-defocus-deblur:ea3b2e163e2ad629fb23e81a1cc9e485c32aa4a53eba4fe08b7dbdd39e6e381e";
const hdrenhancement =
  "mingcv/bread:bf9f60e777852145e9e6c06fac109c6d55fec43bd535b6b13d3608c34711060b";
// const bokeheffect =
//   "zylim0702/bokeh_prediction:a03867e7e035d1ab286fd8fe7c7f8461b0908b59f6daace4e97d8f68c3a1d05a";

const chooseModel = async (serviceName: string) => {
  switch (serviceName) {
    case Services.CARTOONIFY:
      return cartoonify;
    case Services.BACKGROUND_ERASER:
      return backgrounderaser;
    case Services.COLORIZATION:
      return colorization;
    case Services.VINTAGE_RESTORATION:
      return restauration;
    case Services.ULTRA_RESOLUTION:
      return ultraresolution;
    case Services.DEBLUR:
      return deblur;
    case Services.HDR_ENHANCEMENT:
      return hdrenhancement;
    default:
      return cartoonify;
  }
};

export async function POST(req: Request) {
  try {
    const session = await baseAuth();
    const body = await req.json();
    const { processId } = body;

    if (!session || !session?.user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const user = session.user as User;

    const findReplicateToProcess = await prisma.replicate.findUnique({
      where: {
        slug: processId,
        userId: user.id,
      },
    });

    console.log("FIND UNIQUE USER ::: ", findReplicateToProcess);

    if (!findReplicateToProcess) {
      return new NextResponse(ErrorList.REPLICATE_PROCESS_NOT_FOUND, {
        status: 404,
      });
    }

    const process = await chooseReplicateConfig(
      findReplicateToProcess.serviceName,
      findReplicateToProcess.replicateOriginal
    );

    const model = await chooseModel(findReplicateToProcess.serviceName);

    if (findReplicateToProcess.replicateOptimized === null) {
      console.log("RUNNING REPLICATE");
      const output = await replicate.run(model, {
        input: process.input,
      });

      //Télécharger l'image à partir de l'URL output
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imageResponse = await axios.get(output as any, {
        responseType: "arraybuffer",
      });
      const imageBuffer = Buffer.from(imageResponse.data, "binary");

      //Créer un nom de fichier unique
      const fileName = `${formatEnumToTitleCase(
        findReplicateToProcess.serviceName
      )}-image-${nanoid()}.png`;

      //Envoyer l'image sur Vercel Blob
      const urlOptimized = await put(fileName, imageBuffer, {
        access: "public",
      });

      const replicateUpdated = await prisma.replicate.update({
        where: {
          id: findReplicateToProcess.id,
          slug: findReplicateToProcess.slug,
        },
        data: {
          replicateOptimized: urlOptimized.url,
        },
      });

      return NextResponse.json(replicateUpdated);
    }
    return NextResponse.json(findReplicateToProcess);
  } catch (error) {
    console.log("[REPLICATE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
