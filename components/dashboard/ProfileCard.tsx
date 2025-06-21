import { getServerProfile } from "@/lib/data/getServerProfile";
import { getServerUser } from "@/lib/data/getServerUser";
import Image from "next/image";
import React from "react";
import Cube from "../global/cube";

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
    <a className="profile-card_container" href={`/${profile.username}`}>
      {user.photoURL ? (
        <Image
          src={user?.photoURL}
          alt="Profile Card"
          width={200}
          height={200}
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
        <p className="profile-card__name">
          {profile.displayName ?? profile.username}
        </p>
        <p className="profile-card__id">{profile.id}</p>
      </div>
    </a>
  );
};

export default ProfileCard;
