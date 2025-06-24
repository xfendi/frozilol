import Image from "next/image";
import Link from "next/link";
import React from "react";

const LeaderboardHero = () => {
  return (
    <section className="relative hero-box justify-center items-center text-center">
      <Image
        src="/images/banner.png"
        alt="Leaderboard Banner"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full !h-full object-cover -z-50 overflow-hidden"
      />
      <div className="absolute inset-0 bg-[rgba(15,15,18,0.7)] -z-40 h-full overflow-hidden" />

      <div
        className="text-5xl sm:text-6xl font-extrabold max-w-5xl"
        style={{ letterSpacing: "3px" }}
      >
        Take a look at our most <br />
        famous Bio-Pages 🎖️
      </div>
      <div className="!text-stone-500 text-xl sm:text-2xl sm:w-2/3 max-w-screen">
        We proudly showcase the top 10 most viewed Bio- <br />
        Pages, highlighting the most popular profiles.
      </div>
      <Link href="/leaderboard" className="btn-primary">
        Leaderboard
      </Link>
    </section>
  );
};

export default LeaderboardHero;
