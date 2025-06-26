import React from "react";

interface BottomPopupProps {
  title: string;
  isOpen?: boolean;
  content?: React.ReactNode;
}

const BottomPopup: React.FC<BottomPopupProps> = ({
  title,
  isOpen,
  content,
}) => {
  return (
    <div className={`bottom-popup ${isOpen ? "show" : ""}`}>
      <div className="feature-title max-w-sm text-xl font-semibold">
        {title}
      </div>
      {content}
    </div>
  );
};

export default BottomPopup;
