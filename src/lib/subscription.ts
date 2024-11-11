import { baseAuth } from "@/auth/auth";
import { prisma } from "@/auth/prisma";
import { User } from "@prisma/client";

const DAY_IN_MS = 86_400_000;
export const checkSubscription = async () => {
  const session = await baseAuth();
  if (!session || !session?.user) {
    return false;
  }

  const user = session.user as User;

  const userId = user.id;

  if (!userId) {
    return false;
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd &&
    userSubscription.stripeCurrentPeriodEnd.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid; // the !! mark is to make sure that the isValid always return as boolean
};
