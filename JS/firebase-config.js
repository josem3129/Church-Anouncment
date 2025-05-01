// firebase-config.js

// Load config from global scope set in the HTML
const firebaseConfig = window.firebaseConfig;

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch all announcements from Firestore
async function fetchAnnouncements() {
  const snapshot = await db.collection("announcements").get();
  return snapshot.docs.map(doc => doc.data());
}

// Add a new announcement to Firestore
async function addAnnouncementToFirestore(date, text) {
  return db.collection("announcements").add({ date, text });
}
