import Cube from "@/components/global/cube";
import Link from "next/link";
import React from "react";

const SoonPage = () => {
  return (
    <section className="flex justify-center items-center w-full h-full">
      <div
        className=" flex flex-col gap-[32px] items-center justify-center !w-max !h-max"
        data-aos="fade-up"
      >
        <div className="form__top">
          <Cube size={50} />
        </div>

        <div className="form__main flex flex-col gap-[16px] items-center text-center justify-center md:max-w-md">
          <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
            🛠️ Page Coming Soon!
          </div>
          <div className="section-description !text-stone-500 text-md sm:text-xl">
            This page is currently under construction. Please check back later.
            Thank you for your patience.
          </div>
        </div>

        <div className="form__footer">
          <div className="form__footer-text">
            Go back to <Link href="/shop">Dashboard</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoonPage;
