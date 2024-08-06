const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));




var timerElement = document.getElementById("timer");

var gameOverElement = document.getElementById("game-over");

var secondsLeft = 60; 
var timerInterval;
var isGameOver = false;


function startTimer() {

  updateTimer();

  
  timerInterval = setInterval(function () {
    secondsLeft--;

    if (secondsLeft < 0) {
      stopTimer();
      endGame();
    } else {
      updateTimer();
    }
  }, 1000);
}


function updateTimer() {
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

let  formattedTime = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

  timerElement.textContent = formattedTime;
}


function stopTimer() {
  clearInterval(timerInterval);
}


function endGame() {
  isGameOver = true;
  gameOverElement.style.display = "block";

}
startTimer();

