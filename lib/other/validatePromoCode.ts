import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const validatePromoCode = async (promoCode: string) => {
  console.log("Validating promo code:", promoCode);

  try {
    const ref = doc(db, "partners", promoCode);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      if (data.active) {
        return { valid: true, data };
      }
    }

    console.log("Promo code not found or inactive:", promoCode);

    return { valid: false };
  } catch (error) {
    console.error("Promo validation error:", error);
    return { valid: false, error };
  }
};
