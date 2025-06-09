import { generateGiftCode } from "../gift/generateGiftCode";

export async function handleStripeWebhook(event: any) {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const giftEmail = session.metadata.giftEmail;
    const purchaseEmail = session.customer_details.email;

    const userId = session.metadata.userId;

    const isGift = session.metadata.isGift === "true";
    const productId = session.metadata.productId;

    console.log(`📨 Send thanks for purchase email to: ${purchaseEmail}`);

    if (isGift) {
      const code = generateGiftCode(productId);
      console.log(`🎁 Gift code for product with id ${productId}: ${code}`);
      console.log(`🎁 Gift email: ${giftEmail}`);
    } else {
      console.log(`Add product to user database with id: ${userId}`);
    }
  }
}
