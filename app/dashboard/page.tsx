"use client";

import React from "react";

import { ProfileData } from "@/context/profileContext";

const Dashboard = () => {
  const { profile } = ProfileData();
  console.log("Profile data:", profile);
  return <div>Hi, {profile.username}!</div>;
};

export default Dashboard;
