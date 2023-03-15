import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAR37z6z4sz6_SCXwQNUr8rcV01yforIY8",
  authDomain: "kolfe-guenet-website.firebaseapp.com",
  projectId: "kolfe-guenet-website",
  storageBucket: "kolfe-guenet-website.appspot.com",
  messagingSenderId: "278657560466",
  appId: "1:278657560466:web:a7edb59f840d345c14db4b",
  measurementId: "G-ZD8JB1V5F8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase authentication
export const auth = getAuth(app);

export const storage = getStorage(app);
