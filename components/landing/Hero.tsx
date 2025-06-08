import React from "react";
import ClaimInput from "../global/claimInput";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="justify-center items-center text-center !pt-0 hero">
      <div className="flex flex-col gap-[32px] text-center items-center" data-aos="fade-up">
        <Link
          href="/"
          className="flex items-center gap-2 transition-all duration-300 hover:scale-120 hover:rotate-12"
        >
          <Image
            src="/images/main-cube.png"
            alt="frozi.lol"
            width={70}
            height={70}
          />
        </Link>
        <div
          className="text-5xl sm:text-6xl font-extrabold max-w-5xl"
          style={{ letterSpacing: "3px" }}
        >
          Ready to Start Crafting Your <br />
          Digital Story? 🪁
        </div>
        <ClaimInput />
      </div>
    </section>
  );
};

export default Hero;
