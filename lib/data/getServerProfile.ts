import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getServerProfile = async (uid: string) => {
  try {
    const profilesRef = collection(db, "profiles");
    const q = query(profilesRef, where("uid", "==", uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      ...doc.data(),
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};
