async function addAnnouncement() {
    const date = document.getElementById('eventDate').value;
    const text = document.getElementById('newAnnouncement').value.trim();
  
    if (date && text) {
      await addAnnouncementToFirestore(date, text);
      alert('Announcement added!');
    } else {
      alert('Please enter a date and announcement.');
    }
  }