import { defaultPhotoURL } from "@/data/default";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

/**
 * Updates a single key in the 'customize' object of a profile document.
 *
 * @param key - The name of the customize field (e.g., 'audio', 'background').
 * @param value - The value to set (e.g., a URL or path to the file).
 * @param profileID - The ID of the profile to update.
 */
export const updateCustomizeField = async (
  key: string,
  value: any,
  profileID?: number
) => {
  if (!profileID) {
    toast.error("No profile ID provided");
    return;
  }

  try {
    const ref = doc(db, "profiles", profileID.toString());
    const currentValue = await getDoc(ref);
    const data = currentValue.data();

    let updateDoc = {
      customize: {
        [key]: value,
      },
      photoURL: data?.photoURL,
    };

    if (key === "pfp") {
      updateDoc = {
        ...updateDoc,
        photoURL: value?.URL || defaultPhotoURL,
      };
    }

    await setDoc(ref, updateDoc, { merge: true });
  } catch (err) {
    console.error(`Error updating ${key}:`, err);
    toast.error(`Error updating ${key}`);
  }
};
