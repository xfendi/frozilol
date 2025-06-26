import PremiumPlate from "@/components/global/premiumPlate";
import { linkStyles, themes } from "@/data/customize";
import { defaultPhotoURL } from "@/data/default";
import Image from "next/image";
import React from "react";

const ThemeSection = ({
  editData,
  updateEditData,
  profile,
}: {
  editData: any;
  updateEditData: any;
  profile: any;
}) => {
  return (
    <div className="dashboard__section-main flex 2xl:flex-row flex-col gap-4">
      <div className="flex flex-col gap-4 text-start flex-1">
        <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
          Main Profile Style <PremiumPlate />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 lg:h-[200px] h-[400px]">
          {themes.map((t) => (
            <button
              key={t}
              className={`select-card ${editData?.theme === t ? "active" : ""}`}
              onClick={() => updateEditData("theme", t)}
              title={t}
            >
              {t === "card" ? (
                <div className="link-card !w-full !h-full flex flex-col justify-start items-start test-start">
                  <div className="flex items-center justify-start gap-4 !w-full">
                    <Image
                      src={
                        profile.photoURL ||
                        profile.discordClear.avatarURL ||
                        defaultPhotoURL
                      }
                      className="rounded-full"
                      alt="link Icon"
                      width={48}
                      height={48}
                    />
                    <div className="feature-title max-w-sm text-xl font-semibold">
                      {profile.displayName || profile.username}
                    </div>
                  </div>
                  <div className="divider"></div>
                  <p className="profile-card__id text-start !w-full">
                    {profile.description ||
                      "Description will be displayed here. You can set it below in the customize page."}
                  </p>
                </div>
              ) : (
                <div className="!w-full !h-full flex flex-col justify-start items-center gap-2">
                  <Image
                    src={
                      profile.photoURL ||
                      profile.discordClear.avatarURL ||
                      defaultPhotoURL
                    }
                    className="rounded-full"
                    alt="link Icon"
                    width={64}
                    height={64}
                  />
                  <div className="feature-title max-w-sm text-3xl font-semibold">
                    {profile.displayName || profile.username}
                  </div>
                  <p className="profile-card__id text-center !w-full">
                    {profile.description ||
                      "Description will be displayed here. You can set it below in the customize page."}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 text-start flex-1">
        <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
          Links Style <PremiumPlate />
        </div>
        <div className="flex lg:flex-row flex-col gap-4 lg:h-[200px] h-[400px]">
          {linkStyles.map((ls) => (
            <button
              key={ls}
              className={`select-card ${
                editData?.linkStyle === ls ? "active" : ""
              }`}
              onClick={() => updateEditData("linkStyle", ls)}
              title={ls}
            >
              {ls === "list" ? (
                <div className="flex flex-col gap-2 !w-full">
                  <div className="link-card">
                    <Image
                      src="/socials/discord.png"
                      alt="link Icon"
                      width={32}
                      height={32}
                    />
                    <div className="flex flex-col text-start">
                      <div className="feature-title max-w-sm text-md font-semibold">
                        Link Title :)
                      </div>
                      <p className="profile-card__id text-start">
                        Link description will be displayed here.
                      </p>
                    </div>
                  </div>
                  <div className="link-card">
                    <Image
                      src="/socials/discord.png"
                      alt="link Icon"
                      width={32}
                      height={32}
                    />
                    <div className="flex flex-col text-start">
                      <div className="feature-title max-w-sm text-md font-semibold">
                        Link Title :)
                      </div>
                      <p className="profile-card__id text-start">
                        Link description will be displayed here.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-8">
                  <Image
                    src="/socials/discord.png"
                    alt="link Icon"
                    width={48}
                    height={48}
                  />
                  <Image
                    src="/socials/discord.png"
                    alt="link Icon"
                    width={48}
                    height={48}
                  />
                  <Image
                    src="/socials/discord.png"
                    alt="link Icon"
                    width={48}
                    height={48}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;
