import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { env } from "@/env";
import { ErrorList } from "@/lib/errorList";
import { User } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = "force-dynamic";

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

    if (!findReplicateToProcess) {
      return new NextResponse(ErrorList.REPLICATE_PROCESS_NOT_FOUND, {
        status: 404,
      });
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!userApiLimit) {
      return new NextResponse(ErrorList.API_LIMIT_NOT_EXIST, { status: 403 });
    }

    axios.post(
      `${env.AWS_LAMBDA_END_POINT_OPTIMIZER}?slug=${findReplicateToProcess.slug}&userId=${user.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ADD CREDIT TO USER
    await prisma.userApiLimit.update({
      where: { userId: user.id },
      data: { count: userApiLimit.count + 1 },
    });

    return NextResponse.json(findReplicateToProcess);
  } catch (error) {
    console.log("[REPLICATE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
