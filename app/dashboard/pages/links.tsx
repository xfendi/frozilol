"use client";

import Modal from "@/components/global/modal";
import NamePlateContainer from "@/components/global/namePlateContainer";
import { crypto, LinkType, socials } from "@/data/links";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LinksPage = () => {
  const [openModal, setOpenModal] = useState<LinkType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [providedLink, setProvidedLink] = useState("");

  const openLinkModal = (data: LinkType) => {
    setOpenModal(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setOpenModal(null);
      setProvidedLink("");
    }, 300);
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!openModal) {
      return toast.error("No link selected.");
    }

    setLoading(true);

    try {
      console.log(openModal.name, providedLink);

      await fetch("/api/profile/add-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: openModal.name,
          type: openModal.type,
          providedLink: providedLink,
        }),
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      toast.success(`${openModal.friendlyName} link added successfully`);
      setLoading(false);
      closeModal();
    }
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="dashboard__section-main flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <NamePlateContainer text={s.friendlyName} key={s.name}>
                <button
                  className="btn-outline !p-4"
                  onClick={() => openLinkModal(s)}
                >
                  <Image
                    src={`/socials/${s.name}.png`}
                    alt={s.name}
                    width={32}
                    height={32}
                  />
                </button>
              </NamePlateContainer>
            ))}
          </div>
          <div className="feature-title max-w-sm text-xl font-semibold">
            Crypto
          </div>
          <div className="flex flex-wrap gap-4">
            {crypto.map((c) => (
              <NamePlateContainer text={c.friendlyName} key={c.name}>
                <button
                  className="btn-outline !p-4"
                  onClick={() => openLinkModal(c)}
                >
                  <Image
                    src={`/crypto/${c.name}.png`}
                    alt={c.name}
                    width={32}
                    height={32}
                  />
                </button>
              </NamePlateContainer>
            ))}
          </div>
        </div>
      </section>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Add ${openModal?.friendlyName} to your profile`}
        content={
          <div className="input_container">
            <div className="input_body">
              <Image
                src={`/${openModal?.type}/${openModal?.name}.png`}
                className="!mr-2"
                alt={openModal?.name || ""}
                width={24}
                height={24}
              />
              {openModal?.type !== "crypto" && (
                <span className="!text-stone-500">
                  {openModal?.profileStartLink}
                </span>
              )}
              <input
                type="text"
                placeholder="..."
                value={providedLink}
                onChange={(e) => setProvidedLink(e.target.value)}
                className="focus:outline-none"
              />
            </div>
          </div>
        }
        onSubmit={handleAddLink}
        isSending={loading}
      />
    </>
  );
};

export default LinksPage;
