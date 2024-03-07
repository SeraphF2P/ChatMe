// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatme-5e225.firebaseapp.com",
  projectId: "chatme-5e225",
  storageBucket: "chatme-5e225.appspot.com",
  messagingSenderId: "257047329475",
  appId: "1:257047329475:web:d222935ba9ff978f190076"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

export const storeUser = async (values: {
  userId: string;
  username: string;
  email: string;
}) => {
  await setDoc(doc(db, "users", values.userId), values)
}
export const createUser = async ({ email, password }: { username?: string, email: string, password: string }) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}