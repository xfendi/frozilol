"use client";

import { useContext, useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import { auth, db } from "@/firebase";
import { getNextUserId } from "@/lib/auth/getNextUserId";
import { defaultPhotoURL } from "@/data/default";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const router = useRouter();

  const createUser = async (email, password, username, promoCode) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const nextId = await getNextUserId();

    const photoURL = defaultPhotoURL;

    let userDoc = {
      uid: userCredential.user.uid,
      createdAt: new Date(),
      email: email,
      id: nextId,
      photoURL,
      promoCode,
      username,
    };

    setDoc(doc(db, "profiles", nextId.toString()), userDoc);
    updateProfile(auth.currentUser, { photoURL });

    const idToken = await userCredential.user.getIdToken();

    await fetch("/api/auth/session-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const idToken = await user.getIdToken();

    await fetch("/api/auth/session-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (e) {
      toast.error("Error during Google login!");
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/auth/login");
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ createUser, login, handleGoogleLogin, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthData = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthData must be used within an AuthContextProvider");
  }

  return context;
};
