"use client";

import { ProfileData } from "@/context/profileContext";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const LinkDiscordButton = () => {
  const { profile } = ProfileData();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const errorMessage = "Something went wrong, please try again later.";

      if (event.data.success) {
        toast.success("Discord account linked successfully!");
      } else if (event.data.error) {
        toast.error(event.data.error || errorMessage);
      } else {
        toast.error(errorMessage);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
      const width = 400;
      const height = 500;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      const popup = window.open(
        data.url,
        "Discord Login",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      if (!popup) {
        toast.error("Popup blocked, please allow popups in your browser.");
        return;
      }
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
