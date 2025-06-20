import Cube from "@/components/global/cube";
import Link from "next/link";
import React from "react";

const CancelPage = () => {
  return (
    <section className="form__section flex flex-col gap-[32px] items-center justify-center w-full h-screen" data-aos="fade-up">
      <div className="form__top">
        <Cube size={50} />
      </div>

      <div className="form__main flex flex-col gap-[16px] items-center text-center justify-center md:max-w-md">
        <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
          ❌ Transaction Failed
        </div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Unfortunately, your transaction was not successful. Please try again
          later or contact support if the issue persists. 
        </div>
      </div>

      <div className="form__footer">
        <div className="form__footer-text">
          Try again on <Link href="/shop">Shop</Link>
        </div>
      </div>
    </section>
  );
};

export default CancelPage;
