import { footerlinks } from "@/data/footer";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="md:!p-5 !p-0 !py-[32px]">
      <div className="footer-container flex flex-col md:flex-row gap-8 md:!px-10 !p-0">
        <div className="flex items-center gap-2">
          <Image
            src="/images/main-cube.png"
            alt="frozi.lol"
            className="md:flex hidden"
            width={15}
            height={15}
          />
          <div className="section-description !text-stone-500 text-md">
            frozi.lol 2025 — All rights reserved
          </div>
        </div>
        <div className="divider md:hidden flex w-full"></div>
        <div className="flex md:flex-row flex-col items-center gap-8">
          {footerlinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="section-description !text-stone-500 text-md transition-all duration-300 hover:!text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
