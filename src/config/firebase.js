import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAJtf_FEm8gT18sJUafahLRVeNixORX7ww",
  authDomain: "react-firebase-4068c.firebaseapp.com",
  projectId: "react-firebase-4068c",
  storageBucket: "react-firebase-4068c.appspot.com",
  messagingSenderId: "108985064515",
  appId: "1:108985064515:web:110370e66a3a87209608f6",
  measurementId: "G-0XJNXRVJ41"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);


