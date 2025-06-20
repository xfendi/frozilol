import Cube from "@/components/global/cube";
import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <section
      className="form__section flex flex-col gap-[32px] items-center justify-center w-full h-screen"
      data-aos="fade-up"
    >
      <div className="form__top">
        <Cube size={50} />
      </div>

      <div className="form__main flex flex-col gap-[16px] items-center text-center justify-center md:max-w-md">
        <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
          ✅ Transaction Success
        </div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Your transaction was successful! Thank you for your purchase. If you
          have any questions or need assistance, feel free to contact our
          support team.
        </div>
      </div>

      <div className="form__footer">
        <div className="form__footer-text">
          Enjoy your new product on <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
