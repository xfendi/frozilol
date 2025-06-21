"use client";

import React from "react";
import toast from "react-hot-toast";

import { MdContentCopy } from "react-icons/md";

const CopyButton = ({
  text,
  type,
  label,
}: {
  text: string;
  type: string;
  label: string;
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyText = (e: React.MouseEvent) => {
    e.preventDefault();

    if (copied) return;

    navigator.clipboard.writeText(text);
    toast.success(`Copied successfully!`);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button className={`btn-${type}`} onClick={handleCopyText}>
      {type === "big" && (
        <div className="!w-[40px] !h-[40px] rounded-lg bg-(--border-secondary) flex items-center justify-center">
          <MdContentCopy size={25} />
        </div>
      )}
      {copied ? "Copied!" : label}
    </button>
  );
};

export default CopyButton;
