import os
f = open('src/context/AuthContext.tsx', encoding='utf-8')
c = f.read()
f.close()

import_statement = """import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMj45IV8LXuOArD2DgtwvfB841dzcn620",
  authDomain: "tn-futecx.firebaseapp.com",
  projectId: "tn-futecx",
  storageBucket: "tn-futecx.firebasestorage.app",
  messagingSenderId: "884450104101",
  appId: "1:884450104101:web:eae68a54cdee6078f300cc",
  measurementId: "G-TNYE4ZSD3C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);"""

new_statement = """import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";"""

c = c.replace(import_statement, new_statement)

open('src/context/AuthContext.tsx', 'w', encoding='utf-8').write(c)
print("AuthContext fixed")
