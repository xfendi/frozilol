import { auth } from "@/firebase-admin";
import { cookies } from "next/headers";

export const getServerUser = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;

  if (!session) return null;

  try {
    const decoded = await auth.verifySessionCookie(session, true);
    const userRecord = await auth.getUser(decoded.uid);
    return userRecord;
  } catch (err) {
    console.error("Error getting user:", err);
    return null;
  }
};
