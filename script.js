'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //A little faster
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  //Reset score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Remove css class "player--active" if it contains the style OR add the css class if it does not contain the style
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const checkWinCondition = function () {
  playing = false;
  diceEl.classList.add('hidden');
  //Finish the game
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const randomNum = Math.trunc(Math.random() * 6) + 1;
    console.log(activePlayer);
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNum}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (randomNum !== 1) {
      //Add dice to current score
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      if (scores[activePlayer] + currentScore >= 100) {
        checkWinCondition();
      }
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100

    if (scores[activePlayer] >= 100) {
      checkWinCondition();
    } else {
      //Swich to the next player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);