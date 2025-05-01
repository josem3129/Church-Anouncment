// Import Firebase libraries (these must be in your HTML file separately)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "xxx",
    appId: "your-app-id"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch all announcements
async function fetchAnnouncements() {
  const snapshot = await db.collection('announcements').get();
  return snapshot.docs.map(doc => doc.data());
}

// Add a new announcement
async function addAnnouncementToFirestore(date, text) {
  return db.collection('announcements').add({ date, text });
}