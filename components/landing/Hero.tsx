import React from "react";
import ClaimInput from "../global/claimInput";
import Cube from "../global/cube";

const Hero = () => {
  return (
    <section className="justify-center items-center text-center !pt-0 hero">
      <div className="flex flex-col gap-[32px] text-center items-center" data-aos="fade-up">
        <Cube size={70} />
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
