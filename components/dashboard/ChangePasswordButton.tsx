import { AuthData } from "@/context/authContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../global/modal";
import { FaKey } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

const ChangePasswordButton = () => {
  const { user, logout } = AuthData();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setPassword("");
    setNewPassword("");
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
    } catch (err) {
      toast.error("Invalid password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  interface FirebaseError extends Error {
    code: string;
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updatePassword(user, newPassword);

      toast.success("Password updated successfully!");
      closeModal();
      logout();
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err) {
        const firebaseErr = err as FirebaseError;
        const errorCode = firebaseErr?.code;

        switch (errorCode) {
          case "auth/requires-recent-login":
            toast.error("Please log in again before changing your password.");
            break;
          case "auth/weak-password":
            toast.error(
              "Your new password is too weak. Use at least 6 characters."
            );
            break;
          case "auth/invalid-password":
            toast.error("The password format is invalid.");
            break;
          case "auth/too-many-requests":
            toast.error("Too many attempts. Please try again later.");
            break;
          default:
            toast.error("Failed to update password. Try again later.");
            break;
        }

        console.error("Password update error:", firebaseErr);
      } else {
        console.error("Unknown error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="input_container">
          <div className="input_title">Enter Your Current Password</div>
          <div className="input_body">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Current Password"
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
          <div className="input_title">Enter New Password</div>
          <div className="input_body">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
      <button onClick={openModal} className="btn-outline">
        Change Password
      </button>

      <p className="profile-card__id text-start">
        By changing your password, you will be logged out!
      </p>

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
                <p className="profile-card__id">Verify your current password</p>
              </div>
            </div>

            <div className="divider-vertical !h-[21px] !ml-[21px] !border-l-2"></div>

            <div className="flex text-start gap-4 items-center">
              <div className="circle-icon">
                <MdPassword size={16} />
              </div>
              <div className="profile-card_text">
                <p className="profile-card__name leading-3">Second step</p>
                <p className="profile-card__id">Change your password</p>
              </div>
            </div>

            <div className="divider"></div>

            {renderStepContent()}
          </div>
        }
        onSubmit={step === 2 ? handleChangePassword : handleNextStep}
        isSending={loading}
      />
    </>
  );
};

export default ChangePasswordButton;
