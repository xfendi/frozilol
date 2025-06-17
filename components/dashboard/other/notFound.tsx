import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <section className="flex justify-center items-center w-full h-full">
      <div
        className=" flex flex-col gap-[32px] items-center justify-center !w-max !h-max"
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
            🛠️ Page not found!
          </div>
          <div className="section-description !text-stone-500 text-md sm:text-xl">
            The page you are looking for does not exist or has been moved.
            Please check the URL or return to the dashboard.
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

export default NotFoundPage;
