"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Loader from "@/components/global/loader";
import Image from "next/image";
import Cube from "@/components/global/cube";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="form__section">
      <div className="form__box" data-aos="fade-up">
        <div className="form__top">
          <Cube size={50} />
        </div>

        <form onSubmit={HandleSubmit} className="form">
          <div className="input_body">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            {loading ? <Loader white /> : "Send Reset Password Link"}
          </button>

          <div className="form__footer">
            <div className="form__footer-text">
              Go back to <Link href="/auth/login">Log in</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
