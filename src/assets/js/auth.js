import { auth } from "../../firebase/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Handle Sign Up
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const errorMessage = document.getElementById("signup-error-message");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign up successful! Please log in.");
      window.location.href = "./LoginPage.html";
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
}

// Handle Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("login-error-message");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "../index.html"; // Redirect to the main app page
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
}