import { products } from "@/data/products";
import { db } from "@/firebase-admin";

export const addProductToUser = async (productId: number, userId: string) => {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    console.error(`Product with ID ${productId} not found.`);
    return;
  }

  try {
    const userDoc = db.collection("users").doc(userId);

    const promoCodeDoc = await userDoc.get();

    if (promoCodeDoc.exists) {
      const profileData = promoCodeDoc.data();

      if (profileData) {
        const productsData: number[] = profileData.products || [];
        productsData.push(productId);

        let updateData = {
          products: productsData,
          premium: profileData.premium || false,
          beta: profileData.beta || false,
        };

        if (product.name === "Premium") {
          updateData = {
            ...updateData,
            premium: true,
          };
        } else if (product.name === "Beta Access") {
          updateData = {
            ...updateData,
            beta: true,
          };
        }

        await userDoc.update({ updateData });
        console.log(`Product ${product.name} added to user ${userId}.`);
      }
    } else {
      console.warn(`User document with ID ${userId} does not exist.`);
    }
  } catch (error) {
    console.error("Error searching for promo code document:", error);
    return;
  }
};
