"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { db } from "@/firebase";
import { AuthData } from "./authContext";
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  const { user } = AuthData();

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      const usersRef = collection(db, "profiles");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, "profiles", querySnapshot.docs[0].id);
        const unsubscribeProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile({ ...docSnap.data() });
            console.log("Profile fetched successfully.", docSnap.data());
          }
        });

        return unsubscribeProfile;
      }
    };

    let unsubscribe;

    fetchProfile().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

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
