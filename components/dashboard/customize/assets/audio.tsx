"use client";

import React, { useState } from "react";

import Modal from "@/components/global/modal";
import { ProfileData } from "@/context/profileContext";

import { LuAudioLines } from "react-icons/lu";
import { FaItunesNote } from "react-icons/fa";

import "@/styles/profile.css";
import PremiumInfoBanner from "@/components/global/premiumInfoBanner";

export type AudioFile = {
  name: string;
  duration: string;
  URL: string;
  ID: string;
  extension: string;
};

const AudioManager = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { profile } = ProfileData();

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleAddAudio = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add audio

    setIsMenuOpen(false);
  }

  return (
    <>
      <button
        className="select-card !h-[200px] flex flex-col items-center gap-4"
        onClick={handleMenuOpen}
      >
        <LuAudioLines size={48} />
        <p className="profile-card__id text-center">Open Audio Manager Menu.</p>
      </button>
      <Modal
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        title="Audio Manager"
        content={
          <div className="flex flex-col gap-4">
            <p className="profile-card__id text-start">
              To set an audio as active, please select your desired audio by{" "}
              <br />
              clicking on it.
            </p>
            {!profile.premium && (
              <PremiumInfoBanner text="Add up to 4 audios with premium" />
            )}
            <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
              Audios ({profile.customize?.audios?.length ?? 0}/
              {profile.premium ? "4" : "1"})
            </div>
            <div className="flex flex-col gap-4">
              {Array.isArray(profile.customize?.audios) &&
              profile.customize?.audios.length > 0 ? (
                profile.customize?.audios.map(
                  (audio: AudioFile, index: number) => (
                    <div className="link-card" key={index}>
                      <div className="!w-12 !h-12 rounded-[12px] flex justify-center items-center bg-(--color-opacity)">
                        <FaItunesNote size={24} />
                      </div>
                      <div className="flex flex-col text-start">
                        <div className="feature-title max-w-sm text-md font-semibold">
                          {audio.name}
                        </div>
                        <p className="profile-card__id text-start">
                          {audio.duration}
                        </p>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="profile-card__id text-start">
                  There is no audios yet.
                </p>
              )}
            </div>
            <div className="divider"></div>
            <button type="button" className="btn-outline !w-full flex gap-2 items-center" onClick={handleAddAudio}>
              <FaItunesNote size={18} />
              <p>Add Audio</p>
            </button>
          </div>
        }
      />
    </>
  );
};

export default AudioManager;
