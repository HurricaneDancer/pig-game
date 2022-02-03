'use strict';

// Select the elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, gameOver, winningScore;

const init = function () {
  // reset the scores on the screen
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // reset the scores in memory
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  gameOver = false;
  winningScore = 100;

  // reset the classes
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
};
init();

const updateActiveScore = () =>
  (document.getElementById(`current--${activePlayer}`).textContent =
    currentScore);

const switchActivePlayer = function () {
  updateActiveScore();
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const updateActivePlayerHold = () =>
  (document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer]);

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (gameOver) return;
  // 1, Generate a random dice roll
  const diceRoll = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice
  if (diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
  diceEl.src = `./public/dice-${diceRoll}.png`;

  // Check for a rolled 1, if true switch to next player
  if (diceRoll !== 1) {
    // add the dice to current score
    currentScore += diceRoll;
    updateActiveScore();
  } else {
    // switch to the next player
    currentScore = 0;
    switchActivePlayer();
  }
});

// holding your score
btnHold.addEventListener('click', function () {
  if (gameOver) return;
  // 1. Add score to active players score
  scores[activePlayer] += currentScore;
  currentScore = 0;
  updateActivePlayerHold();

  // 2. Check if score is >= 100
  // Finish game
  if (scores[activePlayer] >= winningScore) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    gameOver = true;
    diceEl.classList.add('hidden');
  } else {
    // Switch to next player
    switchActivePlayer();
  }
});

btnNew.addEventListener('click', init);
