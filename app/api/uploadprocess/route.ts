import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { MAX_FREE_COUNTS } from "@/constants";
import { ErrorList } from "@/lib/errorList";
import { toolsServices } from "@/lib/toolsList";
import { Plan, Services, User } from "@prisma/client";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await baseAuth();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const width = formData.get("width");
    const height = formData.get("height");
    const service = formData.get("service");

    if (!session) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!file || !service) {
      return new NextResponse("file and serviceName is required", {
        status: 400,
      });
    }

    const user = session.user as User;

    //const freeTrial = await checkApiLimit();
    const userApiLimit = await prisma.userApiLimit.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!userApiLimit) {
      return new NextResponse(ErrorList.API_LIMIT_NOT_EXIST, { status: 403 });
    }

    if (
      !(
        (userApiLimit.count < MAX_FREE_COUNTS && user.plan === Plan.FREE) ||
        (userApiLimit.count < MAX_FREE_COUNTS && user.plan === Plan.PREMIUM) ||
        user.plan === Plan.PREMIUM
      )
    ) {
      return new NextResponse(ErrorList.FREE_TRIAL_HAS_EXPIRED, {
        status: 403,
      });
    }
    // const freeTrial = await checkApiLimit();
    // if (!freeTrial) {
    //   return new NextResponse("Free trial has expired.", { status: 403 });
    // }

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

    // ADD CREDIT TO USER
    await prisma.userApiLimit.update({
      where: { userId: user.id },
      data: { count: userApiLimit.count + 1 },
    });
    console.log("ADD CREDIT TO USER");

    return NextResponse.json(replicate, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
