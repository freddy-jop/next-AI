import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { MAX_FREE_COUNTS } from "@/constants";
import { Plan, User } from "@prisma/client";

export const increaseApiLimit = async () => {
  const session = await baseAuth();
  if (!session || !session?.user) {
    return;
  }

  const user = session.user as User;

  if (!user.id) {
    return;
  }
  const userId = user.id;

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit) {
    return new Response("User Limit is missing", { status: 400 });
  }

  await prisma.userApiLimit.update({
    where: { userId: userId },
    data: { count: userApiLimit.count + 1 },
  });
};

export const checkApiLimit = async () => {
  const session = await baseAuth();
  if (!session || !session?.user) {
    return false;
  }

  const user = session.user as User;

  if (!user.id) {
    return false;
  }
  const userId = user.id;

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit) {
    return false;
  }

  if (
    (userApiLimit.count < MAX_FREE_COUNTS && user.plan === Plan.FREE) ||
    (userApiLimit.count < MAX_FREE_COUNTS && user.plan === Plan.PREMIUM) ||
    user.plan === Plan.PREMIUM
  ) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const session = await baseAuth();
  if (!session || !session?.user) {
    return 0;
  }

  const user = session.user as User;

  if (!user.id) {
    return 0;
  }
  const userId = user.id;

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
