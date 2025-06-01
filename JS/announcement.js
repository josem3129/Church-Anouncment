// JS/announcement.js

// Load announcements from Firestore
async function loadAnnouncements() {
  const list = document.getElementById("announcementList");
  list.innerHTML = "Loading...";
  const snapshot = await db.collection("announcements").orderBy("date").get();
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const item = document.createElement("li");
    const data = doc.data();
    item.innerHTML = `
      <strong>${data.date}</strong> (${data.startTime} – ${data.endTime}) — ${data.text}
      <button onclick="editAnnouncement('${doc.id}', '${data.date}', '${data.startTime}', '${data.endTime}', '${data.text.replace(/'/g, "\'")})">Edit</button>
      <button onclick="deleteAnnouncement('${doc.id}')">Delete</button>
    `;
    list.appendChild(item);
  });
}

// Submit new or edited announcement
async function submitAnnouncement() {
  const id = document.getElementById("announcementId").value;
  const date = document.getElementById("eventDate").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const text = document.getElementById("newAnnouncement").value.trim();

  if (!date || !startTime || !endTime || !text) return alert("All fields are required.");
  if (endTime <= startTime) return alert("End time must be after start time.");

  if (id) {
    await db.collection("announcements").doc(id).update({ date, startTime, endTime, text });
    alert("Announcement updated.");
  } else {
    await addAnnouncementToFirestore(date, startTime, endTime, text);
    alert("Announcement added.");
  }

  document.getElementById("announcementId").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
  document.getElementById("newAnnouncement").value = "";
  loadAnnouncements();
}

// Populate form for editing
function editAnnouncement(id, date, startTime, endTime, text) {
  document.getElementById("announcementId").value = id;
  document.getElementById("eventDate").value = date;
  document.getElementById("startTime").value = startTime;
  document.getElementById("endTime").value = endTime;
  document.getElementById("newAnnouncement").value = text;
}

// Delete announcement
async function deleteAnnouncement(id) {
  if (confirm("Are you sure you want to delete this announcement?")) {
    await db.collection("announcements").doc(id).delete();
    loadAnnouncements();
  }
}
