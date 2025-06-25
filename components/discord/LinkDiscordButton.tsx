"use client";

import { ProfileData } from "@/context/profileContext";
import React from "react";
import toast from "react-hot-toast";

const LinkDiscordButton = () => {
  const { profile } = ProfileData();

  const handleConnect = async () => {
    const errMessage = "Something went wrong, please try again later.";

    let res;

    try {
      res = await fetch("/api/discord/link", {
        method: "POST",
      });
    } catch (err) {
      console.error(err);
      toast.error(errMessage);
      return;
    }

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      toast.error(errMessage);
    }
  };

  return (
    <>
      {!profile.discordID ? (
        <button
          onClick={handleConnect}
          className="btn-outline !bg-blue-600 !border-blue-500 hover:!bg-blue-700 hover:!border-blue-600"
        >
          Link Discord Account
        </button>
      ) : (
        <>
          <button className="btn-outline" onClick={handleConnect}>
            Update Discord Account
          </button>

          <p className="profile-card__id text-start">
            You already have a linked Discord account! Update it only if you
            faced any issues!
          </p>
        </>
      )}
    </>
  );
};

export default LinkDiscordButton;
