import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/firebase-admin";
import { getServerUser } from "@/lib/data/getServerUser";
import { proTabs, tabs } from "@/data/dashboard";
import OverviewPage from "./pages/overview";
import NotFoundPage from "@/components/dashboard/other/notFound";
import NoProPage from "@/components/dashboard/other/noPro";

import "@/styles/dashboard.css";
import Sidebar from "@/components/dashboard/Sidebar";

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
  };

  let pageToRender = pages[currentTab];

  if (!pages[currentTab]) {
    pageToRender = <NotFoundPage />;
  } else if (proTabs.includes(currentTab) && !isPro) {
    pageToRender = <NoProPage />;
  }

  return (
    <div className="app flex flex-row">
      <Sidebar tab={tab} />
      <main className="scrollable-div">{pageToRender}</main>
    </div>
  );
};

export default Dashboard;
