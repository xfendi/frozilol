import React from "react";

import "@/styles/landing.css";

import NavBar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import { Metadata } from "next";
import RedeemInput from "@/components/landing/shop/redeem/redeemInput";

export const metadata: Metadata = {
  title: "frozi.lol | Redeem",
};

const RedeemPage = () => {
  return (
    <div className="relative w-full">
      <NavBar />

      <section data-aos="fade-up">
        <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
          🎁 Redeem Your Gift Code
        </div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Enter your gift code below to redeem your product. <br />
          If you have any issues, please contact our support team.
        </div>
        <div className="section-main !w-full gap-[32px] flex flex-col">
          <RedeemInput />
        </div>
      </section>

      <Hero />
      <Footer />
    </div>
  );
};

export default RedeemPage;
