// JS/register.js

const auth = firebase.auth();
// const db = firebase.firestore();

// Register with email and password
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const organization = document.getElementById("organization").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;
    await db.collection("users").doc(uid).set({
      firstName,
      lastName,
      email,
      organization,
      createdAt: new Date()
    });
    alert("Registration successful!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Registration error:", error);
    alert("Error: " + error.message);
  }
});
