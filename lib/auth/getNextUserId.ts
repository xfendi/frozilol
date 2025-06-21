import { doc, runTransaction } from "firebase/firestore";
import { db } from "@/firebase";

export async function getNextUserId(): Promise<number> {
  const counterRef = doc(db, "counters", "profiles");

  const newId = await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef);

    if (!counterSnap.exists()) {
      transaction.set(counterRef, { lastId: 1 });
      return 1;
    }

    const currentId = counterSnap.data().lastId ?? 0;
    const nextId = currentId + 1;

    transaction.update(counterRef, { lastId: nextId });

    return nextId;
  });

  return newId;
}
