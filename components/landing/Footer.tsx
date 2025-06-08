import { footerlinks } from "@/data/footer";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="flex items-center gap-2">
          <Image
            src="/images/main-cube.png"
            alt="frozi.lol"
            width={15}
            height={15}
          />
          <div className="section-description !text-stone-500 text-md">
            frozi.lol 2025 — All rights reserved
          </div>
        </div>
        <div className="flex items-center gap-[32px]">
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
