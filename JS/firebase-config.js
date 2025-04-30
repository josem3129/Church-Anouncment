// Import Firebase libraries (these must be in your HTML file separately)
const firebaseConfig = {
  apiKey: "AIzaSyDk87piSwr4UD-hq6ClYdsQxt7I6LLiks4",
  authDomain: "church-calendar-barrio-14.firebaseapp.com",
  projectId: "church-calendar-barrio-14",
  storageBucket: "church-calendar-barrio-14.firebasestorage.app",
  messagingSenderId: "262098687337",
  appId: "1:262098687337:web:2aea00eff8ef7decea99f8"
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