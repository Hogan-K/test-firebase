// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"  // Firestore Database

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAskHx5JsHuO3UfTHW6A3IkT4918stf7NM",
    authDomain: "test-firebase-ebb7c.firebaseapp.com",
    projectId: "test-firebase-ebb7c",
    storageBucket: "gs://test-firebase-ebb7c.appspot.com",
    messagingSenderId: "611706946632",
    appId: "1:611706946632:web:5ad334094403066416847d",
    measurementId: "G-R9WQ45LZ81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)  // Analytics
const db = getFirestore(app)    // Firestore Database

export { analytics, db, auth, firebaseConfig, storage }
