import { auth } from "@/firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  const expiresInFunction = (days: number) => {
    return 60 * 60 * 24 * days * 1000;
  };

  const expiresIn = expiresInFunction(5); // 5 days

  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

  const cookieStore = await cookies();
  cookieStore.set("__session", sessionCookie, {
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return NextResponse.json({ status: "success" });
}
