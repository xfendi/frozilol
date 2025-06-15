import { generateGiftCode } from "../gift/generateGiftCode";
import { products } from "@/data/products";
import Product from "@/types/Product";
import { sendEmail } from "@/lib/email/emailService";
import { db } from "@/firebase-admin";
import { addProductToUser } from "../other/addProductToUser";

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

    const promoCode = session.metadata.promoCode;

    const userId = session.metadata.userId;
    const isGift = session.metadata.isGift === "true";
    const productId = session.metadata.productId;

    const product = products.find((p) => p.id === Number(productId));

    if (!product) {
      console.error(`Product with id ${productId} not found.`);
      return;
    }

    sendThanksEmail(purchaseEmail, giftEmail);

    if (promoCode) {
      try {
        const promoCodeDoc = await db
          .collection("partners")
          .doc(promoCode)
          .get();

        if (promoCodeDoc.exists) {
          const promoData = promoCodeDoc.data();

          if (promoData) {
            const transactions = promoData.transactions || [];
            transactions.push(session.id);
            await db
              .collection("partners")
              .doc(promoCode)
              .update({ transactions });
            console.log(
              `Promo code ${promoCode} used for session ${session.id}.`
            );
          }
        } else {
          console.warn(`Promo code ${promoCode} does not exist.`);
        }
      } catch (error) {
        console.error("Error searching for promo code document:", error);
        return;
      }
    }

    try {
      await db
        .collection("transactions")
        .doc(session.id)
        .set({
          createdAt: new Date(),
          stripeSessionId: session.id,
          userId: userId || null,
          productId,
          amountTotal: session.amount_total / 100,
          isGift,
          promoCode: promoCode || null,
          purchaseEmail,
          giftEmail: giftEmail || null,
          status: session.payment_status,
        });

      console.log("✅ Transaction saved to Firebase.");
    } catch (err) {
      console.error("❌ Error saving transaction to Firebase:", err);
    }

    if (isGift) {
      const code = await generateGiftCode(productId);
      sendCodeEmail(giftEmail, code.toString(), product);
    } else {
      await addProductToUser(productId, userId);
    }
  }
}
