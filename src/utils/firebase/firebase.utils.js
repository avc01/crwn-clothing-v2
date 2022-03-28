// Imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP4gHjgbVUmDepV7CEjZsXhw7A3PUgv10",
  authDomain: "crown-clothing-db-2aac0.firebaseapp.com",
  projectId: "crown-clothing-db-2aac0",
  storageBucket: "crown-clothing-db-2aac0.appspot.com",
  messagingSenderId: "151545244321",
  appId: "1:151545244321:web:41ce747004c33af0ab1ee0",
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Auths Exports
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore Exports
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
