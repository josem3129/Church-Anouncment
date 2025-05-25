// JS/signout.js

function createSignOutButton() {
  const button = document.createElement("button");
  button.textContent = "Sign Out";
  button.style.margin = "1em";
  button.onclick = async () => {
    await firebase.auth().signOut();
    window.location.href = "login.html";
  };
  document.body.insertBefore(button, document.body.firstChild);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) createSignOutButton();
});
