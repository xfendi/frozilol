"use client";

import { DndLinks } from "@/components/dashboard/DndLinks";
import Modal from "@/components/global/modal";
import NamePlateContainer from "@/components/global/namePlateContainer";
import { AuthData } from "@/context/authContext";
import { crypto, LinkType, socials } from "@/data/links";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LinksPage = () => {
  const [openModal, setOpenModal] = useState<LinkType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [providedLink, setProvidedLink] = useState("");

  const [links, setLinks] = useState<LinkType[]>([]);

  const { user } = AuthData();

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

    const foundLink = links.find(
      (l) => l.link === `https://${openModal?.profileStartLink}${providedLink}`
    );

    if (foundLink) {
      toast.error("You have already added this link.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/profile/add-link", {
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

      if (response.status === 500) {
        toast.error("Something went wrong!");
        return;
      }

      toast.success(`${openModal.friendlyName} link added successfully`);
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(collection(db, "profiles"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let updatedLinks: LinkType[] = [];
      querySnapshot.forEach((doc) => {
        updatedLinks = doc.data().links;
      });

      const linksWithIds = updatedLinks.map((link, index) => ({
        ...link,
        id: index,
      }));

      console.log(linksWithIds);
      setLinks(linksWithIds);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleReorder = async (newLinks: LinkType[]) => {
    try {
      setLinks(newLinks);

      const q = query(collection(db, "profiles"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User profile not found!");
        return;
      }

      const userDocRef = querySnapshot.docs[0].ref;

      await updateDoc(userDocRef, { links: newLinks });

      console.log("Reorder saved to Firestore 💾");
    } catch (error) {
      console.error("Error updating order:", error);
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
        <DndLinks links={links} onReorder={handleReorder} />
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
