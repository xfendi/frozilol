"use client";

import { useContext, useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import { auth, db } from "@/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password, username, promoCode) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    let userDoc = {
      uid: userCredential.user.uid,
      createdAt: new Date(),
      email: email,
      promoCode,
      username,
    };

    setDoc(doc(db, "profiles", username), userDoc);
    updateProfile(userCredential.user, {
      displayName: username,
    });

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
