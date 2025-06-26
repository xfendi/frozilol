import React from "react";
import Cube from "../global/cube";
import Link from "next/link";

const NoProfileFound = () => {
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
            ❌ No profile found for this username
          </div>
          <div className="section-description !text-stone-500 text-md sm:text-xl">
            Please check your username and try again.
          </div>
        </div>

        <Link href="/" className="btn-primary">
          Create Your Own Profile
        </Link>

        <div className="form__footer">
          <div className="form__footer-text">
            Go to <Link href="/">Home Page</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoProfileFound;
