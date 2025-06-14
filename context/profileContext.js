"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { db } from "@/firebase";
import { AuthData } from "./authContext";
import { doc, onSnapshot } from "firebase/firestore";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  const { user } = AuthData();

  useEffect(() => {
    if (!user?.displayName) return;

    const profileRef = doc(db, "profiles", user.displayName);
    const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile({ ...docSnap.data() });
      }
    });

    return () => {
      unsubscribeProfile();
    };
  }, [user?.displayName]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const ProfileData = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "ProfileData must be used within an ProfileContextProvider"
    );
  }

  return context;
};
