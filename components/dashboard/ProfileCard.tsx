import { defaultPhotoURL } from "@/data/default";
import { getServerProfile } from "@/lib/data/getServerProfile";
import { getServerUser } from "@/lib/data/getServerUser";
import Image from "next/image";
import React from "react";

const ProfileCard = async () => {
  const user = await getServerUser();

  if (!user) {
    return null;
  }

  const profile = await getServerProfile(user?.uid);

  if (!profile) {
    return null;
  }

  return (
    <div className="profile-card_container">
      <Image
        src={
          profile.photoURL || profile.discordClear?.avatarURL || defaultPhotoURL
        }
        alt={profile.username}
        className="rounded-lg !w-[42px] !h-[42px] !object-cover"
        width={42}
        height={42}
      />

      <div className="profile-card_text">
        <a className="profile-card__name" href={`/${profile.username}`}>
          {profile.displayName ?? profile.username}
        </a>
        <p className="profile-card__id">UID {profile.id}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
