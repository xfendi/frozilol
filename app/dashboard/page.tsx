import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { getServerUser } from "@/lib/data/getServerUser";
import { proTabs, tabs } from "@/data/dashboard";

import NotFoundPage from "@/components/dashboard/other/notFound";
import NoProPage from "@/components/dashboard/other/noPro";
import Sidebar from "@/components/dashboard/Sidebar";

import OverviewPage from "./pages/overview";
import SettingsPage from "./pages/settings";

import "@/styles/dashboard.css";
import Header from "@/components/dashboard/Header";
import { getServerProfile } from "@/lib/data/getServerProfile";
import LinksPage from "./pages/links";

export const metadata: Metadata = {
  title: "frozi.lol | Dashboard",
};

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

const Dashboard = async ({ searchParams }: Props) => {
  const { tab } = await searchParams;
  const user = await getServerUser();

  if (!user) {
    redirect("/auth/login");
  }

  const profileData = await getServerProfile(user.uid);

  const isPro = profileData?.premium || false;

  type TabType = (typeof tabs)[number];

  const currentTab: TabType = tabs.includes(tab as TabType)
    ? (tab as TabType)
    : "overview";

  const pages: Record<TabType, React.ReactNode> = {
    overview: <OverviewPage />,
    links: <LinksPage />,
    settings: <SettingsPage />,
  };

  let pageToRender = pages[currentTab];

  if (!pages[currentTab]) {
    pageToRender = <NotFoundPage />;
  } else if (proTabs.includes(currentTab) && !isPro) {
    pageToRender = <NoProPage />;
  }

  return (
    <div className="app admin flex flex-row">
      <Header tab={tab} />
      <Sidebar tab={tab} premium={isPro} />
      <main className="scrollable-div">{pageToRender}</main>
    </div>
  );
};

export default Dashboard;
