// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbS5udoox-xTE62KMCKUpliRVgwu1nmKQ",
  authDomain: "carbon-footprint-emulator.firebaseapp.com",
  projectId: "carbon-footprint-emulator",
  storageBucket: "carbon-footprint-emulator.firebasestorage.app",
  messagingSenderId: "1009008538827",
  appId: "1:1009008538827:web:2ab4c6c37785c5a35c174e",
  measurementId: "G-4KJDK6KXZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);