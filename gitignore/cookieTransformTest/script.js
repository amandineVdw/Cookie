let score = 0;
let clickValue = 1;
let multiplier = 1;
let multiplierCost = 10;
let autoClickCost = 100;
let bonusCost = 200;
let autoClickInterval;
let bonusTimeout;
let clickCounter = 0; // Nouveau compteur de clics
let bonusActivationCounter = 0; // Nouveau compteur d'activations de bonus

const scoreLabel = document.getElementById("scoreValue");
const multiplierLabel = document.getElementById("multiplierValue");
const multiplierButton = document.getElementById("multiplierButton");
const autoClickLabel = document.getElementById("autoClickValue");
const autoClickButton = document.getElementById("autoClickButton");
const bonusLabel = document.getElementById("bonusValue");
const bonusButton = document.getElementById("bonusButton");

//Amandine - COOKIE IMAGES - EVOLUTION
const cookieImage = document.getElementById("cookieImage");

document.getElementById("cookie").addEventListener("click", function () {
  score += clickValue * multiplier;
  clickCounter++;
  updateScore();
});

// Buy multiplier
multiplierButton.addEventListener("click", function () {
  if (score >= multiplierCost) {
    score -= multiplierCost;
    multiplier++;
    clickValue *= 2;
    multiplierCost *= 2;
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

// Amandine - modif - Buy bonus
bonusButton.addEventListener("click", function () {
  if (score >= bonusCost) {
    score -= bonusCost;
    updateScore();
    activateBonus();
    bonusButton.classList.add("animate");
    setTimeout(() => {
      bonusButton.classList.remove("animate");
    }, 600); // 0.6s = 600ms
  } else {
    alert("Not enough cookies!");
  }
});

// Update score display
function updateScore() {
  scoreLabel.textContent = score;
  checkCookies();
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

  //Amandine - Change cookie image on bonus activation
  bonusActivationCounter++;
  changeCookieImageOnBonus("cookie");

  // Timer for bonus duration
  bonusTimeout = setTimeout(function () {
    clickValue /= 2; // Reset click value after bonus expires
    bonusLabel.textContent--;
  }, 30000);
}

// Amandine - modif - Buy bonus
bonusButton.addEventListener("click", function () {
  if (score >= bonusCost) {
    score -= bonusCost;
    updateScore();
    activateBonus();
    bonusButton.classList.add("animate");
    setTimeout(() => {
      bonusButton.classList.remove("animate");
    }, 600); // 0.6s = 600ms
  } else {
    alert("Not enough cookies!");
  }
});

//Amandine- Function change cookie image on bonus activation
function changeCookieImageOnBonus(imageId) {
  let imageUrl = "";
  switch (bonusActivationCounter % 3) {
    case 0:
      imageUrl = "image/test/cookie.image1.png";
      break;
    case 1:
      imageUrl = "image/cookie/test.image2.png";
      break;
    case 2:
      imageUrl = "image/cookie/test.image3.png";
      break;
  }
  document.getElementById(imageId).querySelector("img").src = imageUrl;
}

/* Disable buttons if not enough cookies
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
}*/

// Amandine - Désactiver les boutons si pas assez de cookies
function checkCookies() {
  multiplierButton.disabled = score < multiplierCost;
  autoClickButton.disabled = score < autoClickCost;
  bonusButton.disabled = score < bonusCost;
}

// Run initial checks
updateScore();
updateMultiplier();
checkCookies();
