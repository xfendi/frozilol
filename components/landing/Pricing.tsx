import { plans } from "@/data/plans";
import Link from "next/link";
import React from "react";

import { LuCheck } from "react-icons/lu";

const Pricing = () => {
  return (
    <section data-aos="fade-up">
      <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
        💸 Explore our exclusive plans
      </div>
      <div className="section-description !text-stone-500 text-md sm:text-xl">
        Become a part of a growing community of creators & storytellers. Get{" "}
        <br />
        access to exclusive features, priority support, and more with our <br />
        premium plans. Choose the plan that suits you best and start building{" "}
        <br />
        your unique bio-page today!
      </div>
      <div className="section-main flex md:flex-row flex-col gap-[32px]">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative feature card flex-1 flex flex-col justify-between gap-8 ${
              plan.name === "Premium" && ""
            }`}
          >
            <div className="flex flex-col gap-8">
              <div className="feature-title max-w-sm text-2xl font-bold">
                {plan.name}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-[8px]">
                  <div className="feature-price text-4xl font-bold">
                    ${plan.price}
                  </div>
                  <div className="text-xl !font-light !text-stone-500">
                    /Lifetime
                  </div>
                </div>
                <div className="text-xl !font-light !text-stone-500">
                  {plan.description}
                </div>
              </div>
              <div className="text-xl !font-light !text-stone-500">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="!mb-2 last:!mb-0 flex items-center gap-2"
                  >
                    <div className="text-primary">
                      <LuCheck size={20} />
                    </div>

                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/register" className="btn-primary w-full !mt-4">
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
