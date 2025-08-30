// Handle Sign Up
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const errorMessage = document.getElementById("signup-error-message");

    // Check if passwords match
    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match";
      return;
    }

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up successfully
        alert("Sign up successful! Please log in.");
        window.location.href = "./LoginPage.html";
      })
      .catch((error) => {
        // Handle errors
        errorMessage.textContent = error.message;
      });
  });
}

// Handle Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("login-error-message");

    // Sign in with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in successfully
        window.location.href = "../components/DashboardPage.html"; // Redirect to the dashboard
      })
      .catch((error) => {
        // Handle errors
        errorMessage.textContent = error.message;
      });
  });
}

// Check if user is already logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log("User is logged in:", user.email);
  } else {
    // User is signed out
    console.log("No user is signed in");
  }
});