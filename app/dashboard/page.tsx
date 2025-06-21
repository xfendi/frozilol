import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/firebase-admin";
import { getServerUser } from "@/lib/data/getServerUser";
import { proTabs, tabs } from "@/data/dashboard";

import NotFoundPage from "@/components/dashboard/other/notFound";
import NoProPage from "@/components/dashboard/other/noPro";
import Sidebar from "@/components/dashboard/Sidebar";

import OverviewPage from "./pages/overview";
import SettingsPage from "./pages/settings";

import "@/styles/dashboard.css";
import Header from "@/components/dashboard/Header";

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

  const docRef = db.collection("profiles").doc(user?.displayName!);
  const docSnap = await docRef.get();
  const userData = docSnap.data();

  const isPro = userData?.premium || false;

  type TabType = (typeof tabs)[number];

  const currentTab: TabType = tabs.includes(tab as TabType)
    ? (tab as TabType)
    : "overview";

  const pages: Record<TabType, React.ReactNode> = {
    overview: <OverviewPage />,
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
      <Header />
      <Sidebar tab={tab} />
      <main className="scrollable-div">{pageToRender}</main>
    </div>
  );
};

export default Dashboard;
