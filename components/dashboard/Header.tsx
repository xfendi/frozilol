import { headerContent } from "@/data/dashboard";
import React from "react";

const Header = ({ tab }: { tab?: string }) => {
  const content = headerContent.find((c) => c.name === tab);

  return (
    <header>
      <div className="header_text">
        <div className="feature-title max-w-sm text-xl font-semibold">
          {content && content.title}
        </div>
        <div className="text-[16px] !font-light !text-stone-500">
          {content && content.subtitle}
        </div>
      </div>
    </header>
  );
};

export default Header;
