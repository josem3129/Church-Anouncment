// JS/login.js

const auth = firebase.auth();
// const db = firebase.firestore();

// Email login form
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Error: " + error.message);
  }
});

// Google sign-in
const googleSignInBtn = document.getElementById("googleSignInBtn");
googleSignInBtn.addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    const userDoc = await db.collection("users").doc(user.uid).get();
    if (!userDoc.exists) {
      // Redirect to complete Google registration
      window.location.href = "google-register.html";
      return;
    }

    alert("Signed in successfully!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Google sign-in error:", error);
    alert("Error: " + error.message);
  }
});
