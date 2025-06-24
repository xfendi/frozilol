import { LinkType, linkTypes, LinkTypesType } from "@/data/links";
import { auth, db } from "@/firebase-admin";
import { getServerProfile } from "@/lib/data/getServerProfile";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import admin from "firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, providedLink } = body;

    if (!name || !type || !providedLink) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const linksMap: LinkType[] = linkTypes[type as LinkTypesType];
    const linkData = linksMap.find((l) => l.name === name);

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("__session")?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized - no session cookie" },
        { status: 401 }
      );
    }

    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    const profile = await getServerProfile(uid);

    const profileDocRef = await db
      .collection("profiles")
      .doc(profile?.id.toString());

    const profileData = await profileDocRef.get().then((doc) => doc.data());

    const databaseLink = {
      name,
      type,
      linkMode: linkData?.linkMode,
      link: "",
    };

    if (type === "socials") {
      databaseLink.link = `https://${linkData?.profileStartLink}${providedLink}`;
    } else if (type === "other") {
      databaseLink.link = `https://${providedLink}`;
    } else if (type === "email") {
      databaseLink.link = `mailto:${providedLink}`;
    } else {
      databaseLink.link = providedLink;
    }

    try {
      if (
        profileData?.links &&
        Array.isArray(profileData.links) &&
        profileData.links.length > 0
      ) {
        await profileDocRef.update({
          links: admin.firestore.FieldValue.arrayUnion(databaseLink),
        });
      } else {
        await profileDocRef.update({
          links: [databaseLink],
        });
      }
    } catch (err) {
      console.error("Error adding link to profile:", err);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Add link error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
