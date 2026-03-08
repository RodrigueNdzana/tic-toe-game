// ── Tic-Tac-Toe Game Logic ──────────────────────────────────────────────────

const WIN_COMBOS = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0, D: 0 };

// DOM refs
const cells         = document.querySelectorAll('.cell');
const currentPlayerEl = document.getElementById('current-player');
const resultBanner  = document.getElementById('result-banner');
const resultText    = document.getElementById('result-text');
const playAgainBtn  = document.getElementById('play-again');
const resetBtn      = document.getElementById('reset-scores');
const xScoreEl      = document.getElementById('x-score');
const oScoreEl      = document.getElementById('o-score');
const drawScoreEl   = document.getElementById('draw-score');
const scoreX        = document.getElementById('score-x');
const scoreO        = document.getElementById('score-o');
const turnIndicator = document.getElementById('turn-indicator');

// ── Starfield ────────────────────────────────────────────────────────────────
function buildStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random()*100}%; left:${Math.random()*100}%;
      --op:${(Math.random()*0.5+0.2).toFixed(2)};
      --dur:${(Math.random()*4+2).toFixed(1)}s;
      --delay:-${(Math.random()*6).toFixed(1)}s;
    `;
    container.appendChild(s);
  }
}
buildStars();
// ── Core Game ────────────────────────────────────────────────────────────────
function handleCellClick(e) {
  const idx = parseInt(e.currentTarget.dataset.index);
  if (gameOver || board[idx]) return;

  board[idx] = currentPlayer;
  renderCell(e.currentTarget, currentPlayer);

  
}
function renderCell(cell, player) {
  cell.textContent = player;
  cell.classList.add(player.toLowerCase(), 'taken');
  // Pop animation
  const inner = document.createElement('span');
  inner.textContent = player;
  cell.textContent = '';
  inner.className = 'cell-pop';
  inner.style.display = 'block';
  cell.appendChild(inner);
}



// ── Confetti ─────────────────────────────────────────────────────────────────
function launchConfetti(color) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const colors = [color, '#ffffff', '#f8f8ff', color, '#ffdd57'];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const angle = Math.random() * Math.PI * 2;
    const dist  = Math.random() * 340 + 100;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    piece.style.cssText = `
      left:${cx}px; top:${cy}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --tx:${tx}px; --ty:${ty}px;
      --rot:${Math.random()*720-360}deg;
      --dur:${(Math.random()*0.6+0.7).toFixed(2)}s;
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}
// ── Event Listeners ──────────────────────────────────────────────────────────
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
playAgainBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetAll);