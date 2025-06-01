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

// Add a new announcement to Firestore, including user ID and time, and check for conflicts
async function addAnnouncementToFirestore(date, startTime, endTime, text) {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : null;

  // Check if there's already an event at the same date and time overlap
  const conflictQuery = await db.collection("announcements")
    .where("date", "==", date)
    .get();

  const hasConflict = conflictQuery.docs.some(doc => {
    const existing = doc.data();
    return (
      (startTime < existing.endTime && endTime > existing.startTime)
    );
  });

  if (hasConflict) {
    throw new Error("An announcement already exists during this time range.");
  }

  return db.collection("announcements").add({
    date,
    startTime,
    endTime,
    text,
    userId,
    createdAt: new Date()
  });
}
