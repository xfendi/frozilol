export const runtime = "nodejs";

import { db } from "@/firebase-admin";
import { getServerProfile } from "@/lib/data/getServerProfile";
import { getServerUser } from "@/lib/data/getServerUser";
import { getDiscordAvatarURL } from "@/lib/discord/getDiscordAvatarURL";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const redirectURL = `${req.nextUrl.origin}/dashboard?tab=settings`;

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      { error: "Missing code parameter" },
      { status: 400 }
    );
  }

  const creds = Buffer.from(
    `${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`
  ).toString("base64");

  if (!creds) {
    return NextResponse.json(
      { error: "Missing discord credentials" },
      { status: 400 }
    );
  }

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error("Token fetch error:", tokenData);
    return NextResponse.json(
      { error: "Discord token request failed", details: tokenData },
      { status: 400 }
    );
  }

  const access_token = tokenData.access_token;

  let discordUser;

  try {
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    discordUser = await userRes.json();
  } catch (err) {
    console.error("User fetch error:", err);
    return NextResponse.json(
      { error: "Discord user request failed", details: err },
      { status: 400 }
    );
  }

  const user = await getServerUser();

  if (!user) {
    return { error: "User not found" };
  }

  const userId = user.uid;
  const profile = await getServerProfile(userId);

  if (!profile) {
    return { error: "Profile not found" };
  }

  const discordCleanUserData = {
    id: discordUser.id,
    username: `${discordUser.username}#${discordUser.discriminator}`,
    avatarURL: getDiscordAvatarURL(discordUser.id, discordUser.avatar),
    globalName: discordUser.global_name,
  };

  await db.collection("profiles").doc(profile.id.toString()).set(
    {
      discord: discordUser,
      discordClean: discordCleanUserData,
      discordID: discordUser.id,
    },
    { merge: true }
  );

  return NextResponse.redirect(redirectURL);
}
