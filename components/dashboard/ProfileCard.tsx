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
      {user.photoURL ? (
        <Image
          src={user?.photoURL}
          alt={profile.username}
          className="rounded-lg"
          width={40}
          height={40}
        />
      ) : (
        <Image
          src="/images/main-cube.png"
          alt="frozi.lol"
          width={20}
          height={20}
        />
      )}

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
