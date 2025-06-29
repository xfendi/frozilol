"use client";

import Loader from "@/components/global/loader";
import { ProfileData } from "@/context/profileContext";
import { fileTypesMaxSizeInMB } from "@/data/files";
import { handleDeleteFile } from "@/lib/files/handleDeleteFile";
import { uploadFile } from "@/lib/files/uploadFile";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CursorInput = () => {
  const [uploading, setUploading] = useState(false);

  const { profile } = ProfileData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    uploadFile({
      file,
      setUploading,
      key: "cursor",
      profile,
      type: "img",
      successMsg: "Cursor uploaded successfully!",
    });
  };

  return (
    <>
      <input type="file" id="cursorFile" onChange={handleChange} accept="image/*" />

      {profile?.customize.cursor ? (
        <div className="select-card_nohover !p-0 relative !cursor-auto !h-[200px]">
          <Image
            src={profile.customize.cursor.URL}
            alt="cursor"
            className="rounded-[12px] object-cover !w-full !h-full"
            width={512}
            height={512}
          />
          <div className="absolute top-[8px] right-[8px] flex gap-2 items-center">
            <button
              type="button"
              className="btn-opacity !p-1 !rounded-[8px]"
              onClick={() => handleDeleteFile(profile, "cursor", setUploading)}
              title="Close modal"
            >
              <X size={18} color="red" />
            </button>
          </div>
        </div>
      ) : (
        <label htmlFor="cursorFile" className="select-card !h-[200px]">
          {uploading ? (
            <Loader white />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <UploadCloud size={48} />
              <p className="profile-card__id text-center">
                Upload Cursor. Max size: {fileTypesMaxSizeInMB["img"]}
                MB
              </p>
            </div>
          )}
        </label>
      )}
    </>
  );
};

export default CursorInput;
