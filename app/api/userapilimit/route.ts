import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await baseAuth();
    const { searchParams } = new URL(request.url);
    const limitUserId = searchParams.get("limitUserId");

    if (!session || !session?.user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!limitUserId) {
      return new NextResponse("limitUserId manquant", {
        status: 400,
      });
    }

    const user = session.user as User;

    const uerApiLimit = await prisma.userApiLimit.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!uerApiLimit) {
      return new NextResponse("User Api Limit not found", { status: 404 });
    }

    return NextResponse.json(uerApiLimit);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
