import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxxyXqJuRFJd1p_QuPAAUrwXRTFTfj3Zg",
  authDomain: "frozilol.firebaseapp.com",
  projectId: "frozilol",
  storageBucket: "frozilol.firebasestorage.app",
  messagingSenderId: "212967781960",
  appId: "1:212967781960:web:8a99ee107967786ea2ca7d",
  measurementId: "G-R986G0M9KT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
