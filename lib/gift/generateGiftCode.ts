import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const generateUniqueCode = async (length = 10): Promise<string> => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  while (true) {
    let code = "";

    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const docRef = doc(db, "codes", code);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return code;
    }
  }
};

export const generateGiftCode = async (productId: number) => {
  const code = await generateUniqueCode();

  const giftCodeData = {
    code,
    productId: Number(productId),
    used: false,
    createdAt: new Date(),
  };

  try {
    await setDoc(doc(db, "gifts", code), giftCodeData);
    console.log("🎁 Gift code saved:", code);
    return code;
  } catch (error) {
    console.error("❌ Error saving gift code:", error);
    throw error;
  }
};
