"use client";

import React, { useState } from "react";

import { FaShareAlt } from "react-icons/fa";
import Modal from "../global/modal";

import { MdOpenInNew } from "react-icons/md";
import Link from "next/link";
import { ProfileData } from "@/context/profileContext";
import CopyButton from "../global/copyButton";

const SharePageButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { profile } = ProfileData();
  const username = profile?.username;

  return (
    <>
      <button
        className="btn-primary flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <FaShareAlt />
        Share Your Profile
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Share Your Profile"
        content={
          <div className="flex flex-col gap-4">
            <p className="profile-card__id text-start">
              Get more views by sharing your frozi.lol link across all
              platforms.
            </p>
            <Link className="btn-big" href={`/${username}`}>
              <div className="!w-[40px] !h-[40px] rounded-lg bg-(--border-secondary) flex items-center justify-center">
                <MdOpenInNew size={25} />
              </div>
              Open my Page
            </Link>

            <CopyButton text={`https://frozi.lol/${username}`} type="big" label={`frozi.lol/${username}`} />

            <p className="profile-card__id text-start">
              Have a question or need support?
            </p>
            <Link href="/support" className="btn-primary">
              Support Page
            </Link>
          </div>
        }
      />
    </>
  );
};

export default SharePageButton;
