import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMj45IV8LXuOArD2DgtwvfB841dzcn620",
  authDomain: "tn-futecx.firebaseapp.com",
  projectId: "tn-futecx",
  storageBucket: "tn-futecx.firebasestorage.app",
  messagingSenderId: "884450104101",
  appId: "1:884450104101:web:eae68a54cdee6078f300cc",
  measurementId: "G-TNYE4ZSD3C"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
