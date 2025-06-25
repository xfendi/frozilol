import { auth, db } from "@/firebase-admin";
import { getServerProfile } from "@/lib/data/getServerProfile";
import { getServerUser } from "@/lib/data/getServerUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getServerUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const { newEmail } = await req.json();
    if (!newEmail) {
      return NextResponse.json({ error: "Missing newEmail" }, { status: 400 });
    }

    const uid = user.uid;

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
