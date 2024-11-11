import { prisma } from "@/auth/prisma";
import { stripe } from "@/stripe";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// Creating Stripe Customer :::  {
//   user: {
//     id: 'cm3ask8l60000orzrucoved9z',
//     name: 'Fredy JOPHA',
//     email: 'freddy.jopha.dev@gmail.com',
//     emailVerified: null,
//     image: 'https://avatars.githubusercontent.com/u/61659702?v=4',
//     createdAt: 2024-11-09T23:23:12.378Z,
//     updatedAt: 2024-11-09T23:23:12.378Z
//   }
// }
// stripeCustomer :::  {
//   id: 'cus_RBlW2O8Bmjvgtq',
//   object: 'customer',
//   address: null,
//   balance: 0,
//   created: 1731194594,
//   currency: null,
//   default_source: null,
//   delinquent: false,
//   description: null,
//   discount: null,
//   email: 'freddy.jopha.dev@gmail.com',
//   invoice_prefix: 'C6792B07',
//   invoice_settings: {
//     custom_fields: null,
//     default_payment_method: null,
//     footer: null,
//     rendering_options: null
//   },
//   livemode: false,
//   metadata: {},
//   name: 'Fredy JOPHA',
//   phone: null,
//   preferred_locales: [],
//   shipping: null,
//   tax_exempt: 'none',
//   test_clock: null
// }
export const {
  handlers,
  auth: baseAuth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/images/logo_optima_pixel.svg",
  },
  providers: [GithubProvider],
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
