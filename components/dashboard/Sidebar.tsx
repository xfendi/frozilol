import React from "react";
import Link from "next/link";

import { GoHome } from "react-icons/go";
import { TbBrandGoogleAnalytics, TbTemplate } from "react-icons/tb";
import { MdOutlineBadge, MdLink } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPaintbrush } from "react-icons/lu";

import { tabs, proTabs } from "@/data/dashboard";

import PremiumPlate from "@/components/global/premiumPlate";
import Cube from "../global/cube";
import ProfileCard from "./ProfileCard";
import SidebarBanner from "./SidebarBanner";
import SharePageButton from "./SharePageButton";

const Sidebar = async ({
  tab,
  premium,
}: {
  tab?: string;
  premium?: boolean;
}) => {
  type TabType = (typeof tabs)[number];

  const currentTab: TabType = tabs.includes(tab as TabType)
    ? (tab as TabType)
    : "overview";

  const ICONS_SIZE = 16;

  const icons: Record<TabType, React.ReactNode> = {
    overview: <GoHome size={ICONS_SIZE} />,
    analytics: <TbBrandGoogleAnalytics size={ICONS_SIZE} />,
    customize: <LuPaintbrush size={ICONS_SIZE} />,
    badges: <MdOutlineBadge size={ICONS_SIZE} />,
    links: <MdLink size={ICONS_SIZE} />,
    templates: <TbTemplate size={ICONS_SIZE} />,
    settings: <IoSettingsOutline size={ICONS_SIZE} />,
  };

  const SidebarItem = ({ tabName }: { tabName: string }) => {
    const isActive = currentTab === tabName;

    return (
      <Link
        href={`/dashboard?tab=${tabName}`}
        prefetch={true}
        className={`sidebar__nav-link ${isActive && "active"}`}
      >
        {icons[tabName]}
        <p>{tabName.charAt(0).toUpperCase() + tabName.slice(1)}</p>
        {proTabs.includes(tabName) && (
          <span className="!ml-auto">{<PremiumPlate />}</span>
        )}
      </Link>
    );
  };

  return (
    <aside>
      <nav className="flex flex-col flex-1">
        <div className="sidebar__top">
          <Cube size={20} />
          <h1 className="text-xl font-semibold">frozi.lol</h1>
        </div>
        <div className="sidebar__nav">
          <ul>
            {tabs.map((tabName) => (
              <li key={tabName}>
                <SidebarItem tabName={tabName} />
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar__bottom">
          {!premium && (
            <SidebarBanner
              title="Get Premium"
              subtitle="Upgrade your account and enjoy new features"
              content={
                <Link
                  href="/shop/premium"
                  className="btn-opacity !bg-[rgba(255,102,178,0.75)] hover:!bg-[rgba(255,102,178,0.85)] !rounded-[8px]"
                >
                  Buy Now
                </Link>
              }
            />
          )}
          <SharePageButton />
          <ProfileCard />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
