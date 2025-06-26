import NamePlateContainer from "@/components/global/namePlateContainer";
import NoProfileFound from "@/components/profile/NoProfileFound";
import { getProfileDataByUsername } from "@/lib/profile/getProfileDataByUsername";
import Image from "next/image";
import React from "react";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;

  const profileData = await getProfileDataByUsername(username);

  if (!profileData) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <NoProfileFound />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
          src={profileData.photoURL}
          alt={profileData.username}
          className="rounded-full !w-[120px] !h-[120px] !object-cover"
          width={120}
          height={120}
        />
        <NamePlateContainer text={`UID ${profileData.id}`}>
          <h1 className="text-4xl font-[600]">
            {profileData.displayName || profileData.username}
          </h1>
        </NamePlateContainer>
      </div>
    </div>
  );
};

export default ProfilePage;
