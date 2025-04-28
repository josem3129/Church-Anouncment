const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function renderDaysOfWeek() {
  const calendar = document.getElementById('calendar');
  
  // Create day names
  daysOfWeek.forEach(day => {
    const dayName = document.createElement('div');
    dayName.classList.add('day-name');
    dayName.textContent = day;
    calendar.appendChild(dayName);
  });
}



let announcements = JSON.parse(localStorage.getItem('announcements')) || [
  { date: '2025-04-28', text: 'Sunday service at 10am' },
  { date: '2025-05-02', text: 'Youth group meeting on Friday at 6pm' },
  { date: '2025-05-01', text: 'Bible study on Wednesday evening' }
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  const monthNameDiv = document.getElementById('monthName');
  calendar.innerHTML = ''; // Clear everything

  renderDaysOfWeek(); // Add day names

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  monthNameDiv.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Add blank spaces before 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'day empty';
    calendar.appendChild(emptyDiv);
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    dayDiv.innerHTML = `<div class="day-number">${day}</div>`;

    announcements.forEach(event => {
      if (event.date === dateStr) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.textContent = event.text;
        dayDiv.appendChild(eventDiv);
      }
    });

    calendar.appendChild(dayDiv);
  }
}

function changeMonth(direction) {
  currentMonth += direction;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  renderCalendar();
}

// Initial render
renderCalendar();