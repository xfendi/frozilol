"use client";

import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import { AuthData } from "@/context/authContext";
import Loader from "@/components/global/loader";
import Cube from "@/components/global/cube";
import { maxInputLength } from "@/data/inputs";

interface FirebaseError extends Error {
  code: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const { login } = AuthData();

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (e: unknown) {
      if (e instanceof Error) {
        setIsLoading(false);

        let errorMessage = "Something went wrong.";

        if ((e as FirebaseError).code) {
          const firebaseError = e as FirebaseError;

          switch (firebaseError.code) {
            case "auth/wrong-password":
              errorMessage = "Wrong password.";
              break;
            case "auth/user-not-found":
              errorMessage = "User not found.";
              break;
            case "auth/invalid-credential":
              errorMessage = "Invalid credentials.";
              break;
            case "auth/too-many-requests":
              errorMessage = "Too many attempts. Try later.";
              break;
            case "auth/user-disabled":
              errorMessage = "Account disabled.";
              break;
            default:
              console.error(e);
              errorMessage = "Unknown error.";
              break;
          }
        } else {
          errorMessage = e.message || "Unknown error.";
        }

        toast.error(errorMessage);
      }
    }
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

          <div className="form__footer">
            <div className="form__footer-text text-end">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            {isLoading ? <Loader white /> : "Log in"}
          </button>

          <div className="form__footer">
            <div className="form__footer-text">
              Dont have an account?{" "}
              <Link href="/auth/register">Get started</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
