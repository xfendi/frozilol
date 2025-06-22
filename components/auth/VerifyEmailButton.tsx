"use client";

import { AuthData } from "@/context/authContext";
import { sendEmailVerification } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";

const VerifyEmailButton = () => {
  const { user } = AuthData();

  const handleClick = async () => {
    try {
      if (!user) {
        toast.error("No user is logged in");
        return;
      }

      await sendEmailVerification(user);
      toast.success("Email verified successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn-outline !bg-yellow-800 !border-yellow-700 hover:!bg-yellow-900 hover:!border-yellow-800"
    >
      Send Verify Email
    </button>
  );
};

export default VerifyEmailButton;
