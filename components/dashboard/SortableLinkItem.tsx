"use client";

import { AuthData } from "@/context/authContext";
import { LinkType, linkTypes } from "@/data/links";
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
import { GripVertical, Trash } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export const SortableLinkItem = ({ link }: { link: LinkType }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const linksMap: LinkType[] = linkTypes[link.type as keyof typeof linkTypes];
  const linkData = linksMap.find((l) => l.name === link.name);

  const cleanLink = link?.link?.replace(/^https?:\/\//, "");

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

  return (
    <div ref={setNodeRef} style={style} className="link-card">
      <div
        className="flex items-center justify-center bg-(--border-secondary) rounded-[12px] h-full !p-1 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVertical color="var(--color-stone-500)" size={16} />
      </div>

      <div className="flex flex-col !p-4 flex-1">
        <div className="input_container">
          <div className="flex items-center justify-between gap-2">
            <div className="input_title">{linkData?.friendlyName}</div>
            <button
              className="btn-opacity !p-1.5 !rounded-[8px]"
              onClick={handleDelete}
            >
              <Trash color="var(--color-red-500)" size={16} />
            </button>
          </div>
          <div className="input_body !w-full">
            <Image
              src={`/${link?.type}/${link?.name}.png`}
              className="!mr-2"
              alt={link?.name || ""}
              width={24}
              height={24}
            />
            {link?.type !== "crypto" && (
              <span className="!text-stone-500">{link?.profileStartLink}</span>
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
  );
};
