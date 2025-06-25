export const runtime = "nodejs";

import { db } from "@/firebase-admin";
import { getServerProfile } from "@/lib/data/getServerProfile";
import { getServerUser } from "@/lib/data/getServerUser";
import { getDiscordAvatarURL } from "@/lib/discord/getDiscordAvatarURL";
import { NextRequest, NextResponse } from "next/server";

const popupResponse = (success: boolean, error?: string) => {
  return new Response(
    `<script>
      window.opener.postMessage({ success: ${success}, error: "${error}" }, "*");
      window.close();
    </script>`,
    { headers: { "Content-Type": "text/html" } }
  );
};

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return popupResponse(false, "Missing code parameter");
  }

  const creds = Buffer.from(
    `${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`
  ).toString("base64");

  if (!creds) {
    return popupResponse(false, "Missing discord credentials");
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
    return popupResponse(false, "Discord token request failed");
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
    return popupResponse(false, "Discord user request failed");
  }

  const user = await getServerUser();

  if (!user) {
    return popupResponse(false, "User not found");
  }

  const userId = user.uid;
  const profile = await getServerProfile(userId);

  if (!profile) {
    return popupResponse(false, "Profile not found");
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

  return popupResponse(true);
}
