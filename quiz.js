// ============================================================
//  QUIZ — How Well Do You Know Me?
// ============================================================

// ⚙️ CONFIG — correct answers ('a', 'b', 'c', or 'd')
const CORRECT = {
  1:  'a', 2:  'd', 3:  'd', 4:  'c', 5:  'c',
  6:  'd', 7:  'a', 8:  'd', 9:  'd', 10: 'd',

  11: 'b', 12: 'a', 13: 'a', 14: 'd', 15: 'a',
  16: 'a', 17: 'a', 18: 'a', 19: 'b', 20: 'd',

  21: 'a', 22: 'd', 23: 'b', 24: 'c', 25: 'd',
  26: 'a', 27: 'b', 28: 'b', 29: 'd', 30: 'd',

  31: 'b', 32: 'd', 33: 'd', 34: 'b', 35: 'b',
  36: 'c', 37: 'a', 38: 'c', 39: 'b', 40: 'c',

  41: 'a', 42: 'a', 43: 'a', 44: 'a', 45: 'c',
  46: 'a', 47: 'b', 48: 'b', 49: 'd', 50: 'a'
};

// how many questions per playthrough
const PLAY_COUNT = 20;

// ============================================================
//  QUESTIONS — 50 questions, 4 options each
// ============================================================
const QUESTIONS = [
  { id: 1,  q: 'What\'s my go-to comfort food?',
    a: 'Pizza', b: 'Instant noodles', c: 'Ice cream', d: 'Whatever you\'re eating',
    iconA: 'pizza-slice', iconB: 'bowl-food', iconC: 'ice-cream', iconD: 'utensils' },

  { id: 2,  q: 'What do I do when I can\'t sleep?',
    a: 'Scroll my phone', b: 'Listen to music', c: 'Text you', d: 'Overthink everything',
    iconA: 'mobile-screen', iconB: 'music', iconC: 'comment-sms', iconD: 'brain' },

  { id: 3,  q: 'What\'s my favorite thing about you?',
    a: 'Your smile', b: 'Your laugh', c: 'The way you listen', d: 'All of it. Obviously.',
    iconA: 'smile', iconB: 'face-laugh', iconC: 'ear-listen', iconD: 'heart' },

  { id: 4,  q: 'When do I text you the most?',
    a: 'Morning', b: 'Afternoon', c: 'Evening', d: 'Late at night',
    iconA: 'sun', iconB: 'cloud-sun', iconC: 'sun-haze', iconD: 'moon' },

  { id: 5,  q: 'What instantly makes my day better?',
    a: 'A good song', b: 'Good food', c: 'A message from you', d: 'Winning something',
    iconA: 'music', iconB: 'burger', iconC: 'comment-sms', iconD: 'trophy' },

  { id: 6,  q: 'If I could only listen to one artist for a year?',
    a: 'Drake', b: 'The Weeknd', c: 'Taylor Swift', d: 'Whoever you put on',
    iconA: 'microphone', iconB: 'headphones', iconC: 'guitar', iconD: 'heart' },

  { id: 7,  q: 'What\'s my biggest pet peeve?',
    a: 'Being ignored', b: 'Slow walkers', c: 'Bad manners', d: 'Waiting in line',
    iconA: 'ban', iconB: 'person-walking', iconC: 'face-frown', iconD: 'hourglass' },

  { id: 8,  q: 'What\'s my love language?',
    a: 'Words of affirmation', b: 'Quality time', c: 'Physical touch', d: 'All of them, for you',
    iconA: 'comment', iconB: 'clock', iconC: 'hands-holding-heart', iconD: 'heart' },

  { id: 9,  q: 'What\'s the first thing I noticed about you?',
    a: 'Your eyes', b: 'Your smile', c: 'Your voice', d: 'Your energy',
    iconA: 'eye', iconB: 'smile', iconC: 'microphone', iconD: 'sparkles' },

  { id: 10, q: 'What do I want most for us?',
    a: 'To travel together', b: 'To grow together', c: 'To be happy together', d: 'All of it. Every bit.',
    iconA: 'plane', iconB: 'seedling', iconC: 'smile', iconD: 'infinity' },

  { id: 11, q: 'What\'s my perfect date night?',
    a: 'A fancy dinner out', b: 'Staying in with you', c: 'A movie night', d: 'A long walk',
    iconA: 'utensils', iconB: 'couch', iconC: 'film', iconD: 'person-hiking' },

  { id: 12, q: 'When I\'m stressed, I usually...',
    a: 'Talk it out', b: 'Eat something', c: 'Go quiet for a bit', d: 'Listen to music',
    iconA: 'comments', iconB: 'burger', iconC: 'volume-xmark', iconD: 'music' },

  { id: 13, q: 'My dream trip is...',
    a: 'Somewhere with you', b: 'A beach somewhere', c: 'A big city', d: 'The mountains',
    iconA: 'map-location-dot', iconB: 'umbrella-beach', iconC: 'city', iconD: 'mountain' },

  { id: 14, q: 'If my house was on fire, I\'d grab...',
    a: 'My laptop', b: 'My headphones', c: 'My wallet', d: 'My phone with our chats',
    iconA: 'laptop', iconB: 'headphones', iconC: 'wallet', iconD: 'mobile-screen' },

  { id: 15, q: 'Am I a morning or night person?',
    a: 'Morning', b: 'Night', c: 'Both, honestly', d: 'Neither — I\'m always tired',
    iconA: 'sun', iconB: 'moon', iconC: 'cloud-sun', iconD: 'bed' },

  { id: 16, q: 'How do I usually say sorry?',
    a: 'I say it fast', b: 'I buy you something', c: 'I show up differently', d: 'I wait for you to come to me',
    iconA: 'comment', iconB: 'gift', iconC: 'hands-holding-heart', iconD: 'hourglass' },

  { id: 17, q: 'My favorite season?',
    a: 'Winter', b: 'Spring', c: 'Summer', d: 'Autumn',
    iconA: 'snowflake', iconB: 'seedling', iconC: 'sun', iconD: 'leaf' },

  { id: 18, q: 'What actually makes me jealous?',
    a: 'Nothing real', b: 'Any guy near you', c: 'When you\'re busy', d: 'When you talk about someone else',
    iconA: 'shield', iconB: 'eye', iconC: 'clock', iconD: 'comment' },

  { id: 19, q: 'My go-to snack?',
    a: 'Chips', b: 'Whatever\'s in the fridge', c: 'Something sweet', d: 'Something salty',
    iconA: 'cookie-bite', iconB: 'basket-shopping', iconC: 'ice-cream', iconD: 'bread-slice' },

  { id: 20, q: 'My biggest fear?',
    a: 'Failing', b: 'Being alone', c: 'Losing you', d: 'Not being enough',
    iconA: 'triangle-exclamation', iconB: 'user-slash', iconC: 'heart-crack', iconD: 'face-frown' },

  { id: 21, q: 'After a long day, I feel...',
    a: 'Tired but happy', b: 'Completely drained', c: 'Ready for round two', d: 'Wired and can\'t relax',
    iconA: 'battery-half', iconB: 'battery-empty', iconC: 'bolt', iconD: 'battery-full' },

  { id: 22, q: 'With a completely free day, I\'d...',
    a: 'Sleep all day', b: 'Game all day', c: 'Do something creative', d: 'Spend it with you',
    iconA: 'bed', iconB: 'gamepad', iconC: 'palette', iconD: 'heart' },

  { id: 23, q: 'My toxic trait?',
    a: 'I\'m too honest', b: 'I overthink everything', c: 'I never ask for help', d: 'I shut people out',
    iconA: 'comment', iconB: 'brain', iconC: 'hand', iconD: 'door-closed' },

  { id: 24, q: 'My biggest soft spot?',
    a: 'Old people', b: 'Kids', c: 'You', d: 'Animals',
    iconA: 'person-cane', iconB: 'child', iconC: 'heart', iconD: 'paw' },

  { id: 25, q: 'How do I want to be loved?',
    a: 'Gently', b: 'Loudly', c: 'Quietly, but constantly', d: 'Wildly',
    iconA: 'feather', iconB: 'bullhorn', iconC: 'moon', iconD: 'fire' },

  { id: 26, q: 'What do I want to be when I grow up?',
    a: 'Successful', b: 'Rich', c: 'Respected', d: 'Happy',
    iconA: 'chart-line', iconB: 'sack-dollar', iconC: 'award', iconD: 'smile' },

  { id: 27, q: 'First thing I do in the morning?',
    a: 'Drink water', b: 'Check my phone', c: 'Go back to sleep', d: 'Stretch',
    iconA: 'glass-water', iconB: 'mobile-screen', iconC: 'bed', iconD: 'person-running' },

  { id: 28, q: 'What do I love most about us?',
    a: 'How intense it is', b: 'How easy it feels', c: 'How honest we are', d: 'How we fix things',
    iconA: 'fire', iconB: 'cloud', iconC: 'comment', iconD: 'hands-holding-heart' },

  { id: 29, q: 'What do I hate?',
    a: 'Goodbyes', b: 'Waiting', c: 'Being lied to', d: 'Being misunderstood',
    iconA: 'hand-wave', iconB: 'hourglass', iconC: 'comment-slash', iconD: 'face-frown' },

  { id: 30, q: 'What am I most proud of?',
    a: 'Myself', b: 'My family', c: 'My friends', d: 'Us',
    iconA: 'user', iconB: 'house-heart', iconC: 'user-group', iconD: 'heart' },

  { id: 31, q: 'How do I show love?',
    a: 'Saying it', b: 'By paying attention', c: 'By showing up', d: 'By protecting you',
    iconA: 'comment', iconB: 'eye', iconC: 'person-walking', iconD: 'shield' },

  { id: 32, q: 'What do I notice first in a person?',
    a: 'Their eyes', b: 'Their vibe', c: 'Their laugh', d: 'Their energy',
    iconA: 'eye', iconB: 'sparkles', iconC: 'face-laugh', iconD: 'bolt' },

  { id: 33, q: 'What would I never do?',
    a: 'Give up on you', b: 'Lie to you', c: 'Betray you', d: 'Forget you',
    iconA: 'heart', iconB: 'shield-halved', iconC: 'user-slash', iconD: 'brain' },

  { id: 34, q: 'My perfect Sunday?',
    a: 'Nothing planned', b: 'Something fun', c: 'Family time', d: 'Alone time',
    iconA: 'couch', iconB: 'ticket', iconC: 'house-heart', iconD: 'user' },

  { id: 35, q: 'My comfort movie is...',
    a: 'Something new', b: 'Something I\'ve seen', c: 'A comedy', d: 'A romance',
    iconA: 'film', iconB: 'clapperboard', iconC: 'face-laugh', iconD: 'heart' },

  { id: 36, q: 'What do I want more of?',
    a: 'Money', b: 'Adventure', c: 'Time with you', d: 'Peace',
    iconA: 'sack-dollar', iconB: 'plane', iconC: 'clock', iconD: 'dove' },

  { id: 37, q: 'What do I want less of?',
    a: 'Distance', b: 'Drama', c: 'Stress', d: 'Silence',
    iconA: 'road', iconB: 'masks-theater', iconC: 'triangle-exclamation', iconD: 'volume-xmark' },

  { id: 38, q: 'When I\'m speechless, I usually...',
    a: 'Say something dumb', b: 'Just smile', c: 'Look away', d: 'Change the subject',
    iconA: 'comment-slash', iconB: 'smile', iconC: 'eye-slash', iconD: 'shuffle' },

  { id: 39, q: 'My guilty pleasure?',
    a: 'Bad TV', b: 'Your voice notes', c: 'Late-night snacks', d: 'Online shopping',
    iconA: 'tv', iconB: 'microphone', iconC: 'cookie-bite', iconD: 'bag-shopping' },

  { id: 40, q: 'What would I tell my past self?',
    a: 'Don\'t worry', b: 'It\'s going to be okay', c: 'Be braver', d: 'You\'ll meet someone',
    iconA: 'hand', iconB: 'heart', iconC: 'bolt', iconD: 'sparkles' },

  { id: 41, q: 'How do I want to be remembered?',
    a: 'As yours', b: 'As kind', c: 'As funny', d: 'As unforgettable',
    iconA: 'heart', iconB: 'hands-holding-heart', iconC: 'face-laugh', iconD: 'star' },

  { id: 42, q: 'What am I scared of?',
    a: 'Not being enough', b: 'Losing people', c: 'Being forgotten', d: 'Being alone',
    iconA: 'triangle-exclamation', iconB: 'user-slash', iconC: 'brain', iconD: 'user' },

  { id: 43, q: 'What actually calms me down?',
    a: 'Music', b: 'Your voice', c: 'Being alone', d: 'Deep breaths',
    iconA: 'music', iconB: 'microphone', iconC: 'user', iconD: 'wind' },

  { id: 44, q: 'What do I want for you?',
    a: 'Everything', b: 'Peace', c: 'Success', d: 'Happiness',
    iconA: 'star', iconB: 'dove', iconC: 'trophy', iconD: 'smile' },

  { id: 45, q: 'What do I want for us?',
    a: 'Forever', b: 'A long, good run', c: 'To grow together', d: 'To be happy',
    iconA: 'infinity', iconB: 'road', iconC: 'seedling', iconD: 'smile' },

  { id: 46, q: 'What do I think about before sleep?',
    a: 'Tomorrow', b: 'You', c: 'Yesterday', d: 'Nothing much',
    iconA: 'calendar', iconB: 'heart', iconC: 'clock-rotate-left', iconD: 'cloud' },

  { id: 47, q: 'What am I learning right now?',
    a: 'Patience', b: 'Confidence', c: 'Letting go', d: 'Trusting more',
    iconA: 'hourglass', iconB: 'dumbbell', iconC: 'wind', iconD: 'hands-holding-heart' },

  { id: 48, q: 'What am I good at?',
    a: 'Loving you', b: 'Listening', c: 'Making people laugh', d: 'Showing up',
    iconA: 'heart', iconB: 'ear-listen', iconC: 'face-laugh', iconD: 'person-walking' },

  { id: 49, q: 'What am I bad at?',
    a: 'Goodbyes', b: 'Waking up', c: 'Being patient', d: 'Asking for help',
    iconA: 'hand-wave', iconB: 'bed', iconC: 'hourglass', iconD: 'hand' },

  { id: 50, q: 'What would I choose again?',
    a: 'You. Every time.', b: 'Every single thing', c: 'The same mistakes', d: 'This exact life',
    iconA: 'heart', iconB: 'infinity', iconC: 'rotate', iconD: 'star' }
];

// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function createFloatingHearts() {
  const bg = document.getElementById('bgHearts');
  if (!bg) return;

  const heartCount = window.innerWidth < 700 ? 12 : 20;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');

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
//  QUIZ LOGIC
// ============================================================
(function quiz() {
  const introCard    = document.getElementById('introCard');
  const questionCard = document.getElementById('questionCard');
  const resultsCard  = document.getElementById('resultsCard');

  const startBtn     = document.getElementById('startBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const backBtn      = document.getElementById('backBtn');

  const questionNum  = document.getElementById('questionNum');
  const questionText = document.getElementById('questionText');
  const choicesWrap  = document.getElementById('choicesWrap');

  const progressBar  = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const resultsList  = document.getElementById('resultsList');
  const backWrapper  = document.getElementById('backWrapper');
  const scoreComment = document.getElementById('scoreComment');

  let currentIndex = 0;
  let activeQuestions = [];
  const answers = [];

  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickQuestions() {
    const shuffled = shuffle(QUESTIONS);
    return shuffled.slice(0, Math.min(PLAY_COUNT, shuffled.length));
  }

  function showOnly(card) {
    [introCard, questionCard, resultsCard].forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }

  function updateProgress() {
    const total = activeQuestions.length;
    const pct = total > 0 ? (currentIndex / total) * 100 : 0;
    progressBar.style.width = pct + '%';
    progressText.textContent = `${Math.min(currentIndex + 1, total)} / ${total}`;
  }

  function buildChoices(q) {
    choicesWrap.innerHTML = '';
    const opts = [
      { key: 'a', label: q.a, icon: q.iconA },
      { key: 'b', label: q.b, icon: q.iconB },
      { key: 'c', label: q.c, icon: q.iconC },
      { key: 'd', label: q.d, icon: q.iconD }
    ];

    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.dataset.choice = opt.key;
      btn.innerHTML = `
        <span class="choice-icon"><i class="fas fa-${opt.icon}"></i></span>
        <span class="choice-label">${opt.label}</span>
      `;
      btn.addEventListener('click', () => recordAnswer(opt.key));
      choicesWrap.appendChild(btn);
    });
  }

  function renderQuestion() {
    const q = activeQuestions[currentIndex];
    if (!q) return;

    questionNum.textContent = `Question ${currentIndex + 1}`;
    questionText.textContent = q.q;

    buildChoices(q);

    const existing = answers[currentIndex];
    if (existing) {
      const prev = choicesWrap.querySelector(`.choice-btn[data-choice="${existing.choice}"]`);
      if (prev) prev.classList.add('picked');
    }

    backBtn.disabled = currentIndex === 0;
    updateProgress();
  }

  function startGame() {
    currentIndex = 0;
    answers.length = 0;
    activeQuestions = pickQuestions();
    showOnly(questionCard);
    backWrapper.style.display = 'block';
    if (scoreComment) scoreComment.textContent = '';
    renderQuestion();
  }

  function recordAnswer(choice) {
    const q = activeQuestions[currentIndex];
    if (!q) return;

    const answer = q[choice];

    choicesWrap.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('picked'));
    const picked = choicesWrap.querySelector(`.choice-btn[data-choice="${choice}"]`);
    if (picked) picked.classList.add('picked');

    const isCorrect = (choice === CORRECT[q.id]);
    answers[currentIndex] = { q: q.q, choice, answer, correct: isCorrect };

    setTimeout(() => {
      if (currentIndex < activeQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
      } else {
        showResults();
      }
    }, 400);
  }

  // ---- pick a comment based on the score ----
  function getScoreComment(percent) {
    if (percent === 100) {
      return `Perfect score. You know me better than I know myself — and that's saying a lot. I'm keeping you forever. 💍`;
    }
    if (percent >= 90) {
      return `Wow. You actually listen when I talk. That's rare. That's you. 💙`;
    }
    if (percent >= 80) {
      return `Okay, that's impressive. You got the big stuff right and most of the little things too. 💕`;
    }
    if (percent >= 70) {
      return `Not bad at all. You know the important parts — and honestly, those are the ones that matter. 😌`;
    }
    if (percent >= 60) {
      return `Pretty solid. Some of this we'll have to fix... with more late-night talks. 🌙`;
    }
    if (percent >= 50) {
      return `Halfway there. We clearly need to spend more time together — and I'm very okay with that. 😊`;
    }
    if (percent >= 40) {
      return `Hmm. Looks like I'm still a bit of a mystery to you. Good thing I love a slow reveal. 💫`;
    }
    if (percent >= 30) {
      return `Well... at least you tried. Clearly we need more dates. Lots of them. 😉`;
    }
    if (percent >= 20) {
      return `Babe. This is not great. But it just means I get to tell you everything all over again. 💌`;
    }
    if (percent >= 1) {
      return `Okay. Wow. We really do have a lot to talk about. Coffee, tonight, my treat. ☕`;
    }
    return `Zero? Zero. Simi. We need to talk. 😅 (But I still love you.)`;
  }

  function showResults() {
    showOnly(resultsCard);
    backWrapper.style.display = 'none';

    progressBar.style.width = '100%';
    progressText.textContent = `${activeQuestions.length} / ${activeQuestions.length}`;

    const score = answers.filter(a => a.correct).length;
    const total = activeQuestions.length;
    const percent = Math.round((score / total) * 100);

    // ---- score comment ----
    if (scoreComment) {
      scoreComment.textContent = getScoreComment(percent);
    }

    // ---- score header + answer list ----
    resultsList.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'score-header';
    header.innerHTML = `<span class="score-big">${score}</span> <span class="score-slash">/</span> <span class="score-total">${total}</span>`;
    resultsList.appendChild(header);

    answers.forEach((entry, i) => {
      const li = document.createElement('li');
      li.className = entry.correct ? 'correct' : 'wrong';
      const icon = entry.correct ? 'fa-circle-check' : 'fa-circle-xmark';
      li.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${entry.q.replace(/\?$/, '')} — <strong>${entry.answer}</strong></span>
      `;
      li.style.animationDelay = (i * 0.03) + 's';
      resultsList.appendChild(li);
    });
  }

  startBtn.addEventListener('click', startGame);
  playAgainBtn.addEventListener('click', startGame);
  backBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });

  showOnly(introCard);
  updateProgress();
})();