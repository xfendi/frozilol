"use client";

import { faq } from "@/data/faq";
import Link from "next/link";
import React, { useRef, useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="!pt-0" data-aos="fade-up">
      <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
        🤔 Frequently Asked Questions
      </div>
      <div className="flex flex-col gap-[16px] items-center">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="transition-all duration-200 cursor-pointer flex flex-col w-full"
            >
              <button
                onClick={() => toggle(index)}
                className={`feature-title text-xl flex justify-between items-center w-full text-left cursor-pointer feature !py-4 !px-6 ${
                  isOpen && "!mb-[16px]"
                } transition-all duration-200`}
              >
                {item.question}
                <span
                  className={`text-[24px] transition-all duration-200 ${
                    isOpen && "rotate-45"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                ref={(el) => {
                  refs.current[index] = el;
                }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen
                    ? `${refs.current[index]?.scrollHeight}px`
                    : "0px",
                }}
              >
                <p className="text-xl !font-light !text-stone-500">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="section-description !text-stone-500 text-md sm:text-xl">
        Still have more questions? Find answers in our{" "}
        <Link
          href="/help"
          className="section-description !text-stone-500 transition-all duration-300 hover:!text-white"
        >
          Help center
        </Link>
        .
      </div>
    </section>
  );
};

export default FAQ;
