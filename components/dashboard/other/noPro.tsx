import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoProPage = () => {
  return (
    <section
      className="form__section flex flex-col gap-[32px] items-center justify-center w-full h-screen"
      data-aos="fade-up"
    >
      <div className="form__top">
        <Link
          href="/"
          className="flex items-center gap-2 transition-all duration-300 hover:scale-120 hover:rotate-12"
        >
          <Image
            src="/images/main-cube.png"
            alt="frozi.lol"
            width={50}
            height={50}
          />
        </Link>
      </div>

      <div className="form__main flex flex-col gap-[16px] items-center text-center justify-center md:max-w-md">
        <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
          💎 You need to be a Pro user to access this page!
        </div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Upgrade to Pro to unlock this feature and many more!
        </div>
      </div>

      <div className="form__footer">
        <div className="form__footer-text">
          Go back to <Link href="/shop">Dashboard</Link>
        </div>
      </div>
    </section>
  );
};

export default NoProPage;
