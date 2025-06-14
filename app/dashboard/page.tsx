import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/firebase-admin";
import { getServerUser } from "@/lib/data/getServerUser";

const Dashboard = async () => {
  const user = await getServerUser();

  if (!user) {
    redirect("/auth/login");
  }

  const docRef = db.collection("profiles").doc(user?.displayName!);
  const docSnap = await docRef.get();
  const userData = docSnap.data();

  return <div>{userData?.username}</div>;
};

export default Dashboard;
