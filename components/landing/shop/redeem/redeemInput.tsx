"use client";

import { AuthData } from "@/context/authContext";
import { maxInputLength } from "@/data/inputs";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RedeemInput = () => {
  const [code, setCode] = useState("");
  const { user } = AuthData();

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleRedeem = async () => {
    if (!code || code.trim().length === 0) {
      toast.error("Please enter a code.");
      return;
    }

    try {
      const giftRef = doc(db, "gifts", code);
      const giftSnap = await getDoc(giftRef);

      if (!giftSnap.exists()) {
        toast.error("Invalid gift code.");
        return;
      }
      const giftData = giftSnap.data();

      if (giftData.used) {
        toast.error("This gift code has already been redeemed.");
        return;
      }

      const checkRes = await fetch("/api/product/check", {
        method: "POST",
        body: JSON.stringify({
          userId: user.uid,
          productId: Number(giftData.productId),
        }),
      });

      const data = await checkRes.json();

      if (data.hasProduct) {
        return toast.error("You already own this product.");
      }

      await fetch("/api/product/add", {
        method: "POST",
        body: JSON.stringify({
          userId: user.uid,
          productId: Number(giftData.productId),
        }),
      });

      updateDoc(giftRef, {
        used: true,
        redeemedBy: user.uid,
      });

      toast.success("Gift code redeemed successfully!");
    } catch (err) {
      console.error("❌ Error while redeeming code:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div>
      {!user ? (
        <Link href="/auth/login" className="btn-light w-max">
          Log in
        </Link>
      ) : (
        <div className="flex md:flex-row flex-col gap-[16px] items-center">
          <div className="input_body">
            <input
              type="text"
              id="code"
              placeholder="Your Gift Code"
              value={code}
              onChange={handleChangeCode}
              className="focus:outline-none"
              maxLength={maxInputLength.giftCode}
            />
          </div>
          <button
            onClick={handleRedeem}
            className="btn-primary md:w-max w-full"
          >
            Redeem Code
          </button>
        </div>
      )}
    </div>
  );
};

export default RedeemInput;
