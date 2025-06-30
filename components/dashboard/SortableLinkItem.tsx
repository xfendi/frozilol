"use client";

import { AuthData } from "@/context/authContext";
import { FolderType, folederNames, LinkType, linkTypes } from "@/data/links";
import { db } from "@/firebase";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { GripVertical, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../global/modal";

export const SortableLinkItem = ({ link }: { link: LinkType }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id! });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const linksMap: LinkType[] = linkTypes[link.type as keyof typeof linkTypes];
  const linkData = linksMap.find((l) => l.name === link.name);

  let cleanLink = link?.link?.replace(/^https?:\/\//, "");
  if (link.type === "email") {
    cleanLink = link?.link?.replace(/^mailto:/, "");
  }

  const cleanLinkProfile = cleanLink?.replace(
    new RegExp(`^${linkData?.profileStartLink}`),
    ""
  );

  const [editLink, setEditLink] = useState(cleanLinkProfile);

  const [loading, setLoading] = useState(false);

  const { user } = AuthData();

  const handleDelete = async () => {
    try {
      const q = query(collection(db, "profiles"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User profile not found!");
        toast.error("User profile not found!");
        return;
      }

      const userDocRef = querySnapshot.docs[0].ref;
      const userDocData = querySnapshot.docs[0].data();
      const currentLinks = userDocData.links || [];

      const updatedLinks = currentLinks.filter(
        (l: LinkType) => l.link !== link.link
      );

      await updateDoc(userDocRef, { links: updatedLinks });

      toast.success("Link deleted successfully!");
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editLink) {
      return toast.error("Please provide a link.");
    }

    if (editLink === cleanLinkProfile) {
      return toast.error("You have not changed the link.");
    }

    setLoading(true);

    try {
      const q = query(collection(db, "profiles"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User profile not found!");
        return;
      }

      const userDocRef = querySnapshot.docs[0].ref;
      const userDocData = querySnapshot.docs[0].data();
      const currentLinks = userDocData.links || [];

      let linkToSet;

      if (link.linkMode === "href") {
        if (link.type === "other") {
          linkToSet = `${linkData?.profileStartLink}${editLink}`;
        } else {
          linkToSet = `https://${linkData?.profileStartLink}${editLink}`;
        }
      } else {
        if (link.type === "email") {
          linkToSet = `mailto:${editLink}`;
        } else {
          linkToSet = editLink;
        }
      }

      const updatedLinks = currentLinks.map((l: LinkType) => {
        if (l.link === link.link) {
          return {
            ...l,
            link: linkToSet,
          };
        }

        return l;
      });

      await updateDoc(userDocRef, { links: updatedLinks });

      toast.success("Link updated successfully!");
    } catch (error) {
      console.error("Error updating link:", error);
    } finally {
      setLoading(false);
      setIsEditModalOpen(false);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      setEditLink(cleanLinkProfile);
    }, 300);
  };

  return (
    <>
      <div ref={setNodeRef} style={style} className="dashboard-link-card">
        <div
          className="flex items-center justify-center bg-(--border-secondary) rounded-[12px] h-full !p-1 cursor-grab"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical color="var(--color-stone-500)" size={16} />
        </div>

        <div className="flex flex-col !p-4 flex-1">
          <div className="input_container">
            <div className="flex items-center justify-between gap-2">
              <div className="input_title">{linkData?.friendlyName}</div>
              <div className="flex gap-1">
                <button
                  className="btn-opacity !p-1.5 !rounded-[8px]"
                  onClick={() => setIsEditModalOpen(true)}
                  title="Edit link"
                >
                  <Pencil color="var(--color-stone-500)" size={16} />
                </button>
                <button
                  className="btn-opacity !p-1.5 !rounded-[8px]"
                  onClick={handleDelete}
                  title="Delete link"
                >
                  <Trash color="var(--color-red-500)" size={16} />
                </button>
              </div>
            </div>
            <div className="input_body !w-full">
              <Image
                src={`/${folederNames[link?.type as FolderType]}/${
                  link?.name
                }.png`}
                className="!mr-2"
                alt={link?.name || ""}
                width={24}
                height={24}
              />
              {link?.type !== "crypto" && (
                <span className="!text-stone-500">
                  {link?.profileStartLink}
                </span>
              )}
              <input
                type="text"
                placeholder="..."
                value={cleanLink}
                className="focus:outline-none !text-stone-300"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title={`Edit ${linkData?.friendlyName}`}
        content={
          <div className="input_container">
            <div className="input_body">
              <Image
                src={`/${folederNames[linkData?.type as FolderType]}/${
                  linkData?.name
                }.png`}
                className="!mr-2"
                alt={linkData?.name || ""}
                width={24}
                height={24}
              />
              {link?.type !== "crypto" && (
                <span className="!text-stone-500">
                  {linkData?.profileStartLink}
                </span>
              )}
              <input
                type="text"
                placeholder="..."
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
                className="focus:outline-none"
              />
            </div>
          </div>
        }
        onSubmit={handleEdit}
        isSending={loading}
      />
    </>
  );
};
