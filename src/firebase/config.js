// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9BLfqwaoOqkZbIQmYQwXVWzvHKLf-t9Q",
  authDomain: "proyectobd-43772.firebaseapp.com",
  projectId: "proyectobd-43772",
  storageBucket: "proyectobd-43772.appspot.com",
  messagingSenderId: "931378964513",
  appId: "1:931378964513:web:d3f9c88f7503c927021b60",
  measurementId: "G-72HLM1Z7SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });