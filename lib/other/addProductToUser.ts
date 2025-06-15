import { products } from "@/data/products";
import { db } from "@/firebase-admin";

export const addProductToUser = async (productId: number, userId: string) => {
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
    const userDocRef = userDoc.ref;

    const profileData = userDoc.data();

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

    await userDocRef.update({
      products: updateData.products,
      premium: updateData.premium,
      beta: updateData.beta,
    });
    console.log(`Product ${product.name} added to user ${userId}.`);
  } catch (error) {
    console.error("Error searching for profile document:", error);
    return;
  }
};
