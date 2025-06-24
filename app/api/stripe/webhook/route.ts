import { stripe } from "@/lib/stripe/config";
import { handleStripeWebhook } from "@/lib/stripe/handleWebhook";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🔥 Webhook hit!");

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new NextResponse("Missing stripe-signature", { status: 400 });
  }

  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("⚠️ Stripe webhook error:", err);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  console.log("✅ Stripe event:", event.type);
  await handleStripeWebhook(event);
  return new NextResponse("ok");
}
