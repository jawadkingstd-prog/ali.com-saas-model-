// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC82zs76MVa9X2cAxZZkiXUggnka-ndyd4",
  authDomain: "aaliledgersystem.firebaseapp.com",
  projectId: "aaliledgersystem",
  storageBucket: "aaliledgersystem.firebasestorage.app",
  messagingSenderId: "458612335170",
  appId: "1:458612335170:web:631adc7e3a8e443b7043db",
  measurementId: "G-P9DTGPH9J0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);