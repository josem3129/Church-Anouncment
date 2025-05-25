// JS/auth-redirect.js

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // Not logged in — redirect to login
    window.location.href = "login.html";
  }
});
