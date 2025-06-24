"use client";

import React, { use, useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Link from "next/link";

import { products } from "@/data/products";

import "@/styles/landing.css";

import NavBar from "@/components/landing/Navbar";
import { AuthData } from "@/context/authContext";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import toast from "react-hot-toast";
import { validatePromoCode } from "@/lib/other/validatePromoCode";
import { maxInputLength } from "@/data/inputs";

const ProductPage = ({
  params,
}: {
  params: Promise<{ "product-name": string }>;
}) => {
  const [isGift, setIsGift] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");

  const [promoCode, setPromoCode] = useState("");

  const searchParams = useSearchParams();
  const searchPromo = searchParams.get("promo");

  useEffect(() => {
    if (searchPromo && searchPromo.length >= 3) {
      setPromoCode(searchPromo);
    }
  }, [searchPromo]);

  const { user } = AuthData();
  const resolvedParams = use(params);
  const productName = resolvedParams["product-name"];

  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === productName
  );

  if (!product) notFound();

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGiftEmail(e.target.value);
  };

  const handlePromoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleBuy = async () => {
    if (!isGift) {
      const res = await fetch("/api/product/check", {
        method: "POST",
        body: JSON.stringify({
          userId: user.uid,
          productId: Number(product.id),
        }),
      });
      const data = await res.json();

      if (data.hasProduct) {
        return toast.error("You already own this product.");
      }
    }

    if (isGift && !giftEmail) return toast.error("Please enter a gift email.");

    if (promoCode) {
      if (promoCode.length < 3) {
        return toast.error("Promo code must be at least 3 characters long.");
      }

      const { valid, error } = await validatePromoCode(
        promoCode.toLowerCase()
      );

      if (error) {
        toast.error("Error checking promo code");
        return;
      }

      if (!valid) {
        toast.error("Invalid promo code");
        return;
      }
    }

    let body = {
      isGift,
      giftEmail,
      product,
      userId: "",
      promoCode: promoCode.toLowerCase() || "",
    };

    if (!isGift) body = { ...body, userId: user?.uid };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating payment session.");
    }
  };

  const BuyBtn = () => {
    return (
      <button onClick={handleBuy} className="btn-light">
        ${product.price} - Buy Now
      </button>
    );
  };

  return (
    <div className="relative w-full">
      <NavBar />

      <section data-aos="fade-up">
        <div className="flex md:flex-row flex-col">
          <div
            className={`flex-1 feature-icon_${product.color} md:rounded-l-[12px] md:rounded-t-none rounded-t-[12px] text-5xl flex justify-center items-center min-h-[200px]`}
          >
            {product.icon}
          </div>
          <div className="flex-1 feature card md:!rounded-l-none md:!border-l-none md:!rounded-t-[12px] !rounded-t-none">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="feature-title max-w-sm text-2xl font-bold">
                  {product.name}
                </div>
                <div className="text-xl !font-light !text-stone-500">
                  {product.description}
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="feature-price text-4xl font-bold">
                  ${product.price}
                </div>
                <div className="text-xl !font-light !text-stone-500">
                  /Lifetime
                </div>
              </div>
              <div className="text-[16px]">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="!mb-2 last:!mb-0 flex items-center gap-2 !font-light !text-stone-300"
                  >
                    — {feature}
                  </div>
                ))}
              </div>
              <div className="divider"></div>
              {product.gift && (
                <div className="flex items-center gap-2">
                  <div className="checkbox-wrapper-46">
                    <input
                      className="inp-cbx"
                      id="cbx-46"
                      type="checkbox"
                      onChange={() => setIsGift(!isGift)}
                      checked={isGift}
                    />
                    <label className="cbx" htmlFor="cbx-46">
                      <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <span className="text-[16px] !font-light">
                        Buy as a gift code 🎁
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {!user && !isGift && (
                <Link href="/auth/login" className="btn-light">
                  Login
                </Link>
              )}

              {user && !isGift && (
                <>
                  <div className="input_body">
                    <input
                      type="promo"
                      name="promo"
                      id="promo"
                      placeholder="Promo Code (optional)"
                      value={promoCode}
                      onChange={handlePromoInputChange}
                      maxLength={maxInputLength.promo}
                      className="focus:outline-none"
                    />
                  </div>
                  <BuyBtn />
                </>
              )}

              {isGift && (
                <>
                  <div className="input_body">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email for gift code"
                      value={giftEmail}
                      onChange={handleEmailInputChange}
                      className="focus:outline-none"
                    />
                  </div>
                  <div className="input_body">
                    <input
                      type="promo"
                      name="promo"
                      id="promo"
                      placeholder="Promo Code (optional)"
                      value={promoCode}
                      onChange={handlePromoInputChange}
                      maxLength={maxInputLength.promo}
                      className="focus:outline-none"
                    />
                  </div>
                  <BuyBtn />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Hero />
      <Footer />
    </div>
  );
};

export default ProductPage;
