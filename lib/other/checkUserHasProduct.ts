import { products } from "@/data/products";
import { db } from "@/firebase-admin";

export const checkUserHasProduct = async (
  productId: number,
  userId: string
) => {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    console.error(`Product with ID ${productId} not found.`);
    return;
  }

  try {
    const usersRef = db.collection("profiles");
    const querySnapshot = await usersRef
      .where("uid", "==", userId)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      console.error("No user found with uid:", userId);
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const profileData = userDoc.data();
    
    const productsData = profileData.products;

    if (!productsData || !Array.isArray(productsData)) {
      console.error("User's products data is not an array or is missing.");
      return;
    }

    const hasProduct = productsData.includes(productId);

    if (hasProduct) {
      console.log(`User ${userId} already has product ${product.name}.`);
      return true;
    } else {
      console.log(`User ${userId} does not have product ${product.name}.`);
      return false;
    }
  } catch (error) {
    console.error("Error searching for profile document:", error);
    return;
  }
};
