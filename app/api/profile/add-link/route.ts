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

    let databaseLink;

    if (type === "socials") {
      databaseLink = {
        name: name,
        type: type,
        linkType: "href",
        link: `https://${linkData?.profileStartLink}${providedLink}`,
      };
    } else if (type === "other") {
      databaseLink = {
        name: name,
        type: type,
        linkType: "href",
        link: `https://${providedLink}`,
      };
    } else {
      databaseLink = {
        name: name,
        type: type,
        linkType: "copy",
        link: providedLink,
      };
    }

    await profileDocRef.update({
      links: admin.firestore.FieldValue.arrayUnion(databaseLink),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error("Add link error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
