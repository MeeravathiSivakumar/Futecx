f = open('src/app/admin/page.tsx', encoding='utf-8')
c = f.read()
f.close()

old_code = """import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDMj45IV8LXuOArD2DgtwvfB841dzcn620",
  authDomain: "tn-futecx.firebaseapp.com",
  projectId: "tn-futecx",
  storageBucket: "tn-futecx.firebasestorage.app",
  messagingSenderId: "884450104101",
  appId: "1:884450104101:web:eae68a54cdee6078f300cc",
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);"""

new_code = """import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";"""

c = c.replace(old_code, new_code)
open('src/app/admin/page.tsx', 'w', encoding='utf-8').write(c)
print('Done')
