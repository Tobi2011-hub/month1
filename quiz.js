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
//  QUIZ LOGIC
// ============================================================
(function quiz() {
  const form = document.getElementById('quizForm');
  if (!form) return;

  // ⚠️ CHANGE THESE ANSWERS TO YOUR REAL ONES
  // Each value must match the value="" of the correct radio option.
  const correctAnswers = {
    q1: 'a',   // Instant noodles
    q2: 'd',   // Overthinking
    q3: 'd',   // All of it
    q4: 'c',   // Late at night
    q5: 'c',   // A message from you
    q6: 'b',   // The Weeknd
    q7: 'a',   // Being ignored
    q8: 'd',   // Quality time
    q9: 'd',   // Your smile
    q10: 'd'   // All of it. Every bit.
  };

  const popup     = document.getElementById('scorePopup');
  const scoreVal  = document.getElementById('scoreValue');
  const remarkEl  = document.getElementById('scoreRemark');
  const titleEl   = document.getElementById('scoreTitle');
  const heartsBox = document.getElementById('scoreHearts');
  const closeBtn  = document.getElementById('closeScore');

  // ---- remarks by score ----
  function getRemark(score) {
    if (score === 10) return "Perfect score. You really know me ";
    if (score >= 8)   return "Okay, that's impressive. You really listen when I talk";
    if (score >= 6)   return "Not bad at all! You got the big stuff right.";
    if (score >= 4)   return "Hmm. Half right, half... a mystery. ";
    if (score >= 1)   return "Well... at least you tried.  I'm very okay with that. 😉";
    return "We need to talk. 😅 (But I still love you.)";
  }

  // ---- titles by score ----
  function getTitle(score) {
    if (score === 10) return "Soulmate energy.";
    if (score >= 8)   return "You really know me.";
    if (score >= 6)   return "Pretty close!";
    if (score >= 4)   return "Halfway there...";
    if (score >= 1)   return "We have work to do.";
    return "Oh no.";
  }

  // ---- floating hearts inside the popup ----
  function spawnHearts(count) {
    heartsBox.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const h = document.createElement('i');
      h.classList.add('fas', 'fa-heart');
      h.style.left = Math.random() * 100 + '%';
      h.style.bottom = '-30px';
      h.style.fontSize = (Math.random() * 1 + 1) + 'rem';
      h.style.animationDelay = Math.random() * 1.2 + 's';
      h.style.animationDuration = (Math.random() * 1.5 + 2.5) + 's';
      heartsBox.appendChild(h);
    }
  }

  // ---- show / hide popup ----
  function showPopup(score) {
    scoreVal.textContent = score;
    titleEl.textContent = getTitle(score);
    remarkEl.textContent = getRemark(score);

    // replay the pop animation on the number
    scoreVal.classList.remove('pop');
    void scoreVal.offsetWidth;
    scoreVal.classList.add('pop');

    spawnHearts(Math.max(6, score * 2));

    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');
  }

  function hidePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
  }

  // ---- form submit ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let score = 0;
    let missing = [];

    Object.keys(correctAnswers).forEach((name, i) => {
      const picked = form.querySelector(`input[name="${name}"]:checked`);
      const questionBox = form.querySelector(`.quiz-question[data-question="${i + 1}"]`);

      questionBox.classList.remove('missing');

      if (!picked) {
        missing.push(questionBox);
        return;
      }
      if (picked.value === correctAnswers[name]) score++;
    });

    // shake any unanswered questions and scroll to the first one
    if (missing.length > 0) {
      missing.forEach(q => q.classList.add('missing'));
      missing[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    showPopup(score);
  });

  // ---- close handlers ----
  closeBtn.addEventListener('click', hidePopup);
  popup.addEventListener('click', function (e) {
    if (e.target === popup) hidePopup();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) hidePopup();
  });
})();