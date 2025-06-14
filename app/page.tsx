import { Metadata } from "next";
import React from "react";

import "@/styles/landing.css";

import NavBar from "@/components/landing/Navbar";

import Header from "@/components/landing/Header";
import Features from "@/components/landing/Features";
import LeaderboardHero from "@/components/landing/LeaderboardHero";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "frozi.lol | Home",
};

const HomePage = () => {
  return (
    <div className="relative w-full">
      <video
        src="https://r2.guns.lol/5085c18c-3016-4479-870a-87da29a7e9de.mp4"
        className="absolute inset-0 w-full !h-[800px] object-cover -z-50 overflow-hidden"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,15,18,0.5)] to-[rgba(15,15,18,1)] -z-40 h-[800px] overflow-hidden" />

      <NavBar />

      <Header />
      <Features />
      <LeaderboardHero />
      <Pricing />
      <FAQ />

      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;
