import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const generateCode = (length = 10): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
};

export const generateGiftCode = async (productId: number) => {
  const code = generateCode();

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
