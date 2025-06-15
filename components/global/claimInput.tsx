"use client";

import Link from "next/link";
import React from "react";

const ClaimInput = () => {
  const [username, setUsername] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const formatedUsername = username.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex md:flex-row flex-col gap-[16px] items-center scale-110">
      <div className="input_body">
        <span>frozi.lol/</span>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={handleInputChange}
          className="focus:outline-none"
          maxLength={20}
        />
      </div>
      <Link
        href={`/auth/register?username=${formatedUsername}`}
        className="btn-primary md:w-max w-full"
      >
        Claim Now
      </Link>
    </div>
  );
};

export default ClaimInput;
