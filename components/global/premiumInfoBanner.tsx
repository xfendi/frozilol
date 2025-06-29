"use client";

import React from "react";

import "@/styles/profile.css";
import Link from "next/link";

const PremiumInfoBanner = ({ text }: { text: string }) => {
  return (
    <Link
      href="/shop/premium"
      className="btn-opacity !bg-[rgba(255,102,178,0.70)] hover:!bg-[rgba(255,102,178,0.80)] !border-2 !border-[rgba(255,102,178,1)] !rounded-full"
    >
      {text} 💎
    </Link>
  );
};

export default PremiumInfoBanner;
