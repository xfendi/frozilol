"use client";

import React, { useState, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthData } from "@/context/authContext";
import Loader from "@/components/global/loader";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { pages } from "@/data/names";
import { validatePromoCode } from "@/lib/other/validatePromoCode";
import Cube from "@/components/global/cube";
import { maxInputLength } from "@/data/inputs";

interface FirebaseError extends Error {
  code: string;
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [promo, setPromo] = useState<string>("");
  const [usernameTaken, setUsernameTaken] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const searchUsername = searchParams.get("username");
  const searchPromo = searchParams.get("promo");

  useEffect(() => {
    if (searchUsername) {
      setUsername(searchUsername);
    }

    if (searchPromo && searchPromo.length >= 3) {
      setPromo(searchPromo);
    }
  }, [searchParams]);

  const { createUser } = AuthData();

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameTaken(false);
  };

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formatedUsername = username.toLowerCase().replace(/\s+/g, "-");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userRef = doc(db, "profiles", formatedUsername);
      const userSnap = await getDoc(userRef);

      if (!formatedUsername || userSnap.exists() || pages.includes(formatedUsername)) {
        setIsLoading(false);
        toast.error("Username is already taken.");
        setUsernameTaken(true);
        return;
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Checking username availability failed.");
      return;
    }

    if (promo) {
      if (promo.length < 3) {
        return toast.error("Promo code must be at least 3 characters long.");
      }

      const { valid, data, error } = await validatePromoCode(
        promo.toLowerCase()
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

    try {
      await createUser(email, password, formatedUsername, promo);
      window.location.href = "/dashboard";
    } catch (error: unknown) {
      setIsLoading(false);

      let errorMessage = "Something went wrong.";

      if ((error as FirebaseError).code) {
        const firebaseError = error as FirebaseError;

        switch (firebaseError.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email already in use.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Sign-up is disabled.";
            break;
          default:
            console.error(error);
            errorMessage = "Unknown error.";
            break;
        }
      }

      toast.error(errorMessage);
      console.error("Error during registration:", error);
    }
  };

  return (
    <section className="form__section">
      <div className="form__box" data-aos="fade-up">
        <div className="form__top">
          <Cube size={50} />
        </div>

        <form onSubmit={HandleSubmit} className="form">
          <div
            className={`input_body ${usernameTaken ? "!border-red-500" : ""}`}
          >
            <span>frozi.lol/</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onChange={onUsernameChange}
              value={username}
              maxLength={maxInputLength.username}
              required
            />
          </div>
          <div className="input_body">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="input_body">
            <input
              type="password"
              name="password"
              id="pasword"
              placeholder="Password"
              required
              maxLength={maxInputLength.password}
            />
          </div>

          <div className="input_body">
            <input
              type="promo"
              name="promo"
              id="promo"
              placeholder="Promo Code (optional)"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              maxLength={maxInputLength.promo}
            />
          </div>

          <div className="form__footer">
            <div className="form__footer-text">
              By signing up, you agree to our{" "}
              <Link href="/terms">Terms of Service</Link> <br /> and{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </div>
          </div>

          <button type="submit" className="btn-primary">
            {isLoading ? <Loader white /> : "Register"}
          </button>

          <div className="form__footer">
            <div className="form__footer-text">
              Already have account? <Link href="/auth/login">Log in</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
