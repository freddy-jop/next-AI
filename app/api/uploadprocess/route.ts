import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { toolsServices } from "@/lib/toolsList";
import { Services } from "@prisma/client";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await baseAuth();
    const { user } = session!;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const width = formData.get("width");
    const height = formData.get("height");
    const service = formData.get("service");

    if (!session || !user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!file || !service) {
      return new NextResponse("file and serviceName is required", {
        status: 400,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isServicePathName = (list: any) => list.href === "/" + service;
    const serviceIndex = toolsServices.findIndex(isServicePathName);
    const serviceName = toolsServices[Number(serviceIndex)].enumValue;

    const urlOriginal = await put(file.name, file, {
      access: "public",
    });

    const replicate = await prisma.replicate.create({
      data: {
        replicateOriginal: urlOriginal.url,
        width: width as string,
        height: height as string,
        serviceName: Services[serviceName],
        fileType: file.type,
        user: { connect: { id: user.id } },
      },
    });
    return NextResponse.json(replicate, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
