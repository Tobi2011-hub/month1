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
//  HELPERS
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(hover: none)').matches;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function createFloatingHearts() {
  const bg = document.getElementById('bgHearts');
  if (!bg) return;

  // fewer hearts on mobile for performance
  const count = window.innerWidth < 700 ? 12 : 20;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');
    heart.setAttribute('aria-hidden', 'true');

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

    heart.style.left = rand(0, 100) + '%';
    heart.style.top = rand(0, 100) + '%';
    heart.style.fontSize = rand(1.2, 3.0) + 'rem';
    heart.style.animationDelay = rand(0, 12) + 's';
    heart.style.animationDuration = rand(8, 16) + 's';
    heart.style.opacity = rand(0.08, 0.28);
    heart.style.color = `rgba(${r}, ${g}, ${b}, 0.28)`;

    fragment.appendChild(heart);
  }

  bg.appendChild(fragment);
})();

// ============================================================
//  COUNTDOWN — counts up from August 28
// ============================================================
(function initCountdown() {
  // August = month index 7 (JS months are 0-indexed)
  const startDate = new Date(new Date().getFullYear(), 7, 28, 0, 0, 0);

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  let lastSecond = null;

  function updateCountdown() {
    const diff = Date.now() - startDate.getTime();

    // if the date is in the future, show zeros
    if (diff < 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent    = pad2(days);
    hoursEl.textContent   = pad2(hours);
    minutesEl.textContent = pad2(minutes);

    if (lastSecond !== seconds) {
      secondsEl.textContent = pad2(seconds);
      secondsEl.classList.remove('pulse');
      void secondsEl.offsetWidth;   // restart the animation
      secondsEl.classList.add('pulse');
      lastSecond = seconds;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// ============================================================
//  SCROLL REVEAL
// ============================================================
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // if IntersectionObserver isn't supported OR reduced motion is on,
  // just show everything immediately
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
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
(function initSmoothScroll() {
  document.querySelectorAll('.navbar a[href^="#"], .drawer-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

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
})();

// ============================================================
//  CUSTOM CURSOR
// ============================================================
(function initCustomCursor() {
  if (isTouchDevice || prefersReducedMotion) return;

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

  // use event delegation so it also works for elements added later
  document.body.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, label, input, .thing-item, .timeline-content, .promise-list li, .nav-link, .drawer-link')) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.body.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, label, input, .thing-item, .timeline-content, .promise-list li, .nav-link, .drawer-link')) {
      document.body.classList.remove('cursor-hover');
    }
  });
})();

// ============================================================
//  SCROLL PROGRESS BAR
// ============================================================
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let ticking = false;

  function update() {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    bar.style.width = (total > 0 ? (h.scrollTop / total) * 100 : 0) + '%';
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();

// ============================================================
//  SECTION SWEEP
// ============================================================
(function initSectionSweep() {
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;

  sections.forEach(s => s.classList.add('section-sweep'));

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
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
(function initGreeting() {
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
(function initMusicToggle() {
  const btn = document.getElementById('musicToggle');
  if (!btn) return;

  const icon = btn.querySelector('i');
  let playing = false;

  btn.addEventListener('click', () => {
    playing = !playing;
    btn.classList.toggle('playing', playing);
    if (icon) icon.className = playing ? 'fas fa-pause' : 'fas fa-music';

    if (playing && CONFIG.songLink) {
      window.open(CONFIG.songLink, '_blank', 'noopener');
    }
  });
})();

// ============================================================
//  KONAMI CODE → SECRET MESSAGE
// ============================================================
(function initKonami() {
  const sequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  const modal = document.getElementById('secretModal');
  const textEl = document.getElementById('secretText');
  const closeBtn = document.getElementById('secretClose');

  if (!modal) return;
  if (textEl && CONFIG.secretMessage) textEl.textContent = CONFIG.secretMessage;

  let index = 0;

  function open() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('keydown', e => {
    // ignore if she's typing somewhere
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (key === sequence[index]) {
      index++;
      if (index === sequence.length) {
        index = 0;
        open();
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

// ============================================================
//  NAVBAR — brand + toggle + drawer + active link detection
// ============================================================
(function enhanceNavbar() {
  const navbar      = document.getElementById('mainNav');
  const toggle      = document.getElementById('navToggle');
  const drawer      = document.getElementById('navDrawer');
  const backdrop    = document.getElementById('navBackdrop');
  const inlineLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!navbar) return;

  // ---------- mobile drawer ----------
  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (toggle && drawer && backdrop) {
    toggle.addEventListener('click', () => {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    backdrop.addEventListener('click', closeDrawer);
    drawerLinks.forEach(l => l.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  // ---------- scrolled state ----------
  let ticking = false;
  function updateScrolled() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    ticking = false;
  }
  function requestScrolled() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScrolled);
    }
  }
  window.addEventListener('scroll', requestScrolled, { passive: true });
  updateScrolled();

  // ---------- active link detection ----------
  // 1) External pages
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const pageMap = {
    'quiz.html': 'Quiz',
    'letters.html': 'Letters',
    'thisorthat.html': 'This or That',
    'notes.html': 'Notes'
  };

  function highlightPageLink() {
    const label = pageMap[currentPage];
    if (!label) return;
    [...inlineLinks, ...drawerLinks].forEach(l => {
      if (l.textContent.trim() === label) l.classList.add('active');
    });
  }
  highlightPageLink();

  // 2) In-page sections
  const sectionLinks = Array.from(inlineLinks).filter(l => {
    const href = l.getAttribute('href');
    return href && href.startsWith('#');
  });

  if (sectionLinks.length && 'IntersectionObserver' in window) {
    const linkMap = {};
    sectionLinks.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      linkMap[id] = link;
    });

    const sectionEls = Object.keys(linkMap)
      .map(id => document.getElementById(id))
      .filter(Boolean);

    function setActive(id) {
      [...inlineLinks, ...drawerLinks].forEach(l => l.classList.remove('active'));
      sectionLinks.forEach(l => {
        if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
      });
      drawerLinks.forEach(l => {
        if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
      });
    }

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setActive(visible[0].target.id);
    }, {
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    });

    sectionEls.forEach(s => observer.observe(s));

    // force "home" when at the very top
    window.addEventListener('scroll', () => {
      if (window.scrollY < 100 && linkMap['home']) setActive('home');
    }, { passive: true });
  }
})();