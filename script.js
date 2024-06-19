/*Javascript*/

js;
let score = 0;
let clickValue = 1;
let multiplier = 1;
let multiplierCost = 10;
let autoClickCost = 100;
let bonusCost = 200;
let autoClickInterval;
let bonusTimeout;

const scoreLabel = document.getElementById("scoreValue");
const multiplierLabel = document.getElementById("multiplierValue");
const multiplierButton = document.getElementById("multiplierButton");
const autoClickLabel = document.getElementById("autoClickValue");
const autoClickButton = document.getElementById("autoClickButton");
const bonusLabel = document.getElementById("bonusValue");
const bonusButton = document.getElementById("bonusButton");

// Click on the cookie
document.getElementById("cookie").addEventListener("click", function () {
  score += clickValue * multiplier;
  updateScore();
});

// Buy multiplier
multiplierButton.addEventListener("click", function () {
  if (score >= multiplierCost) {
    score -= multiplierCost;
    multiplier++;
    clickValue = 2;
    multiplierCost = 2;
    updateScore();
    updateMultiplier();
  } else {
    alert("Not enough cookies!");
  }
});

// Buy auto-clicker
autoClickButton.addEventListener("click", function () {
  if (score >= autoClickCost) {
    score -= autoClickCost;
    autoClickCost *= 2;
    updateScore();
    startAutoClick();
  } else {
    alert("Not enough cookies!");
  }
});

// Buy bonus
bonusButton.addEventListener("click", function () {
  if (score >= bonusCost) {
    score -= bonusCost;
    updateScore();
    activateBonus();
  } else {
    alert("Not enough cookies!");
  }
});
// Update score display
function updateScore() {
  scoreLabel.textContent = score;
}

// Update multiplier display
function updateMultiplier() {
  multiplierButton.textContent = `Multiplier x${multiplier} (${multiplierCost} cookies)`;
  multiplierLabel.textContent = multiplier;
}

// Auto-click functionality
function startAutoClick() {
  autoClickInterval = setInterval(function () {
    score += clickValue * multiplier;
    updateScore();
  }, 1000);
  autoClickLabel.textContent++;
}

// Bonus functionality
function activateBonus() {
  clickValue *= 2; // Double the click value for 30 seconds
  bonusLabel.textContent++;
  updateScore();

  // Timer for bonus duration
  bonusTimeout = setTimeout(function () {
    clickValue /= 2; // Reset click value after bonus expires
    bonusLabel.textContent--;
  }, 30000);
}

// Disable buttons if not enough cookies
function checkCookies() {
  if (score < multiplierCost) {
    multiplierButton.disabled = true;
  } else {
    multiplierButton.disabled = false;
  }

  if (score < autoClickCost) {
    autoClickButton.disabled = true;
  } else {
    autoClickButton.disabled = false;
  }

  if (score < bonusCost) {
    bonusButton.disabled = true;
  } else {
    bonusButton.disabled = false;
  }
}

// Run initial checks
updateScore();
updateMultiplier();
checkCookies();
