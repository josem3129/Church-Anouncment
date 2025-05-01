// JS/auth.js

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(error => {
      console.error("Google sign-in error:", error);
      alert("Sign-in failed.");
    });
  }
  
  function signOut() {
    firebase.auth().signOut().then(() => {
      location.reload();
    });
  }
  
  firebase.auth().onAuthStateChanged(user => {
    const loginSection = document.getElementById("loginSection");
    const adminPanel = document.getElementById("adminPanel");
  
    if (user && user.email === "josem3129@gmail.com") { // UPDATE THIS EMAIL
      loginSection.style.display = "none";
      adminPanel.style.display = "block";
      loadAnnouncements();
    } else {
      loginSection.style.display = "block";
      adminPanel.style.display = "none";
    }
  });
  