import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await baseAuth();
    const { searchParams } = new URL(request.url);
    const processId = searchParams.get("processId");

    if (!session || !session?.user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!processId) {
      return new NextResponse("processId manquant", {
        status: 400,
      });
    }

    const user = session.user as User;

    const optimizedReplicate = await prisma.replicate.findUnique({
      where: {
        slug: processId,
        userId: user.id,
      },
    });

    if (!optimizedReplicate) {
      return new NextResponse("Process not found", { status: 404 });
    }

    return NextResponse.json(optimizedReplicate);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
