import React from "react";

const Text = () => {
  return (
    <section data-aos="fade-up">
      <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
        📜 Privacy Policy
      </div>
      <div className="section-description !text-stone-500 text-md sm:text-xl">
        At frozi.lol, your privacy matters. This Privacy Policy explains what{" "}
        <br />
        data we collect, how we use it, and your rights. By using our site, you{" "}
        <br />
        agree to this policy.
      </div>
      <div className="section-main gap-[32px] flex flex-col">
        <div className="text-xl">What We Collect</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          When you use frozi.lol, we may collect: Account info – like your
          username, email address, and password (hashed, of course). Usage data
          – like how you use the site, what you click, what features you
          interact with. Device info – like browser type, IP address, and
          general location (nothing creepy). Cookies – little pieces of data to
          keep things running smoothly (see section 5).
        </div>

        <div className="text-xl">How We Use Your Data</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          We use your data to: Operate and improve frozi.lol Personalize your
          experience Keep the platform safe and secure Communicate with you (if
          needed) Analyze traffic and usage patterns We don’t sell your data.
          Ever.
        </div>

        <div className="text-xl">Your Rights</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          If you’re in the EU or UK (or just into privacy), you’ve got rights:
          Access the data we have on you Ask us to fix wrong info Request we
          delete your data Object to certain uses Export your data (data
          portability) Hit us up at{" "}
          <a href="https://dc.frozi.lol/" className="!text-blue-400">
            our discord server
          </a>{" "}
          to make any of these requests.
        </div>

        <div className="text-xl">Cookies</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Yeah, we use cookies – but just the useful kind: Essential cookies –
          make the site actually work Analytics cookies – help us understand how
          you use the site Optional stuff – like remembering preferences You can
          control cookies in your browser settings.
        </div>

        <div className="text-xl">How We Protect Your Data</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          We use industry-standard security to keep your data safe, including:
          Encrypted connections (HTTPS) Hashed passwords Access controls Still,
          no system is 100% bulletproof — use strong passwords and stay safe
          online.
        </div>

        <div className="text-xl">Data Retention</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          We keep your data as long as needed to provide our services or as
          required by law. You can ask us to delete your account/data anytime.
        </div>

        <div className="text-xl">hird-Party Links</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          frozi.lol might link to external sites. We’re not responsible for
          their content or privacy policies. Once you leave our site, you’re on
          their turf.
        </div>

        <div className="text-xl">Changes to This Policy</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          We might update this policy from time to time. If we do, we’ll post it
          here and/or notify you in a chill way. Keep an eye on the date at the
          top.
        </div>

        <div className="text-xl">Contact Us</div>
        <div className="section-description !text-stone-500 text-md sm:text-xl">
          Got questions or want to flex your privacy rights? Hit us up at{" "}
          <a href="https://dc.frozi.lol/" className="!text-blue-400">
            our discord server
          </a>
        </div>

        <div className="text-xl">
          Thanks for trusting frozi.lol – we’ll treat your data like we’d want
          ours to be treated: with care and respect. 💙
        </div>
      </div>
    </section>
  );
};

export default Text;
