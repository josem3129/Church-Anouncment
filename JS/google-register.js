// JS/google-register.js

const auth = firebase.auth();
// const db = firebase.firestore();

firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    alert("You must be signed in with Google to complete registration.");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("googleRegisterForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const organization = document.getElementById("organization").value;

    try {
      await db.collection("users").doc(user.uid).set({
        firstName,
        lastName,
        email: user.email,
        organization,
        createdAt: new Date()
      });
      alert("Registration complete!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error saving user profile:", error);
      alert("Failed to complete registration. Try again.");
    }
  });
});
