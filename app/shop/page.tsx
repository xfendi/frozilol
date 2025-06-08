import React from "react";

import "@/styles/landing.css";

import NavBar from "@/components/landing/Navbar";
import Products from "@/components/landing/shop/Products";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "frozi.lol | Shop",
};

const ShopPage = () => {
  return (
    <div className="relative w-full">
      <NavBar />

      <Products />

      <Hero />
      <Footer />
    </div>
  );
};

export default ShopPage;
