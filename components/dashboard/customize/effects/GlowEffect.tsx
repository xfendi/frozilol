"use client";

import React from "react";
import toast from "react-hot-toast";

import DiamondPlate from "@/components/global/plates/diamondPlate";

export const GlowEffectOptions = ["username", "links", "badges"];
export const PremiumGlowEffectOptions = ["badges"];

const GlowEffect = ({
  editData,
  updateEditData,
  profile,
}: {
  editData: any;
  updateEditData: any;
  profile: any;
}) => {
  const glowArray: string[] = editData?.effects?.glow ?? [];

  const toggleOption = (option: string) => {
    const isActive = glowArray.includes(option);
    const isPremium = PremiumGlowEffectOptions.includes(option);

    if (isPremium && !profile.premium) {
      return toast.error("You need to be a Premium user to use this effect!");
    }

    const isSelected = isActive;
    const updatedGlow = isSelected
      ? glowArray.filter((item) => item !== option)
      : [...glowArray, option];

    updateEditData("effects", {
      ...editData.effects,
      glow: updatedGlow,
    });
  };

  return (
    <div className="input_container">
      <div className="input_title">Glow Effect</div>
      <div className="flex flex-wrap gap-3">
        {GlowEffectOptions.map((option) => {
          const isActive = glowArray.includes(option);
          const isPremium = PremiumGlowEffectOptions.includes(option);

          return (
            <div
              key={option}
              className={`flex-1 text-center relative !p-2 rounded-[12px] border-2 cursor-pointer transition-all
                ${
                  isActive
                    ? "border-(--color-primary) bg-(--color-opacity)"
                    : "border-(--border-secondary)"
                }
              `}
              onClick={() => toggleOption(option)}
            >
              <span className="text-md">{option}</span>
              {isPremium && <DiamondPlate />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlowEffect;
