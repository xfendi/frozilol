import React from "react";

import PremiumPlate from "@/components/global/premiumPlate";
import PremiumWrapper from "@/components/global/premiumWrapper";

import BackgroundInput from "./assets/background";
import ProfilePictureInput from "./assets/profile";
import CursorInput from "./assets/cursor";

const AssetsSection = () => {
  return (
    <div className="dashboard__section-main flex 2xl:flex-row flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        <div className="flex flex-col gap-4 text-start flex-1">
          <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
            Background
          </div>
          <div className="flex lg:flex-row flex-col gap-4 !h-[200px]">
            <BackgroundInput />
          </div>
        </div>
        <div className="flex flex-col gap-4 text-start flex-1">
          <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
            Audio
          </div>
          <div className="flex lg:flex-row flex-col gap-4 !h-[200px]"></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        <div className="flex flex-col gap-4 text-start flex-1">
          <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
            Profile Picture
          </div>
          <div className="flex lg:flex-row flex-col gap-4 !h-[200px]">
            <ProfilePictureInput />
          </div>
        </div>
        <div className="flex flex-col gap-4 text-start flex-1">
          <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
            Custom Cursor <PremiumPlate />
          </div>
          <div className="flex lg:flex-row flex-col gap-4 !h-[200px]">
            <PremiumWrapper>
              <CursorInput />
            </PremiumWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsSection;
