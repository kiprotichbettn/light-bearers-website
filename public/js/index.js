document.addEventListener('DOMContentLoaded', () => {
  // Debook API URL 
  const ebookApiUrl = "/api/ebooks";

  
  const currentHour = new Date().getHours();
  let greetingMessage = "Good Day!";

  if (currentHour < 12) {
    greetingMessage = "Good Morning!";
  } else if (currentHour < 18) {
    greetingMessage = "Good Afternoon!";
  } else {
    greetingMessage = "Good Evening!";
  }

  document.getElementById("greeting").textContent = 
    greetingMessage + " Welcome to Light Bearers website where we empower Youth for Social, Economic, and Academic Growth";

   const programDetails = {
    academic: "Our Academic Support program helps students with tutoring, study groups, and test prep.",
    career: "Our Career Development program offers workshops on resumes, interviews, and job search strategies.",
    community: "We organize community outreach programs to help students give back and engage with their local area.",
    mentorship: "Our Mentorship program pairs students with industry professionals to guide their career paths."
  };

  // Relevant program details
  document.querySelectorAll('.program-btn').forEach(button => {
    button.addEventListener('click', function() {
      const programType = this.getAttribute('data-program');
      const programText = programDetails[programType] || "Details not found.";
      document.getElementById('program-details').textContent = programText;
    });
  });

  // Fetch Bible Verse
  async function getBibleVerse() {
    try {
      const response = await fetch("/api/bible-verse");
      const data = await response.json();

      if (data && data.verse) {
        document.getElementById("bible-verse").textContent = `"${data.verse}"`;
        document.getElementById("bible-reference").textContent = data.reference;
      } else {
        document.getElementById("bible-verse").textContent = "No verse found.";
        document.getElementById("bible-reference").textContent = "";
      }
    } catch (error) {
      console.error("Error fetching Bible verse:", error);
      document.getElementById("bible-verse").textContent = "Failed to load verse.";
      document.getElementById("bible-reference").textContent = "";
    }
  }
  getBibleVerse();

  // Fetch eBooks
  const ebookList = document.getElementById("ebook-list");
  const loadingMsg = document.getElementById("loading-msg");

  fetch(ebookApiUrl)
    .then(response => response.json())
    .then(data => {
      if (loadingMsg) loadingMsg.remove();

      if (data && data.ebooks && Array.isArray(data.ebooks)) {
        data.ebooks.forEach(book => {
          const bookItem = document.createElement("li");
          const bookLink = document.createElement("a");

          bookLink.href = `https://www.gutenberg.org/ebooks/${book.id}`;
          bookLink.textContent = book.title;
          bookLink.target = "_blank";
          bookLink.rel = "noopener noreferrer";

          bookItem.appendChild(bookLink);
          ebookList.appendChild(bookItem);
        });
      } else {
        ebookList.innerHTML = "<li>No eBooks found.</li>";
      }
    })
    .catch(error => {
      console.error('Error fetching eBooks:', error);
      if (loadingMsg) loadingMsg.textContent = "Failed to load eBooks.";
    });

  // Fetch YouTube videos
  fetch('/api/videos')
    .then(res => res.json())
    .then(playlists => {
      playlists.forEach((playlist, index) => {
        const containerId = `playlist-${index + 1}`;
        const container = document.getElementById(containerId);
        if (!container) return;

        playlist.videos.forEach(video => {
          const videoLink = document.createElement('a');
          videoLink.href = `https://www.youtube.com/watch?v=${video.videoId}`;
          videoLink.target = '_blank';
          videoLink.rel = 'noopener noreferrer';

          videoLink.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" style="width: 100%; max-width: 300px;" />
            <p>${video.title}</p>
          `;

          container.appendChild(videoLink);
        });
      });
    })
    .catch(err => {
      console.error('Error loading videos:', err);
    });

    // Urgent Announcement 
  const urgentBanner = document.getElementById('urgent-banner');
  const urgentText = document.getElementById('urgent-text');
  const closeUrgent = document.getElementById('close-urgent');

  const urgentAnnouncement = "Registration closes this Friday! Hurry and sign up now.";

  if (urgentAnnouncement) {
    urgentText.textContent = urgentAnnouncement;
    urgentBanner.style.display = "flex";
  }

  closeUrgent.addEventListener('click', () => {
    urgentBanner.style.display = "none";
  });

  // Upcoming Events and Announcements
  const events = [
    {
      title: "Student Leadership Summit",
      date: "2025-08-14",
      description: "A day-long workshop to build leadership skills and network with peers.",
      type: "event"
    },
    {
      title: "Mentorship Program Kickoff",
      date: "2025-08-20",
      description: "Meet your mentors and set your goals for the semester.",
      type: "event"
    },
    {
      title: "📢 Final Call for Registration",
      date: "2025-08-10",
      description: "Today is the last day to register for summer programs.",
      type: "announcement"
    }
  ];

  const itemsList = document.getElementById("announcement-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderItems(type) {
    itemsList.innerHTML = "";

    const filtered = type === "all" ? events : events.filter(e => e.type === type);

    if (filtered.length === 0) {
      itemsList.innerHTML = "<p>No items to show.</p>";
      return;
    }

filtered.forEach(item => {
  const li = document.createElement("li");

  let content = `
    <strong>${item.title}</strong> <br />
    <small>${item.date}</small><br/>
    <p>${item.description}</p>
  `;

  if (item.type === "event") {
    const startDate = item.date.replace(/-/g, ""); // format YYYYMMDD
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.title)}&dates=${startDate}/${startDate}&details=${encodeURIComponent(item.description)}`;

    content += `<br/><a href="${calendarUrl}" target="_blank" rel="noopener noreferrer">📅 Add to Google Calendar</a>`;
  }

  li.innerHTML = content;
  itemsList.appendChild(li);
});

  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filterType = btn.getAttribute("data-filter");
      renderItems(filterType);
    });
  });

  renderItems("event");
  document.querySelector('.filter-btn[data-filter="event"]')?.classList.add("active");

  
});
