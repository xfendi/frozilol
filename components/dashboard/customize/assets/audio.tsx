"use client";

import React, { useState } from "react";
import { LuAudioLines } from "react-icons/lu";

import { ProfileData } from "@/context/profileContext";

import "@/styles/profile.css";
import AudioManagerModal from "./components/AudioManagerModal";
import AddAudioModal from "./components/AddAudioModal";
import toast from "react-hot-toast";

export type AudioFile = {
  id: string;
  name: string;
  enabled: boolean;
  audio?: {
    URL: string;
    ID: string;
    extension: string;
  };
  cover?: {
    URL: string;
    ID: string;
    extension: string;
  };
};

const AudioManager = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAddAudioModalOpen, setIsAddAudioModalOpen] = useState(false);

  const { profile } = ProfileData();

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleOpenAddAudioModal = () => {
    if (!profile.premium && profile.customize?.audios?.length >= 2) {
      toast.error("You can only add up to 2 audios without premium");
      return;
    }

    if (profile.premium && profile.customize?.audios?.length >= 4) {
      toast.error("You can only add up to 4 audios");
      return;
    }

    setIsMenuOpen(false);
    setIsAddAudioModalOpen(true);
  };
  const handleCloseAddAudioModal = () => setIsAddAudioModalOpen(false);

  return (
    <>
      <button
        className="select-card !h-[200px] flex flex-col items-center gap-4"
        onClick={handleMenuOpen}
      >
        <LuAudioLines size={48} />
        <p className="profile-card__id text-center">Open Audio Manager Menu.</p>
      </button>

      <AudioManagerModal
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        profile={profile}
        handleOpenAddAudioModal={handleOpenAddAudioModal}
      />

      <AddAudioModal
        isMenuOpen={isAddAudioModalOpen}
        handleMenuClose={handleCloseAddAudioModal}
        profile={profile}
      />
    </>
  );
};

export default AudioManager;
