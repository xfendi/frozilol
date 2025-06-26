import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { getServerProfile } from "@/lib/data/getServerProfile";
import { getServerUser } from "@/lib/data/getServerUser";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import PageRenderer from "@/components/dashboard/DynamicPageRenderer";

import "@/styles/dashboard.css";

export const metadata: Metadata = {
  title: "frozi.lol | Dashboard",
};

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

const Dashboard = async ({ searchParams }: Props) => {
  console.log("Loading dashboard ... 🚀");

  const { tab } = await searchParams;

  const [profileData] = await Promise.all([
    getServerUser().then((u) => (u ? getServerProfile(u.uid) : null)),
  ]);

  if (!profileData) {
    redirect("/auth/login");
  }

  const isPro = profileData?.premium || false;

  if (!tab) {
    redirect("/dashboard?tab=overview");
  }

  return (
    <div className="app admin flex flex-row">
      <Header tab={tab} />
      <Sidebar tab={tab} premium={isPro} />
      <main className="scrollable-div">
        <PageRenderer tab={tab} isPro={isPro} />
      </main>
    </div>
  );
};

export default Dashboard;
