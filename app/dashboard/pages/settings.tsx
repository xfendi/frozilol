"use client";

import React, { useState } from "react";

import Modal from "@/components/global/modal";
import { ProfileData } from "@/context/profileContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [opanModal, setOpenModal] = useState<string>("");

  const { profile } = ProfileData();

  const handleSubmit = async (e: any, value: string, type: string) => {
    e.preventDefault();

    switch (type) {
      case "displayName":
        if (value === profile.displayName) {
          toast.error("Please change something!");
          return;
        }

        await updateDoc(doc(db, "profiles", profile.username), {
          displayName: value,
        });

        toast.success("Display name updated successfully!");
        break;
      default:
        break;
    }

    setOpenModal("");
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="dashboard__section-header">
        <div className="feature-title max-w-sm text-2xl font-bold">
          ⚙️ Account Settings
        </div>
        <div className="text-xl !font-light !text-stone-500">
          Manage your account settings and preferences here.
        </div>
      </div>
      <div className="dashboard__section-main">
        <div className="input_container">
          <div className="input_title">Display Name</div>
          <div className="input_body">
            <input
              name="displayName"
              id="displayName"
              placeholder="Display Name"
              value={profile.displayName}
              className="focus:outline-none"
              onClick={() => setOpenModal("displayName")}
              readOnly
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={opanModal === "displayName"}
        onClose={() => setOpenModal("")}
        title="Display Name"
        content={
          <div className="input_container">
            <div className="input_body">
              <input
                name="newDisplayName"
                id="newDisplayName"
                placeholder="New Display Name"
                className="focus:outline-none"
              />
            </div>
          </div>
        }
        onSubmit={(e) =>
          handleSubmit(e, e.currentTarget.newDisplayName.value, "displayName")
        }
        isSending={false}
      />
    </section>
  );
};

export default SettingsPage;
