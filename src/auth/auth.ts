import { prisma } from "@/auth/prisma";
import { stripe } from "@/stripe";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers,
  auth: baseAuth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/images/logo_opti_pix_AI.png",
  },
  providers: [GithubProvider, GoogleProvider],
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createUser: async (message: any) => {
      const userId = message.user.id;
      const userEmail = message.user.email;
      if (!userEmail || !userId) {
        return;
      }

      // Create customer in Stripe dashboard
      const stripeCustomer = await stripe.customers.create({
        name: message.user.name ?? "",
        email: userEmail,
      });

      // Update customerId in User model
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: stripeCustomer.id },
      });

      // Create Counter user Limit for Free Plan
      await prisma.userApiLimit.create({
        data: { user: { connect: { id: userId } } },
      });
    },
  },
});
