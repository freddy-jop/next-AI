import { baseAuth } from "@/auth/auth";
import { NextResponse } from "next/server";

import { env } from "@/env";
import { getServerUrl } from "@/get-server-url";
import { stripe } from "@/stripe";
import { User } from "@prisma/client";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await baseAuth();

    if (!session || !session?.user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const user = session.user as User;

    if (!user.id || !user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const stripCustomer = user.stripeCustomerId!;

    const stripeSession = await stripe.checkout.sessions.create({
      customer: stripCustomer,
      success_url: `${getServerUrl()}/success`,
      cancel_url: `${getServerUrl()}/success`,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price:
            env.NODE_ENV === "development"
              ? env.STRIPE_PRICE_9
              : env.STRIPE_PRICE_PROD_9,
          quantity: 1,
        },
      ],
    });

    if (!stripeSession.url) {
      return new NextResponse("Stripe checkout session URL is null", {
        status: 401,
      });
    }

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
