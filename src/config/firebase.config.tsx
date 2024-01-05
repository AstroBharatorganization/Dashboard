// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAL0_DqSCgiObI-Bgl7of15NF__KuGsUvE",
  authDomain: "astro-bharat.firebaseapp.com",
  projectId: "astro-bharat",
  storageBucket: "astro-bharat.appspot.com",
  messagingSenderId: "661687025883",
  appId: "1:661687025883:web:315aba186aa3039a648cfe",
  measurementId: "G-JSBXTGLX1X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
