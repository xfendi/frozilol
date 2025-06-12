import { generateGiftCode } from "../gift/generateGiftCode";
import { products } from "@/data/products";
import Product from "@/types/Product";
import { sendEmail } from "@/lib/email/emailService";

const sendThanksEmail = async (email: string, giftEmail?: string) => {
  const mailOptions = {
    from: `"frozi.lol" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: `Thank You for Your Purchase! 🎉`,
    text: `Hi there,\n\nThank you for your purchase! Your order has been successfully processed.\nCode you purchased was send to: ${giftEmail}\n\nIf you have any questions or need assistance, feel free to reach out.\n\nThanks again for being a part of frozi.lol! 💙\n\nBest regards,\nThe frozi.lol Team`,
  };

  try {
    await sendEmail(mailOptions);
  } catch (e) {
    console.error(e);
  }
};

const sendCodeEmail = async (email: string, code: string, product: Product) => {
  const mailOptions = {
    from: `"frozi.lol" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: `Your Gift Code for ${product.name} 🎁`,
    text: `Hi there,\n\nYour gift code for ${product.name} is: ${code}\n\nYou can redeem it by clicking the link below:\nhttps://frozi.lol/shop/redeem?code=${code}\n\nIf you have any questions or need assistance, feel free to reach out.\n\nThanks again for being a part of frozi.lol! 💙\n\nBest regards,\nThe frozi.lol Team`,
  };

  try {
    await sendEmail(mailOptions);
  } catch (e) {
    console.error(e);
  }
};

export async function handleStripeWebhook(event: any) {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const giftEmail = session.metadata.giftEmail;
    const purchaseEmail = session.customer_details.email;

    const userId = session.metadata.userId;
    const isGift = session.metadata.isGift === "true";
    const productId = session.metadata.productId;

    const product = products.find((p) => p.id === Number(productId));

    if (!product) {
      console.error(`Product with id ${productId} not found.`);
      return;
    }

    sendThanksEmail(purchaseEmail, giftEmail);

    if (isGift) {
      const code = await generateGiftCode(productId);
      sendCodeEmail(giftEmail, code.toString(), product);
    } else {
      console.log(`Add product to user database with id: ${userId}`);
    }
  }
}
