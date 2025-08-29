// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbS5udoox-xTE62KMCKUpliRVgwu1nmKQ",
  authDomain: "carbon-footprint-emulator.firebaseapp.com",
  projectId: "carbon-footprint-emulator",
  storageBucket: "carbon-footprint-emulator.firebasestorage.app",
  messagingSenderId: "1009008538827",
  appId: "1:1009008538827:web:b66f9dab41d26ac15c174e",
  measurementId: "G-T7QPXHGGND"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();