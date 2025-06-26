import { db } from "@/firebase-admin";

export const getProfileDataByUsername = async (username: string) => {
  try {
    const profilesRef = db.collection("profiles");
    const snapshot = await profilesRef
      .where("username", "==", username)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return doc.data();
    } else {
      console.error("No profile found for username:", username);
      return null;
    }
  } catch (error) {
    console.error("Error getting profile by username:", error);
    return null;
  }
};
