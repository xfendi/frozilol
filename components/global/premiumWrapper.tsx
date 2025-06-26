"use client";

import { ProfileData } from "@/context/profileContext";
import React from "react";

import "@/styles/profile.css";

const PremiumWrapper = ({ children }: { children: React.ReactNode }) => {
  const profile = ProfileData();
  const isPremium = profile?.premium;

  return (
    <div className="relative">
      <div
        className={
          isPremium
            ? ""
            : "blur-sm pointer-events-none select-none rounded-[12px]"
        }
      >
        {children}
      </div>

      {!isPremium && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[12px] flex-col gap-2 bg-black/50">
          <div className="feature-title text-xl font-semibold flex items-center gap-4 text-center">
            Upgrade to Premium to access this content 💎
          </div>
          <p className="profile-card__id text-center">
            <button className="cursor-pointer !underline">Hide</button> this
            content as non-premium user!
          </p>
        </div>
      )}
    </div>
  );
};

export default PremiumWrapper;
