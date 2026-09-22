// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function createFloatingHearts() {
  const bg = document.getElementById('bgHearts');
  if (!bg) return;

  const heartCount = 20;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');

    const size     = Math.random() * 1.8 + 1.2;
    const left     = Math.random() * 100;
    const top      = Math.random() * 100;
    const delay    = Math.random() * 12;
    const duration = Math.random() * 8 + 8;

    // random pink-ish / lavender-ish tint
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
//  COUNTDOWN (counting UP from August 28)
// ============================================================
// JavaScript months are 0-indexed: 0 = Jan, 7 = Aug, 11 = Dec.
// Format: new Date(year, month, day, hours, minutes, seconds)
//
// Aug 28 of THIS year:
const startDate = new Date(new Date().getFullYear(), 7, 28, 0, 0, 0);
//
// Aug 28 of LAST year (uncomment if needed):
// const startDate = new Date(new Date().getFullYear() - 1, 7, 28, 0, 0, 0);
//
// Fixed year (uncomment if needed):
// const startDate = new Date(2025, 7, 28, 0, 0, 0);

const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

let lastSecond = null;

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const diff = new Date() - startDate;

  // If the date is in the future, show zeros instead of negatives
  if (diff < 0) {
    daysEl.textContent    = '00';
    hoursEl.textContent   = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent    = String(days).padStart(2, '0');
  hoursEl.textContent   = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');

  // pulse the seconds digit only when it changes
  if (lastSecond !== seconds) {
    secondsEl.textContent = String(seconds).padStart(2, '0');
    secondsEl.classList.remove('pulse');
    void secondsEl.offsetWidth; // force reflow to restart animation
    secondsEl.classList.add('pulse');
    lastSecond = seconds;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
//  SCROLL REVEAL (works for note, things, timeline, promise)
// ============================================================
(function scrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Fallback: if IntersectionObserver isn't available, just show them
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
    const targetId = this.getAttribute('href');

    // Only prevent default if the target actually exists on the page
    const target = targetId === '#home'
      ? document.body
      : document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    if (targetId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});