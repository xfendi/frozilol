"use client";

import dynamic from "next/dynamic";
import React from "react";
import NotFoundPage from "@/components/dashboard/other/notFound";
import NoProPage from "@/components/dashboard/other/noPro";
import { proTabs, tabs } from "@/data/dashboard";

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
    links: <LinksPage />,
    settings: <SettingsPage />,
  };

  let pageToRender = pages[currentTab] ?? <NotFoundPage />;
  if (proTabs.includes(currentTab) && !isPro) {
    pageToRender = <NoProPage />;
  }

  return pageToRender;
};

export default PageRenderer;
