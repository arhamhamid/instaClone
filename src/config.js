import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider,} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9QP0d3TXPw6sAPN4RVKwZuxGg7MMsjzo",
  authDomain: "social-app-3865b.firebaseapp.com",
  projectId: "social-app-3865b",
  storageBucket: "social-app-3865b.appspot.com",
  messagingSenderId: "1030558881927",
  appId: "1:1030558881927:web:1d9bd51e15c771b53f8022"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
