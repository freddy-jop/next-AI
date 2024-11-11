import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { Services, User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await baseAuth();
    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get("serviceType");

    if (!session || !session?.user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!serviceType) {
      return new NextResponse("processId manquant", {
        status: 400,
      });
    }

    const user = session.user as User;

    const pictureServiceType = await prisma.replicate.findMany({
      where: {
        serviceName: Services[serviceType as keyof typeof Services],
        userId: user.id,
        replicateOptimized: {
          not: null,
        },
      },
    });

    if (!pictureServiceType) {
      return new NextResponse("Process not found", { status: 404 });
    }

    return NextResponse.json(pictureServiceType);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
