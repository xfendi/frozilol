"use client";

import Loader from "@/components/global/loader";
import { ProfileData } from "@/context/profileContext";
import { fileTypesMaxSizeInMB } from "@/data/files";
import { handleDeleteFile } from "@/lib/files/handleDeleteFile";
import { uploadFile } from "@/lib/files/uploadFile";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const BackgroundInput = () => {
  const [uploading, setUploading] = useState(false);

  const { profile } = ProfileData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    uploadFile({
      file,
      setUploading,
      key: "background",
      profile,
      type: "img",
      successMsg: "Background uploaded successfully!",
    });
  };

  return (
    <>
      <input type="file" id="backgroundFile" onChange={handleChange} />

      {profile?.customize.background ? (
        <div className="select-card_nohover !p-0 relative !cursor-auto !h-[200px]">
          <Image
            src={profile.customize.background.URL}
            alt="background"
            className="rounded-[12px] object-cover !w-full !h-full"
            width={1280}
            height={720}
          />
          <div className="absolute top-[8px] right-[8px] flex gap-2 items-center">
            <button
              type="button"
              className="btn-opacity !p-1 !rounded-[8px]"
              onClick={() =>
                handleDeleteFile(profile, "background", setUploading)
              }
              title="Delete background"
            >
              <X size={18} color="red" />
            </button>
          </div>
        </div>
      ) : (
        <label htmlFor="backgroundFile" className="select-card">
          {uploading ? (
            <Loader white />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <UploadCloud size={48} />
              <p className="profile-card__id text-center">
                Upload Background. Max size: {fileTypesMaxSizeInMB["img"]}MB
              </p>
            </div>
          )}
        </label>
      )}
    </>
  );
};

export default BackgroundInput;
