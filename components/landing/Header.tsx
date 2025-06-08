import React from "react";
import ClaimInput from "@/components/global/claimInput";

const Header = () => {
  return (
    <section className="justify-center items-center text-center" data-aos="fade-up">
      <div
        className="text-5xl sm:text-6xl font-extrabold max-w-5xl"
        style={{ letterSpacing: "3px" }}
      >
        Empower Your Digital <br /> Presence Easy & Fast 🧊
      </div>
      <div className="!text-stone-500 text-xl sm:text-2xl sm:w-2/3 max-w-screen">
        frozi.lol is your essential platform for creating modern, customizable
        bio-pages to meet all your digital needs.
      </div>
      <ClaimInput />
    </section>
  );
};

export default Header;
