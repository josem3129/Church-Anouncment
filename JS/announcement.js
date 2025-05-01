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
        <strong>${data.date}</strong> — ${data.text}
        <button onclick="editAnnouncement('${doc.id}', '${data.date}', '${data.text.replace(/'/g, "\'")}')">Edit</button>
        <button onclick="deleteAnnouncement('${doc.id}')">Delete</button>
      `;
      list.appendChild(item);
    });
  }
  
  // Submit new or edited announcement
  async function submitAnnouncement() {
    const id = document.getElementById("announcementId").value;
    const date = document.getElementById("eventDate").value;
    const text = document.getElementById("newAnnouncement").value.trim();
  
    if (!date || !text) return alert("Date and text are required.");
  
    if (id) {
      await db.collection("announcements").doc(id).update({ date, text });
      alert("Announcement updated.");
    } else {
      await db.collection("announcements").add({ date, text });
      alert("Announcement added.");
    }
  
    document.getElementById("announcementId").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("newAnnouncement").value = "";
    loadAnnouncements();
  }
  
  // Populate form for editing
  function editAnnouncement(id, date, text) {
    document.getElementById("announcementId").value = id;
    document.getElementById("eventDate").value = date;
    document.getElementById("newAnnouncement").value = text;
  }
  
  // Delete announcement
  async function deleteAnnouncement(id) {
    if (confirm("Are you sure you want to delete this announcement?")) {
      await db.collection("announcements").doc(id).delete();
      loadAnnouncements();
    }
  }
  