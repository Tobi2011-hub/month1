// ============================================================
//  THIS OR THAT — mini-game logic
// ============================================================

// ⚙️ CONFIG — edit these!
// Each item has:
//   question : the prompt shown
//   a / b    : the two options
//   iconA / iconB : Font Awesome icon class (without "fas fa-" prefix)
const QUESTIONS = [
  { question: 'Pizza or Sushi?',         a: 'Pizza',           b: 'Sushi',           iconA: 'pizza-slice',   iconB: 'fish' },
  { question: 'Sunrise or Sunset?',      a: 'Sunrise',         b: 'Sunset',          iconA: 'sun',           iconB: 'moon' },
  { question: 'Text or Call?',           a: 'Text',            b: 'Call',            iconA: 'comment-sms',   iconB: 'phone' },
  { question: 'Movie night or Walk?',    a: 'Movie night',     b: 'Long walk',       iconA: 'film',          iconB: 'person-hiking' },
  { question: 'Beach or Mountains?',     a: 'Beach',           b: 'Mountains',       iconA: 'umbrella-beach',iconB: 'mountain' },
  { question: 'Coffee or Tea?',          a: 'Coffee',          b: 'Tea',             iconA: 'mug-hot',       iconB: 'mug-saucer' },
  { question: 'Sweet or Savory?',        a: 'Sweet',           b: 'Savory',          iconA: 'ice-cream',     iconB: 'utensils' },
  { question: 'Winter or Summer?',       a: 'Winter',          b: 'Summer',          iconA: 'snowflake',     iconB: 'sun' },
  { question: 'Read or Watch?',          a: 'Read',            b: 'Watch',           iconA: 'book-open',     iconB: 'tv' },
  { question: 'Mountains or City?',      a: 'Mountains',       b: 'City',            iconA: 'tree',          iconB: 'city' }
];

// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function createFloatingHearts() {
  const bg = document.getElementById('bgHearts');
  if (!bg) return;

  for (let i = 0; i < 16; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');

    // mix of blue tones
    const r = 100 + Math.floor(Math.random() * 80);
    const g = 150 + Math.floor(Math.random() * 60);
    const b = 200 + Math.floor(Math.random() * 55);

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
//  GAME LOGIC
// ============================================================
(function thisOrThat() {
  // ---- DOM ----
  const introCard    = document.getElementById('introCard');
  const questionCard = document.getElementById('questionCard');
  const resultsCard  = document.getElementById('resultsCard');

  const startBtn     = document.getElementById('startBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const backBtn      = document.getElementById('backBtn');

  const questionNum  = document.getElementById('questionNum');
  const questionText = document.getElementById('questionText');
  const choiceA      = document.getElementById('choiceA');
  const choiceB      = document.getElementById('choiceB');
  const labelA       = document.getElementById('choiceALabel');
  const labelB       = document.getElementById('choiceBLabel');
  const iconA        = choiceA.querySelector('.choice-icon i');
  const iconB        = choiceB.querySelector('.choice-icon i');

  const progressBar  = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const resultsList  = document.getElementById('resultsList');
  const backWrapper  = document.getElementById('backWrapper');

  // ---- state ----
  let currentIndex = 0;
  const answers = []; // { question, choice, answer }

  // ---- helpers ----
  function showOnly(card) {
    [introCard, questionCard, resultsCard].forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }

  function updateProgress() {
    const total = QUESTIONS.length;
    const pct = total > 0 ? ((currentIndex) / total) * 100 : 0;
    progressBar.style.width = pct + '%';
    progressText.textContent = `${Math.min(currentIndex + 1, total)} / ${total}`;
  }

  function renderQuestion() {
    const q = QUESTIONS[currentIndex];
    questionNum.textContent = `Question ${currentIndex + 1}`;
    questionText.textContent = q.question;
    labelA.textContent = q.a;
    labelB.textContent = q.b;
    iconA.className = `fas fa-${q.iconA}`;
    iconB.className = `fas fa-${q.iconB}`;

    // restore a previous pick if it exists
    choiceA.classList.remove('picked');
    choiceB.classList.remove('picked');
    const existing = answers[currentIndex];
    if (existing) {
      if (existing.choice === 'a') choiceA.classList.add('picked');
      if (existing.choice === 'b') choiceB.classList.add('picked');
    }

    // back button state
    backBtn.disabled = currentIndex === 0;

    updateProgress();
  }

  function startGame() {
    currentIndex = 0;
    answers.length = 0;
    showOnly(questionCard);
    backWrapper.style.display = 'block';
    renderQuestion();
  }

  function recordAnswer(choice) {
    const q = QUESTIONS[currentIndex];
    const answer = choice === 'a' ? q.a : q.b;

    // highlight
    choiceA.classList.remove('picked');
    choiceB.classList.remove('picked');
    if (choice === 'a') choiceA.classList.add('picked');
    else                choiceB.classList.add('picked');

    // save
    answers[currentIndex] = { question: q.question, choice, answer };

    // brief delay so the highlight is visible before moving on
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        currentIndex++;
        renderQuestion();
      } else {
        showResults();
      }
    }, 400);
  }

  function showResults() {
    showOnly(resultsCard);
    backWrapper.style.display = 'none';

    // finish the progress bar
    progressBar.style.width = '100%';
    progressText.textContent = `${QUESTIONS.length} / ${QUESTIONS.length}`;

    // build list
    resultsList.innerHTML = '';
    answers.forEach((entry, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <i class="fas fa-heart"></i>
        <span>${entry.question.replace(/\?$/, '')} — <strong>${entry.answer}</strong></span>
      `;
      li.style.animationDelay = (i * 0.06) + 's';
      resultsList.appendChild(li);
    });
  }

  // ---- events ----
  startBtn.addEventListener('click', startGame);
  playAgainBtn.addEventListener('click', () => {
    // reset progress bar and go back to intro? — start directly
    startGame();
  });

  choiceA.addEventListener('click', () => recordAnswer('a'));
  choiceB.addEventListener('click', () => recordAnswer('b'));

  backBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });

  // ---- init ----
  showOnly(introCard);
  updateProgress();
})();