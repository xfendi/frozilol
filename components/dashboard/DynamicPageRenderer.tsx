"use client";

import dynamic from "next/dynamic";
import React from "react";
import NotFoundPage from "@/components/dashboard/other/notFound";
import NoProPage from "@/components/dashboard/other/noPro";
import { proTabs, soonTabs, tabs } from "@/data/dashboard";
import SoonPage from "./other/soonPage";

const CustomizePage = dynamic(() => import("@/app/dashboard/pages/customize"), {
  ssr: false,
});
const LinksPage = dynamic(() => import("@/app/dashboard/pages/links"), {
  ssr: false,
});
const SettingsPage = dynamic(() => import("@/app/dashboard/pages/settings"), {
  ssr: false,
});

type TabType = (typeof tabs)[number];

const PageRenderer = ({ tab, isPro }: { tab: string; isPro: boolean }) => {
  const currentTab: TabType = tabs.includes(tab as TabType)
    ? (tab as TabType)
    : "overview";

  const pages: Record<TabType, React.ReactNode> = {
    customize: <CustomizePage />,
    links: <LinksPage />,
    settings: <SettingsPage />,
  };

  let pageToRender;

  if (soonTabs.includes(currentTab)) {
    console.log("page is coming soon");
    pageToRender = <SoonPage />;
  } else {
    pageToRender = pages[currentTab] ?? <NotFoundPage />;
  }

  if (proTabs.includes(currentTab) && !isPro) {
    pageToRender = <NoProPage />;
  }

  return pageToRender;
};

export default PageRenderer;
