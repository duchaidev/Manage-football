// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAP4mYq6sLjpe2UiQaV9x6l8EeO2gj__Ls",
  authDomain: "book-football.firebaseapp.com",
  projectId: "book-football",
  storageBucket: "book-football.appspot.com",
  messagingSenderId: "95882647362",
  appId: "1:95882647362:web:741f43da6cd81070e8dadb",
  measurementId: "G-W37PWF2017",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
