import React from "react";

const Text = () => {
  return (
    <section data-aos="fade-up">
      <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
        📜 Terms Of Service
      </div>
      <div className="section-description !text-stone-500 text-md sm:text-xl">
        Welcome to frozi.lol! By accessing or using our website and services,{" "}
        <br />
        you agree to these Terms of Service ("Terms"). If you're not cool with{" "}
        <br />
        them — no hard feelings, but you shouldn't use the platform.
      </div>
      <div className="section-main gap-[32px] flex flex-col">
        <div className="text-xl">Acceptance of Terms</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          By using frozi.lol, you agree to be bound by these Terms and our
          Privacy Policy. If you don't agree with anything here, please don’t
          use our services.
        </div>

        <div className="text-xl">Who Can Use It</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          You must be at least 13 years old to use frozi.lol. If you're under
          13, you'll need permission from a parent or guardian. You're fully
          responsible for anything you do on the site.
        </div>

        <div className="text-xl">Your Account</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Using our platform require you to create an account. Keep your login
          info private — you’re responsible for everything that happens on your
          account. If something shady goes down, let us know ASAP.
        </div>

        <div className="text-xl">User Conduct</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Don’t be a jerk. It’s forbidden to: Post illegal or offensive content,
          Spam, Violate copyrights or intellectual property, Hack or exploit the
          service. Respect others and keep it clean.
        </div>

        <div className="text-xl">Content Ownership</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          All content on frozi.lol (unless otherwise noted) is ours or used with
          permission. Don’t copy, reproduce, or redistribute it without consent.
        </div>

        <div className="text-xl">User Content</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          If you upload or post anything to frozi.lol (like posts, comments, or
          files), you still own it — but you're giving us the right to display
          and share it within our platform.
        </div>

        <div className="text-xl">Service Changes</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          frozi.lol might change from time to time — we might add new stuff,
          remove features, or shut things down. We reserve the right to do this
          without prior notice.
        </div>

        <div className="text-xl">Limitation of Liability</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          We’re not liable for: Data loss, Service interruptions, Any damage
          caused by using our services. Use at your own risk — though we do our
          best to keep everything running smooth.
        </div>

        <div className="text-xl">Third-Party Links</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          We might link to external websites. We’re not responsible for anything
          that happens on those sites.
        </div>

        <div className="text-xl">Changes to the Terms</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          We can update these Terms at any time. If we do, we’ll let you know
          (via email or on the discord server). Continuing to use frozi.lol
          means you accept the new version.
        </div>

        <div className="text-xl">Contact</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Questions? Hit us up at{" "}
          <a href="https://dc.frozi.lol/" className="!text-blue-400">
            our discord server
          </a>
        </div>

        <div className="text-xl">
          Thanks for using frozi.lol. Stay chill and have fun! 🚀
        </div>
      </div>
    </section>
  );
};

export default Text;
