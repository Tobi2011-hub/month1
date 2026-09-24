// ============================================================
//  OUR NOTES — shared notes (localStorage based)
// ============================================================

const STORAGE_KEY = 'ourNotes_v1';
const MAX_LEN = 500;

let currentAuthor = 'him'; // 'him' or 'her'
let notes = [];

// ---- DOM ----
const bgHearts    = document.getElementById('bgHearts');
const noteInput   = document.getElementById('noteInput');
const charCount   = document.getElementById('charCount');
const sendBtn     = document.getElementById('sendBtn');
const notesList   = document.getElementById('notesList');
const notesCount  = document.getElementById('notesCount');
const whoBtns     = document.querySelectorAll('.who-btn');
const exportBtn   = document.getElementById('exportBtn');
const importBtn   = document.getElementById('importBtn');
const importInput = document.getElementById('importInput');
const clearBtn    = document.getElementById('clearBtn');
const toast       = document.getElementById('toast');
const toastText   = document.getElementById('toastText');

// ============================================================
//  FLOATING BACKGROUND HEARTS
// ============================================================
(function createFloatingHearts() {
  if (!bgHearts) return;

  for (let i = 0; i < 16; i++) {
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

    bgHearts.appendChild(heart);
  }
})();

// ============================================================
//  STORAGE
// ============================================================
function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Could not load notes:', e);
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Could not save notes:', e);
  }
}

// ============================================================
//  HELPERS
// ============================================================
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(msg) {
  toastText.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}

// ============================================================
//  RENDER
// ============================================================
function render() {
  // newest first
  const sorted = [...notes].sort((a, b) => b.createdAt - a.createdAt);

  // count
  const word = sorted.length === 1 ? 'note' : 'notes';
  notesCount.innerHTML = `<strong>${sorted.length}</strong> ${word}`;

  // empty state
  if (sorted.length === 0) {
    notesList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-envelope-open-text"></i>
        <h3>No notes yet</h3>
        <p>Be the first to leave something. It doesn't have to be big — even "hey, thinking of you" counts.</p>
      </div>
    `;
    return;
  }

  // build list
  notesList.innerHTML = '';
  sorted.forEach(note => {
    const el = document.createElement('div');
    el.className = `note-card from-${note.author}`;

    const authorLabel = note.author === 'him' ? 'Me' : 'Simi';
    const authorIcon  = note.author === 'him' ? 'fa-user' : 'fa-heart';

    el.innerHTML = `
      <div class="note-header">
        <div class="note-author">
          <span class="avatar"><i class="fas ${authorIcon}"></i></span>
          <span>${authorLabel}</span>
        </div>
        <span class="note-time">${timeAgo(note.createdAt)}</span>
      </div>
      <div class="note-text">${escapeHtml(note.text)}</div>
      <div class="note-footer">
        <button class="note-action copy" data-id="${note.id}">
          <i class="fas fa-copy"></i> Copy
        </button>
        <button class="note-action delete" data-id="${note.id}">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `;

    notesList.appendChild(el);
  });

  // per-note actions
  notesList.querySelectorAll('.note-action.copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const note = notes.find(n => n.id === id);
      if (!note) return;
      navigator.clipboard.writeText(note.text)
        .then(() => showToast('Copied to clipboard'))
        .catch(() => showToast('Could not copy'));
    });
  });

  notesList.querySelectorAll('.note-action.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      notes = notes.filter(n => n.id !== id);
      saveNotes();
      render();
      showToast('Note deleted');
    });
  });
}

// ============================================================
//  WHO TOGGLE
// ============================================================
whoBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    whoBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentAuthor = btn.dataset.author;
  });
});

// ============================================================
//  COMPOSER
// ============================================================
function updateCharCount() {
  const len = noteInput.value.length;
  charCount.textContent = `${len} / ${MAX_LEN}`;
  charCount.classList.remove('warn', 'over');
  if (len > MAX_LEN * 0.9) charCount.classList.add('warn');
  if (len >= MAX_LEN)      charCount.classList.add('over');
  sendBtn.disabled = len === 0 || len > MAX_LEN;
}

noteInput.addEventListener('input', updateCharCount);

// Enter to send, Shift+Enter for newline
noteInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) sendBtn.click();
  }
});

sendBtn.addEventListener('click', () => {
  const text = noteInput.value.trim();
  if (!text) return;

  notes.push({
    id: 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    text,
    author: currentAuthor,
    createdAt: Date.now()
  });

  saveNotes();
  noteInput.value = '';
  updateCharCount();
  render();
  showToast('Note saved 💙');
  noteInput.focus();
});

// ============================================================
//  EXPORT / IMPORT / CLEAR
// ============================================================
exportBtn.addEventListener('click', () => {
  if (notes.length === 0) {
    showToast('Nothing to export yet');
    return;
  }
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const stamp = new Date().toISOString().slice(0, 10);
  a.download = `our-notes-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported 💙');
});

importBtn.addEventListener('click', () => importInput.click());

importInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported)) throw new Error('Not an array');

      // merge, dedupe by id
      const existingIds = new Set(notes.map(n => n.id));
      imported.forEach(n => {
        if (n && n.id && !existingIds.has(n.id) && n.text) {
          notes.push(n);
          existingIds.add(n.id);
        }
      });

      saveNotes();
      render();
      showToast('Notes imported 💙');
    } catch (err) {
      showToast('Could not read that file');
    }
    importInput.value = '';
  };
  reader.readAsText(file);
});

clearBtn.addEventListener('click', () => {
  if (notes.length === 0) {
    showToast('Nothing to clear');
    return;
  }
  if (confirm('Delete ALL notes? This cannot be undone.')) {
    notes = [];
    saveNotes();
    render();
    showToast('All notes cleared');
  }
});

// ============================================================
//  INIT
// ============================================================
notes = loadNotes();
updateCharCount();
render();