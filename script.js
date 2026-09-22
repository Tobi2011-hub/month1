// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function createFloatingHearts() {
  const bg = document.getElementById('bgHearts');
  const heartCount = 20;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');

    const size = Math.random() * 1.8 + 1.2;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 8 + 8;

    // random pink-ish color
    const g = 100 + Math.floor(Math.random() * 80);
    const b = 120 + Math.floor(Math.random() * 60);

    heart.style.left = left + '%';
    heart.style.top = top + '%';
    heart.style.fontSize = size + 'rem';
    heart.style.animationDelay = delay + 's';
    heart.style.animationDuration = duration + 's';
    heart.style.opacity = Math.random() * 0.2 + 0.08;
    heart.style.color = `rgba(255, ${g}, ${b}, 0.25)`;

    bg.appendChild(heart);
  }
})();

// ============================================================
//  COUNTDOWN (counting UP from 1 month ago)
// ============================================================
// Set your real anniversary here (year, month - 1, day):
// const startDate = new Date(2026, 7, 22); // Aug 22, 2026
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 1);

const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const diff = new Date() - startDate;

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent    = String(days).padStart(2, '0');
  hoursEl.textContent   = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
//  SCROLL REVEAL
// ============================================================
(function scrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  // if IntersectionObserver isn't supported, just show everything
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

// ============================================================
//  SMOOTH SCROLL for navbar links
// ============================================================
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});