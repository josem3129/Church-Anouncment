// auth-calendar.js (for calendar page - silent login + email/password form)

// Create a sign-in form element
const loginForm = document.createElement("form");
loginForm.innerHTML = `
  <h3>Sign in to view the calendar</h3>
  <input type="email" id="email" placeholder="Email" required>
  <input type="password" id="password" placeholder="Password" required>
  <button type="submit">Sign In</button>
`;
loginForm.style.margin = "20px auto";
loginForm.style.maxWidth = "300px";
loginForm.style.display = "block";
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.error("Email sign-in error:", error);
      alert("Sign-in failed: " + error.message);
    });
};

// Attempt silent login for Firebase Auth
firebase.auth().onAuthStateChanged(async (user) => {
  const calendarContainer = document.getElementById("calendar");
  const monthNameDiv = document.getElementById("monthName");

  if (user) {
    console.log("✅ Signed in as", user.email);
    try {
      announcements = await fetchAnnouncements();
      renderCalendar();
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
      calendarContainer.innerHTML = "<p class='error'>Error loading calendar data.</p>";
    }
  } else {
    console.warn("No authenticated user, calendar cannot load announcements.");
    calendarContainer.innerHTML = "<p class='error'>Please sign in to view the calendar announcements.</p>";
    calendarContainer.appendChild(loginForm);
    if (monthNameDiv) monthNameDiv.textContent = "";
  }
});
