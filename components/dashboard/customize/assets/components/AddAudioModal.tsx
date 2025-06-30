import Modal from "@/components/global/modal";
import PremiumInfoBanner from "@/components/global/premiumInfoBanner";
import { fileTypesMaxSizeInMB } from "@/data/files";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaItunesNote } from "react-icons/fa";

const AddAudioModal = ({
  isMenuOpen,
  handleMenuClose,
  profile,
}: {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  profile: any;
}) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [audioCoverFile, setAudioCoverFile] = useState<File | null>(null);
  const [audioCoverPreview, setAudioCoverPreview] = useState<string>("");

  const [audioName, setAudioName] = useState<string>("");

  const [isAddAudioModalLoading, setIsAddAudioModalLoading] = useState(false);

  const uploadFile = async (file: File, type: string) => {
    try {
      const data = new FormData();
      data.set("file", file);
      data.set("type", type);

      const uploadRequest = await fetch("/api/files/upload", {
        method: "POST",
        body: data,
      });

      const resData = await uploadRequest.json();

      if (uploadRequest.status !== 200) {
        toast.error(resData?.error || "Upload failed");
        return;
      }

      const { url, id, extension } = resData;
      const fileData = { URL: url, ID: id, extension };

      return { success: true, data: fileData };
    } catch (e) {
      console.error(e);
      toast.error("Failed to upload audio");
      return { success: false };
    }
  };

  const updateAudioEntry = async (
    id: string,
    data: Partial<{ audio: any; cover: any; name: string }>
  ) => {
    try {
      const ref = doc(db, "profiles", profile.id.toString());

      const profileSnap = await getDoc(ref);
      const profileData = profileSnap.exists() ? profileSnap.data() : {};
      const audios = profileData?.customize?.audios || [];

      const existingIndex = audios.findIndex((entry: any) => entry.id === id);

      if (existingIndex !== -1) {
        audios[existingIndex] = {
          ...audios[existingIndex],
          ...data,
        };
      } else {
        audios.push({
          id,
          ...data,
        });
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
    } catch (err) {
      console.error("Error updating audio entry:", err);
      toast.error("Error updating audio entry");
    }
  };

  const uploadAudio = async (file: File, audioId: string) => {
    const res = await uploadFile(file, "audio");
    if (!res?.success || !res.data) return;
    await updateAudioEntry(audioId, { audio: res.data });
  };

  const uploadCover = async (file: File, audioId: string) => {
    const res = await uploadFile(file, "img");
    if (!res?.success || !res.data) return;
    await updateAudioEntry(audioId, { cover: res.data });
  };

  const uploadAudioName = async (name: string, audioId: string) => {
    await updateAudioEntry(audioId, { name });
  };

  const generateAudioId = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleAddAudio = async (
    e: React.FormEvent,
    audioFile: File,
    audioName: string,
    audioCoverFile?: File | null
  ): Promise<{ success: boolean }> => {
    e.preventDefault();
    setIsAddAudioModalLoading(true);

    const audioId = generateAudioId();
    
    await uploadAudio(audioFile, audioId);
    await uploadAudioName(audioName, audioId);

    if (audioCoverFile) {
      await uploadCover(audioCoverFile, audioId);
    }

    setIsAddAudioModalLoading(false);
    return { success: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioFile) {
      toast.error("Please upload an audio.");
      return;
    }

    const maxSizeInBytesAudio = fileTypesMaxSizeInMB["audio"] * 1024 * 1024;

    if (audioFile.size > maxSizeInBytesAudio) {
      toast.error("Audio file size is too large.");
      return;
    }

    const maxSizeInBytesAudioCover = fileTypesMaxSizeInMB["img"] * 1024 * 1024;

    if (audioCoverFile && audioCoverFile.size > maxSizeInBytesAudioCover) {
      toast.error("Audio cover file size is too large.");
      return;
    }

    if (!audioName) {
      toast.error("Please enter an audio name.");
      return;
    }

    const result = await handleAddAudio(
      e,
      audioFile,
      audioName,
      audioCoverFile
    );

    if (result.success) {
      handleMenuClose();
      toast.success("Audio added successfully!");

      setTimeout(() => {
        setAudioFile(null);
        setAudioCoverFile(null);
        setAudioCoverPreview("");
        setAudioName("");
      }, 300);
    } else {
      toast.error("Something went wrong. Try again.");
    }
  };

  const UploadAudioComponent = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setAudioFile(file);
    };

    const handleDeleteAudioFile = () => {
      setAudioFile(null);
    };

    return (
      <div className="flex-1">
        <input
          type="file"
          id="audioFile"
          onChange={handleChange}
          accept="audio/*"
        />

        {audioFile !== null ? (
          <div className="select-card_nohover !p-0 relative !cursor-auto !h-full">
            <FaItunesNote size={48} />
            <div className="absolute top-[8px] right-[8px] flex gap-2 items-center">
              <button
                type="button"
                className="btn-opacity !p-1 !rounded-[8px]"
                onClick={handleDeleteAudioFile}
                title="Close modal"
              >
                <X size={18} color="red" />
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="audioFile" className="select-card !h-full">
            <div className="flex flex-col items-center gap-4">
              <FaItunesNote size={48} />
              <p className="profile-card__id text-center">
                Upload Audio File. Max size: {fileTypesMaxSizeInMB["audio"]} MB
              </p>
            </div>
          </label>
        )}
      </div>
    );
  };

  const UploadAudioCoverComponent = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setAudioCoverFile(file);

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setAudioCoverPreview(reader.result as string);
        };
      }
    };

    const handleDeleteAudioCoverFile = () => {
      setAudioCoverFile(null);
    };

    return (
      <div className="flex-1">
        <input
          type="file"
          id="audioCoverFile"
          onChange={handleChange}
          accept="image/*"
        />

        {audioCoverFile !== null ? (
          <div className="select-card_nohover !p-0 relative !cursor-auto !h-full">
            <Image
              src={audioCoverPreview}
              alt="audio cover"
              className="rounded-[12px] object-cover !w-full !h-full"
              width={512}
              height={512}
            />
            <div className="absolute top-[8px] right-[8px] flex gap-2 items-center">
              <button
                type="button"
                className="btn-opacity !p-1 !rounded-[8px]"
                onClick={handleDeleteAudioCoverFile}
                title="Close modal"
              >
                <X size={18} color="red" />
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="audioCoverFile" className="select-card !h-full">
            <div className="flex flex-col items-center gap-4">
              <UploadCloud size={48} />
              <p className="profile-card__id text-center">
                Upload Audio Cover. Max size: {fileTypesMaxSizeInMB["img"]} MB
              </p>
            </div>
          </label>
        )}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isMenuOpen}
      onClose={handleMenuClose}
      isSending={isAddAudioModalLoading}
      onSubmit={handleSubmit}
      title="Add An Audio"
      content={
        <div className="flex flex-col gap-4">
          {!profile.premium && (
            <PremiumInfoBanner text="Add up to 4 audios with premium" />
          )}
          <div className="flex gap-4 !h-[120px] !min-w-[520px]">
            <UploadAudioComponent />
            <UploadAudioCoverComponent />
          </div>
          <div className="input_container">
            <div className="input_title">Autio Title</div>
            <div className="input_body !gap-[10px]">
              <FaItunesNote size={24} />
              <input
                type="text"
                name="audioName"
                id="audioName"
                placeholder="Add a title"
                value={audioName}
                onChange={(e) => setAudioName(e.target.value)}
                className="focus:outline-none"
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default AddAudioModal;
