import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGMtURXEEmPGLeuYTnPBcZBgL9Lx9j3qs",
  authDomain: "kolfe-guenet.firebaseapp.com",
  projectId: "kolfe-guenet",
  storageBucket: "kolfe-guenet.appspot.com",
  messagingSenderId: "831427593276",
  appId: "1:831427593276:web:b8824608c6d71999c3af39",
  measurementId: "G-QT58SY0ZRR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
