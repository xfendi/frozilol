import React from "react";
import { Metadata } from "next";

import "@/styles/landing.css";

import NavBar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import Text from "@/components/landing/support/Text";

export const metadata: Metadata = {
  title: "frozi.lol | Support",
};

const SupportPage = () => {
  return (
    <div className="relative w-full">
      <NavBar />

      <Text />

      <Hero />
      <Footer />
    </div>
  );
};

export default SupportPage;
