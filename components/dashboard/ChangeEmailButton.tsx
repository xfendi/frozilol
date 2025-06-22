"use client";

import React, { useState } from "react";
import Modal from "../global/modal";
import { FaKey } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import toast from "react-hot-toast";
import VerifyEmailButton from "../auth/VerifyEmailButton";
import { AuthData } from "@/context/authContext";

const ChangeEmailButton = () => {
  const { user, logout } = AuthData();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setPassword("");
    setEmail("");
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.email) {
      toast.error("User not logged in.");
      setLoading(false);
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      setStep(2);
    } catch (err: any) {
      toast.error("Invalid password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/auth/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newEmail: email,
        }),
      });

      toast.success("Email updated successfully!");
      closeModal();
      logout();
    } catch (err: any) {
      toast.error("Failed to update email.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="input_container">
          <div className="input_title">Enter Your Password</div>
          <div className="input_body">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none"
            />
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="input_container">
          <div className="input_title">Enter New Email</div>
          <div className="input_body">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {user?.emailVerified ? (
        <>
          <button onClick={openModal} className="btn-outline">
            Change Email
          </button>

          <p className="profile-card__id text-start">
            By changing your email, you will be logged out!
          </p>
        </>
      ) : (
        <VerifyEmailButton />
      )}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Change Email"
        content={
          <div className="flex flex-col gap-4">
            <div className="flex text-start gap-4 items-center">
              <div className="circle-icon">
                <FaKey size={16} />
              </div>
              <div className="profile-card_text">
                <p className="profile-card__name leading-3">First step</p>
                <p className="profile-card__id">Verify your password</p>
              </div>
            </div>

            <div className="divider-vertical !h-[21px] !ml-[21px] !border-l-2"></div>

            <div className="flex text-start gap-4 items-center">
              <div className="circle-icon">
                <MdOutlineEmail size={16} />
              </div>
              <div className="profile-card_text">
                <p className="profile-card__name leading-3">Second step</p>
                <p className="profile-card__id">Change your email</p>
              </div>
            </div>

            <div className="divider"></div>

            {renderStepContent()}
          </div>
        }
        onSubmit={step === 2 ? handleChangeEmail : handleNextStep}
        isSending={loading}
      />
    </>
  );
};

export default ChangeEmailButton;
