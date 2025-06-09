import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/createCheckoutSession";

export async function POST(req: NextRequest) {
  const { userId, giftEmail, isGift, product } = await req.json();

  const session = await createCheckoutSession({
    userId,
    giftEmail,
    isGift,
    product,
  });

  return NextResponse.json({ url: session.url });
}
