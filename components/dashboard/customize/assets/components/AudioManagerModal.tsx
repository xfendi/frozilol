import Modal from "@/components/global/modal";
import PremiumInfoBanner from "@/components/global/premiumInfoBanner";
import React from "react";
import { AudioFile } from "../audio";
import { FaItunesNote } from "react-icons/fa";
import Image from "next/image";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { handleDeleteFile } from "@/lib/files/handleDeleteFile";

const AudioManagerModal = ({
  isMenuOpen,
  handleMenuClose,
  profile,
  handleOpenAddAudioModal,
}: {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  profile: any;
  handleOpenAddAudioModal: (e: React.FormEvent) => void;
}) => {
  const handleDeleteAudio = async (id: string) => {
    try {
      const ref = doc(db, "profiles", profile.id.toString());
      const profileSnap = await getDoc(ref);
      const profileData = profileSnap.exists() ? profileSnap.data() : {};
      const audios = profileData?.customize?.audios || [];

      const existingIndex = audios.findIndex((entry: any) => entry.id === id);

      const handleDeleteFile = async (id: string) => {
        const data = new FormData();
        data.set("id", id);

        const deleteRequest = await fetch("/api/files/delete", {
          method: "POST",
          body: data,
        });

        if (deleteRequest.status !== 200) {
          toast.error("Failed to delete file");
          return;
        }
      };

      const coverID = audios[existingIndex].cover?.ID;
      const audioID = audios[existingIndex].audio?.ID;

      handleDeleteFile(coverID);
      handleDeleteFile(audioID);

      audios.splice(existingIndex, 1);

      await setDoc(
        ref,
        {
          customize: {
            audios,
          },
        },
        { merge: true }
      );

      toast.success("Audio deleted successfully!");
    } catch (err) {
      console.error("Error deleting audio:", err);
      toast.error("Error deleting audio");
    }
  };

  const handleEnableAudio = async (id: string) => {
    try {
      const ref = doc(db, "profiles", profile.id.toString());
      const profileSnap = await getDoc(ref);
      const profileData = profileSnap.exists() ? profileSnap.data() : {};
      const audios = profileData?.customize?.audios || [];

      const existingIndex = audios.findIndex((entry: any) => entry.id === id);

      if (existingIndex !== -1) {
        const isCurrentlyEnabled = audios[existingIndex].enabled === true;

        audios.forEach((entry: any) => {
          entry.enabled = false;
        });

        if (!isCurrentlyEnabled) {
          audios[existingIndex].enabled = true;
        }
      }

      await setDoc(
        ref,
        {
          customize: {
            audios,
          },
        },
        { merge: true }
      );

      toast.success("Audio toggled successfully!");
    } catch (err) {
      console.error("Error toggling audio:", err);
      toast.error("Error toggling audio");
    }
  };

  return (
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
                  <div className="link-card relative" key={index}>
                    <div className="absolute top-[8px] right-[8px] flex gap-2 items-center">
                      <button
                        type="button"
                        className={`btn-opacity !p-1 !px-2 !rounded-[8px] ${
                          audio.enabled ? "!text-stone-500" : "!text-green-500"
                        } !text-[12px]`}
                        onClick={() => handleEnableAudio(audio.id)}
                        title="Enable audio"
                      >
                        {audio.enabled ? "Enabled" : "Enable"}
                      </button>
                      <button
                        type="button"
                        className="btn-opacity !p-1 !rounded-[8px]"
                        onClick={() => handleDeleteAudio(audio.id)}
                        title="Delete background"
                      >
                        <X size={18} color="red" />
                      </button>
                    </div>
                    <div className="!w-12 !h-12 rounded-[12px] flex justify-center items-center bg-(--color-opacity)">
                      {audio.cover?.URL ? (
                        <Image
                          src={audio.cover.URL}
                          alt="audio cover"
                          className="rounded-[12px] object-cover !w-full !h-full"
                          width={512}
                          height={512}
                        />
                      ) : (
                        <FaItunesNote size={24} />
                      )}
                    </div>
                    <div className="flex flex-col text-start">
                      <div className="feature-title max-w-sm text-md font-semibold">
                        {audio.name}
                      </div>
                      <p className="profile-card__id text-start">
                        ID {audio.id} - {audio.audio?.extension}
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
          <button
            type="button"
            className="btn-outline !w-full flex gap-2 items-center"
            onClick={handleOpenAddAudioModal}
          >
            <FaItunesNote size={18} />
            <p>Add Audio</p>
          </button>
        </div>
      }
    />
  );
};

export default AudioManagerModal;
