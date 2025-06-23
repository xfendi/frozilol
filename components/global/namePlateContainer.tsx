"use client";

import React from "react";

const NamePlateContainer = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="nameplate-container">
      <div className="cursor-pointer">{children}</div>
      <div className="nameplate-container_text">{text}</div>
    </div>
  );
};

export default NamePlateContainer;
