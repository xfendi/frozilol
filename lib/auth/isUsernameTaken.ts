import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { pages } from "@/data/names";

export async function isUsernameTaken(username: string): Promise<boolean> {
  const usersRef = collection(db, "profiles");
  const q = query(usersRef, where("username", "==", username.toLowerCase()));

  const querySnapshot = await getDocs(q);
  let isTaken = false;

  if (!querySnapshot.empty || pages.includes(username)) {
    isTaken = true;
  }

  return isTaken;
}
