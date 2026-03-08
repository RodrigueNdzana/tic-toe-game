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