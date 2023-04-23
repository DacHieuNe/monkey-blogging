import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkzh41hTrSN-X0foEmFK5WqiIEGUVpvDA",
  authDomain: "monkey-blogging-5daf5.firebaseapp.com",
  projectId: "monkey-blogging-5daf5",
  storageBucket: "monkey-blogging-5daf5.appspot.com",
  messagingSenderId: "163933029221",
  appId: "1:163933029221:web:100904d334a3ad9a3d178c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage();
