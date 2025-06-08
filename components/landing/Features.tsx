"use client";

import React, { useEffect } from "react";

const featuresdata = [
  {
    title: "Discord Presence",
    description:
      "Enable visitors to explore your diverse digital landscape, all within a single place. Unify your digital identity!",
    icon: "🔗",
  },
  {
    title: "Avatars & Backgrounds",
    description:
      "Bring your page to life with your avatars &amp; backgrounds. Whether its images, GIFs or videos.",
    icon: "🖼️",
  },
  {
    title: "Markdown",
    description:
      "Elevate your description with markdown. Use our easy-to-use syntax to create beautifully formatted content.",
    icon: "✍️",
  },
  {
    title: "Colors, Fonts & Cursors",
    description:
      "Choose accent colors, fonts & cursors to give your page a personalized appearance. Make it visually stunning!",
    icon: "🎨",
  },
];

const Features = () => {
  useEffect(() => {
    const updateCursor = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}`);
      document.documentElement.style.setProperty("--y", `${e.clientY}`);
    };

    document.body.addEventListener("pointermove", updateCursor);

    return () => {
      document.body.removeEventListener("pointermove", updateCursor);
    };
  }, []);

  return (
    <section data-aos="fade-up">
      <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
        👋 Simple & Intuitive
      </div>
      <div className="section-description !text-stone-500 text-md sm:text-xl">
        Our user-friendly interface ensures that anyone, regardless of technical{" "}
        <br />
        expertise, can effortlessly build & customize their bio-pages easily.{" "}
        <br />
        Showcase your creativity, experiences & interests in minutes.
      </div>
      <div className="section-main !w-full grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
        {featuresdata.map((feature, index) => (
          <div key={index} className="feature card">
            <div className="feature-icon !mb-8 flex size-16 items-center justify-center text-2xl">
              <span className="transition-all duration-300 hover:scale-120 hover:rotate-12 cursor-pointer">
                {feature.icon}
              </span>
            </div>
            <div className="feature-title !mb-4 max-w-sm text-2xl font-bold">
              — {feature.title}
            </div>
            <div className="text-xl !font-light !text-stone-500">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
