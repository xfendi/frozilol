import React from "react";

interface LoaderProps {
  big?: boolean;
  white?: boolean;
  type?: "apple" | "spinner";
}

const Loader: React.FC<LoaderProps> = ({ big, white, type }) => {
  if (!type) {
    return (
      <div
        className={`loader mx-auto ${big && "big"} ${white && "white"}`}
      ></div>
    );
  } else if (type === "apple") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="relative w-[60px] h-[60px]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-10 h-5 bg-blue-500 rounded-full"
              style={{
                transform: `rotate(${i * 45}deg) translate(50px)`,
                animation: `fade 1s infinite ease-in-out`,
                animationDelay: `${i * 0.15}s`,
              }}
            ></div>
          ))}
        </div>

        <style>
          {`
          @keyframes fade {
            0% { opacity: 1; }
            100% { opacity: 0.1; }
          }
        `}
        </style>
      </div>
    );
  }
};

export default Loader;