import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { MAX_FREE_COUNTS } from "@/constants";
import { User } from "@prisma/client";

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

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prisma.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
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

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
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
