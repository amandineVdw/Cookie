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
let imageIndex = 0;

let lumpsContainer = document.getElementById("lumps");
const scoreLabel = document.getElementById("scoreValue");
const multiplierLabel = document.getElementById("multiplierValue");
const multiplierButton = document.getElementById("multiplierButton");
const autoClickLabel = document.getElementById("autoClickValue");
const autoClickButton = document.getElementById("autoClickButton");
const bonusLabel = document.getElementById("bonusValue");
const bonusButton = document.getElementById("bonusButton");
const cookieImage = document.getElementById("cookieImage");
const clickCookie = document.getElementById("lumbs");

var Game = "";

// Game object for lump clicking
Game = {
  score: 0,
  clickCookie: function (element) {
    this.lumpsScore += clickValue * multiplier;
    clickCounter++;
    this.updateScore();
    this.showFloatingText(element, "+1");
  },
  updateScore: function () {
    var lumpsScore = document.getElementById("lumpsScore");
    lumpsScore.innerText = this.lumpsScorecore;
  },
  showFloatingText: function (element, text) {
    var floatingText = document.createElement("div");
    floatingText.className = "floatingText";
    floatingText.innerText = text;

    element.appendChild(floatingText);

    setTimeout(function () {
      element.removeChild(floatingText);
    }, 1000); // Remove floating text after 1 second
  },
};

// Buy multiplier
multiplierButton.addEventListener("click", function () {
  if (lumpsScore >= multiplierCost) {
    lumpsScore -= multiplierCost;
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
  if (lumpsScore >= autoClickCost) {
    lumpsScore -= autoClickCost;
    autoClickCost *= 2;
    updateScore();
    startAutoClick();
  } else {
    alert("Not enough cookies!");
  }
});

// Buy bonus
bonusButton.addEventListener("click", function () {
  if (lumpsScore >= bonusCost) {
    lumpsScore -= bonusCost;
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
  multiplierButton.textContent = `Multiplier x${multiplier} (${multiplierCost} lumps)`;
  multiplierLabel.textContent = multiplier;
}

// Auto-click functionality
function startAutoClick() {
  autoClickInterval = setInterval(function () {
    lumpsScore += clickValue * multiplier;
    updateScore();
  }, 1000);
  autoClickLabel.textContent++;
}

// Bonus functionality
function activateBonus() {
  clickValue *= 2; // Double the click value for 30 seconds
  bonusLabel.textContent++;
  updateScore();

  // Change cookie image on bonus activation
  bonusActivationCounter++;
  changeCookieImageOnBonus("lumps");

  // Timer for bonus duration
  bonusTimeout = setTimeout(function () {
    clickValue /= 2; // Reset click value after bonus expires
    bonusLabel.textContent--;
  }, 30000);

  // Show modal
  showModal();
}

// Fonction pour changer toutes les parties de l'image composée du cookie
function changeCookieImageAll(index) {
  // Boucle à travers chaque partie d'image et met à jour l'arrière-plan
  for (let i = 1; i <= 4; i++) {
    let lumpIcon = document.getElementById(`lumpsIcon${i}`);
    lumpIcon.style.backgroundImage = `url(image/index${index}/SuperCookieImage${i}.png)`;
  }
}

// Fonction pour changer l'image composée du cookie lors de l'activation du bonus
function changeCookieImageOnBonus() {
  if (bonusActivationCounter >= 1 && bonusActivationCounter <= 5) {
    changeCookieImageAll(1); // Utiliser la configuration d'image pour bonusActivationCounter de 1 à 5
  } else if (bonusActivationCounter > 5 && bonusActivationCounter <= 10) {
    changeCookieImageAll(2); // Utiliser la configuration d'image pour bonusActivationCounter de 6 à 10
  } else {
    changeCookieImageAll(3); // Utiliser une autre configuration d'image pour bonusActivationCounter au-dessus de 10
  }
}

// Disable buttons if not enough cookies
function checkCookies() {
  multiplierButton.disabled = lumpsScore < multiplierCost;
  autoClickButton.disabled = lumpsScore < autoClickCost;
  bonusButton.disabled = lumpsScore < bonusCost;
}

// Run initial checks
updateScore();
updateMultiplier();
checkCookies();
