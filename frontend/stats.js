document.addEventListener("DOMContentLoaded", () => {
    // Simulated dynamic values — replace these with fetch() from your backend if available
    const stats = {
      totalVisitors: Math.floor(Math.random() * 200),
      currentlyInside: Math.floor(Math.random() * 50),
      frequentDept: "CSE",
      lastEntry: new Date().toLocaleTimeString(),
    };
  
    document.querySelector(".card:nth-child(1) p").textContent = stats.totalVisitors;
    document.querySelector(".card:nth-child(2) p").textContent = stats.currentlyInside;
    document.querySelector(".card:nth-child(3) p").textContent = stats.frequentDept;
    document.querySelector(".card:nth-child(4) p").textContent = stats.lastEntry;
  });
  