import Product from "@/types/Product";
import { stripe } from "./config";

import config from "@/config.json";

export async function createCheckoutSession({
  userId,
  giftEmail,
  promoCode,
  isGift,
  product,
}: {
  userId?: string;
  giftEmail?: string;
  promoCode?: string;
  isGift: boolean;
  product: Product;
}) {
  const priceInCents: number = Math.round(
    parseFloat(product.price.replace(",", ".")) * 100
  );

  let metadata = {
    isGift: isGift ? "true" : "false",
    giftEmail: giftEmail ?? "",
    promoCode: promoCode ?? "",
    productId: product.id,
    userId: userId ?? "",
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
    metadata: metadata,
    success_url: `${config.client_url}/shop/success`,
    cancel_url: `${config.client_url}/shop/cancel`,
  });

  return session;
}
