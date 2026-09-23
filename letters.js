// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function createFloatingHearts() {
  const bg = document.getElementById('bgHearts');
  if (!bg) return;

  const heartCount = 18;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');

    // 70% blue, 30% blush
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
//  OPEN WHEN LETTERS — toggle logic
// ============================================================
(function openWhenLetters() {
  const cards = document.querySelectorAll('.letter-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      // don't toggle if the user clicked the close button
      if (e.target.closest('.close-btn')) return;
      // don't re-open an already open card
      if (this.classList.contains('open')) return;

      // close any other open card first
      document.querySelectorAll('.letter-card.open').forEach(open => {
        open.classList.remove('open');
      });

      this.classList.add('open');

      // gently scroll the opened card into view
      setTimeout(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  });

  // close button on each letter
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      this.closest('.letter-card').classList.remove('open');
    });
  });
})();