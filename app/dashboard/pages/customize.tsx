"use client";

import BottomPopup from "@/components/global/bottomPopup";
import Loader from "@/components/global/loader";
import { ProfileData } from "@/context/profileContext";
import { CustomizeDataType, defaultCustomizeData } from "@/data/customize";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "@/styles/profile.css";
import ThemeSection from "@/components/dashboard/customize/ThemeSection";
import AssetsSection from "@/components/dashboard/customize/AssetsSection";
import PremiumWrapper from "@/components/global/premiumWrapper";
import GeneralSection from "@/components/dashboard/customize/GeneralSection";
import OtherSection from "@/components/dashboard/customize/OtherSection";

const CustomizePage = () => {
  const [editData, setEditData] = useState<CustomizeDataType | null>();

  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);

  const { profile } = ProfileData();

  useEffect(() => {
    if (!profile) return;

    setEditData(profile.customize);
  }, [profile]);

  useEffect(() => {
    if (editData) {
      console.log("Edit data changed:", editData);
      checkProfileData();
    }
  }, [editData]);

  const checkProfileData = () => {
    if (JSON.stringify(editData) === JSON.stringify(profile.customize)) {
      setIsSavePopupOpen(false);
    } else {
      setIsSavePopupOpen(true);
    }
  };

  const handleResetChanges = () => {
    setEditData(profile.customize);
    setIsSavePopupOpen(false);
    toast.success("Changes reset successfully!");
  };

  const handleSaveChanges = async () => {
    console.log("Saving changes ...");

    if (!editData || !profile.id) {
      toast.error("Missing data to save.");
      return;
    }

    if (editData === profile.customize) {
      toast.error("No changes to save.");
      return;
    }

    try {
      await updateDoc(doc(db, "profiles", profile.id.toString()), {
        customize: editData,
        updatedAt: new Date(),
      });

      toast.success("Changes saved successfully!");
    } catch (err) {
      console.error("Error saving profile data:", err);
      toast.error("Error saving changes!");
    } finally {
      setIsSavePopupOpen(false);
    }
  };

  const updateEditData = <K extends keyof CustomizeDataType>(
    key: K,
    value: CustomizeDataType[K]
  ) => {
    setEditData((prev) => ({
      ...(prev ?? defaultCustomizeData),
      [key]: value,
    }));
  };

  if (!profile.id) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader big white />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-4 !mb-[100px]">
        <PremiumWrapper>
          <ThemeSection
            editData={editData}
            updateEditData={updateEditData}
            profile={profile}
          />
        </PremiumWrapper>
        <AssetsSection />
        <GeneralSection
          editData={editData}
          updateEditData={updateEditData}
          profile={profile}
        />
        <OtherSection
          editData={editData}
          updateEditData={updateEditData}
          profile={profile}
        />
      </section>

      <BottomPopup
        title="You have unsaved changes!"
        isOpen={isSavePopupOpen}
        content={
          <div className="flex gap-4 items-center">
            <button onClick={handleResetChanges} className="btn-outline">
              Reset
            </button>
            <button onClick={handleSaveChanges} className="btn-primary">
              Save Changes
            </button>
          </div>
        }
      />
    </>
  );
};

export default CustomizePage;
