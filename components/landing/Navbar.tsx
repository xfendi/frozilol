"use client";

import { AuthData } from "@/context/authContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import Cube from "../global/cube";

const NavBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showMenu, setShowMenu] = useState(false);

  const { user } = AuthData();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex justify-between items-center">
      <Cube size={30} />
      <button
        onClick={() => setShowMenu(true)}
        className={width < 768 ? "flex" : "hidden"}
      >
        <LuMenu size={30} />
      </button>
      <div
        className={`!flex ${
          width < 768
            ? "absolute pointer-events-none top-0 left-0 right-0 bottom-0 hidden opacity-0 h-screen"
            : "opacity-100"
        } ${
          width < 768 && showMenu && "opacity-100 z-50 !pointer-events-auto"
        } transition-all duration-300`}
      >
        {width < 768 && showMenu && (
          <div
            className="bg-[rgba(0,0,0,0.9)] fixed top-0 left-0 right-0 bottom-0"
            onClick={() => setShowMenu(false)}
          ></div>
        )}
        <ul
          className={`${
            width < 768 &&
            "!flex flex-col absolute w-max top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          } font-medium hidden md:flex items-center gap-[16px]`}
        >
          <li>
            <a href="https://dc.frozi.lol" className="navbar-link">
              Discord
            </a>
          </li>
          <li>
            <Link href="/shop" className="navbar-link">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/shop/redeem" className="navbar-link">
              Redeem Code
            </Link>
          </li>
          {user ? (
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="navbar-link">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
