import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_REACT_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_REACT_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_REACT_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
