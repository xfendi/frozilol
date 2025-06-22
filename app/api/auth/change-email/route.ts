import { auth, db } from "@/firebase-admin";
import { getServerProfile } from "@/lib/data/getServerProfile";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("__session")?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized - no session cookie" },
        { status: 401 }
      );
    }

    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const { newEmail } = await req.json();
    if (!newEmail) {
      return NextResponse.json({ error: "Missing newEmail" }, { status: 400 });
    }

    const uid = decodedClaims.uid;

    await auth.updateUser(uid, { email: newEmail });

    const profile = await getServerProfile(uid);
    await db.collection("profiles").doc(profile?.id.toString()).update({
      email: newEmail,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying session or updating email:", error);
    return NextResponse.json(
      { error: "Unauthorized or internal error" },
      { status: 401 }
    );
  }
}
