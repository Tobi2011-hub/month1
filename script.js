// ============================================================
//  ⚙️  CONFIG
// ============================================================
const CONFIG = {
  herName: 'Simi',
  songLink: 'https://www.youtube.com/',
  secretMessage:
    "Not everyone looks for the little things. But you always do — that's one of the reasons I like you."
};

// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function () {
  const bg = document.getElementById('bgHearts');
  if (!bg) return;

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');

    const isBlush = Math.random() < 0.3;
    let r, g, b;
    if (isBlush) {
      r = 230 + Math.floor(Math.random() * 25);
      g = 160 + Math.floor(Math.random() * 40);
      b = 180 + Math.floor(Math.random() * 40);
    } else {
      r = 120 + Math.floor(Math.random() * 80);
      g = 150 + Math.floor(Math.random() * 60);
      b = 200 + Math.floor(Math.random() * 55);
    }

    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.8 + 1.2) + 'rem';
    heart.style.animationDelay = Math.random() * 12 + 's';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.opacity = Math.random() * 0.2 + 0.08;
    heart.style.color = `rgba(${r}, ${g}, ${b}, 0.28)`;

    bg.appendChild(heart);
  }
})();

// ============================================================
//  COUNTDOWN — counts up from August 28
// ============================================================
const startDate = new Date(new Date().getFullYear(), 7, 28, 0, 0, 0);
const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
let lastSecond = null;

function updateCountdown() {
  if (!daysEl) return;

  const diff = new Date() - startDate;

  if (diff < 0) {
    daysEl.textContent = hoursEl.textContent =
      minutesEl.textContent = secondsEl.textContent = '00';
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent    = String(days).padStart(2, '0');
  hoursEl.textContent   = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');

  if (lastSecond !== seconds) {
    secondsEl.textContent = String(seconds).padStart(2, '0');
    secondsEl.classList.remove('pulse');
    void secondsEl.offsetWidth;
    secondsEl.classList.add('pulse');
    lastSecond = seconds;
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
//  SCROLL REVEAL
// ============================================================
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

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
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
})();

// ============================================================
//  SMOOTH SCROLL for navbar links
// ============================================================
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId.startsWith('#')) return;

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

// ============================================================
//  CUSTOM CURSOR
// ============================================================
(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let ringX = mouseX, ringY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function animate() {
    dotX  += (mouseX - dotX) * 0.4;
    dotY  += (mouseY - dotY) * 0.4;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.transform  = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  })();

  document.querySelectorAll('a, button, label, input, .thing-item, .timeline-content, .promise-list li')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
})();

// ============================================================
//  SCROLL PROGRESS BAR
// ============================================================
(function () {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function update() {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    bar.style.width = (total > 0 ? (h.scrollTop / total) * 100 : 0) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// ============================================================
//  SECTION SWEEP
// ============================================================
(function () {
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;

  sections.forEach(s => s.classList.add('section-sweep'));

  if (!('IntersectionObserver' in window)) {
    sections.forEach(s => s.classList.add('swept'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('swept', entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  sections.forEach(s => observer.observe(s));
})();

// ============================================================
//  TIME-OF-DAY GREETING
// ============================================================
(function () {
  const el = document.getElementById('greeting');
  if (!el) return;

  const hour = new Date().getHours();
  let text;
  if (hour >= 5 && hour < 12)       text = 'Good morning';
  else if (hour >= 12 && hour < 17) text = 'Good afternoon';
  else if (hour >= 17 && hour < 22) text = 'Good evening';
  else                              text = 'Still awake?';

  el.innerHTML = `${text}, <span>${CONFIG.herName || 'my love'}</span>`;
})();

// ============================================================
//  MUSIC TOGGLE
// ============================================================
(function () {
  const btn = document.getElementById('musicToggle');
  if (!btn) return;

  let playing = false;

  btn.addEventListener('click', () => {
    playing = !playing;
    btn.classList.toggle('playing', playing);
    btn.querySelector('i').className = playing ? 'fas fa-pause' : 'fas fa-music';

    if (playing && CONFIG.songLink) {
      window.open(CONFIG.songLink, '_blank', 'noopener');
    }
  });
})();

// ============================================================
//  KONAMI CODE → SECRET MESSAGE
// ============================================================
(function () {
  const sequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  let index = 0;
  const modal = document.getElementById('secretModal');
  const textEl = document.getElementById('secretText');
  const closeBtn = document.getElementById('secretClose');

  if (!modal) return;
  if (textEl && CONFIG.secretMessage) textEl.textContent = CONFIG.secretMessage;

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('keydown', e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === sequence[index]) {
      index++;
      if (index === sequence.length) {
        index = 0;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    } else {
      index = (key === sequence[0]) ? 1 : 0;
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });
})();