import React from "react";

const Text = () => {
  return (
    <section data-aos="fade-up">
      <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
        ⁉️ Support
      </div>
      <div className="section-description !text-stone-500 text-md sm:text-xl">
        Welcome to our support page! We&quot;re here to ensure you have the best{" "}
        <br />
        experience with our service. If you have any questions, concerns or just{" "}
        <br />
        need a helping hand, there are two ways to reach us:
      </div>
      <div className="section-main gap-[32px] flex flex-col">
        <div className="text-xl">Discord</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Join our vibrant Discord community where you can connect with other
          users, share your experiences and get real-time assistance from our
          support team. <br /> <br />
          📌{" "}
          <a
            href="https://dc.frozi.lol"
            className="!underline section-description !text-stone-500 text-md sm:text-xl"
          >
            dc.frozi.lol
          </a>
        </div>

        <div className="text-xl">Email</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Prefer a more direct approach? Shoot us an email with your inquiry.
          Our support team is ready to assist you promptly.
          <br /> <br />
          📌{" "}
          <a
            href="mailto:contact@frozi.lol"
            className="!underline section-description !text-stone-500 text-md sm:text-xl"
          >
            contact@frozi.lol
          </a>
        </div>
      </div>
    </section>
  );
};

export default Text;
