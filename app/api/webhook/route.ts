import { prisma } from "@/auth/prisma";
import { env } from "@/env";
import { stripe } from "@/stripe";
import { Plan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const stripeSignature = req.headers.get("stripe-signature");

  if (!stripeSignature) {
    return new Response("Webhook signature is missing", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "No Stripe signature" }, { status: 400 });
  }

  // C:\Users\Fredy\NEXT\STACKS\stripe\stripe.exe listen --forward-to localhost:3000/api/webhooks/stripe
  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;

    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        plan: Plan.PREMIUM,
      },
    });

    return NextResponse.json(
      { message: `User ${user.id}-${user.name} upgraded to premium` },
      { status: 200 }
    );
  }
  if (event.type === "invoice.payment_succeeded") {
    console.log("Invoice payment succeeded");
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;

    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        plan: Plan.PREMIUM,
      },
    });
  }
  if (event.type === "customer.subscription.deleted") {
    console.log("Subscription deleted");
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        plan: Plan.FREE,
      },
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
};
