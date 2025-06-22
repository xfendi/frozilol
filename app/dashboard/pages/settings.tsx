"use client";

import React, { useState } from "react";

import Modal from "@/components/global/modal";
import { ProfileData } from "@/context/profileContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";
import { maxInputLength } from "@/data/inputs";
import ChangeEmailButton from "@/components/dashboard/ChangeEmailButton";
import LogoutButton from "@/components/auth/LogoutButton";
import ChangePasswordButton from "@/components/dashboard/ChangePasswordButton";

const SettingsPage = () => {
  const [opanModal, setOpenModal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { profile } = ProfileData();

  const handleSubmit = async (e: any, value: string, type: string) => {
    e.preventDefault();
    setLoading(true);

    switch (type) {
      case "displayName":
        if (value === profile.displayName) {
          toast.error("Please change something!");
          return;
        }

        await updateDoc(doc(db, "profiles", profile.id.toString()), {
          displayName: value,
        });

        toast.success("Display name updated successfully!");
        break;

      case "username":
        if (value === profile.username) {
          toast.error("Please change something!");
          return;
        }

        await updateDoc(doc(db, "profiles", profile.id.toString()), {
          username: value,
        });

      default:
        break;
    }

    window.location.reload();
    setLoading(false);
    setOpenModal("");
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="dashboard__section-main flex flex-col gap-4 xl:w-1/3">
        <div className="input_container">
          <div className="input_title">Username</div>
          <div className="input_body">
            <input
              name="username"
              id="username"
              placeholder="Username"
              value={profile.username}
              className="focus:outline-none"
              onClick={() => setOpenModal("username")}
              readOnly
            />
          </div>
        </div>
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

      <div className="dashboard__section-main flex flex-col gap-4 xl:w-1/3">
        <ChangeEmailButton />
        <ChangePasswordButton />
        <LogoutButton />
      </div>

      <Modal
        isOpen={opanModal === "username"}
        onClose={() => setOpenModal("")}
        title="Username"
        content={
          <div className="input_container">
            <div className="input_body">
              <input
                name="newUsername"
                id="newUsername"
                placeholder="New Username"
                className="focus:outline-none"
                maxLength={maxInputLength.username}
              />
            </div>
          </div>
        }
        onSubmit={(e) =>
          handleSubmit(e, e.currentTarget.newUsername.value, "username")
        }
        isSending={loading}
      />

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
                maxLength={maxInputLength.displayName}
              />
            </div>
          </div>
        }
        onSubmit={(e) =>
          handleSubmit(e, e.currentTarget.newDisplayName.value, "displayName")
        }
        isSending={loading}
      />
    </section>
  );
};

export default SettingsPage;
