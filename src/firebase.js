import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCuLP6C96oVUhlqpyqSTiqyS0ei6g_CqB8",
  authDomain: "itc-micro-blogging.firebaseapp.com",
  projectId: "itc-micro-blogging",
  storageBucket: "itc-micro-blogging.appspot.com",
  messagingSenderId: "650131325643",
  appId: "1:650131325643:web:f9aa92deed0354ce06514e",
  measurementId: "G-XEH0W12DEE"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);