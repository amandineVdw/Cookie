let score = 0;
let clickValue = 1;
let multiplier = 1;
let multiplierCost = 10;
let autoClickCost = 100;
let bonusCost = 200;
let autoClickInterval;
let bonusTimeout;
let clickCounter = 0;
let bonusActivationCounter = 0;
let imageIndex = 0;

const multiplierLabel = document.getElementById("multiplierValue");
const multiplierButton = document.getElementById("multiplierButton");
const autoClickLabel = document.getElementById("autoClickValue");
const autoClickButton = document.getElementById("autoClickButton");
const bonusLabel = document.getElementById("bonusValue");
const bonusButton = document.getElementById("bonusButton");
const scoreLabel = document.getElementById("lumpsScore");
var sprite = document.getElementById('sprite');
var isAnimationActive = false; // Variable pour suivre l'état de l'animation

function clickLump(element) {
  score += clickValue * multiplier;
  updateScore();
  showFloatingText(element, "+1");
}

function showFloatingText(element, text) {
  const floatingText = document.createElement("div");
  floatingText.className = "floatingText";
  floatingText.innerText = text;
  element.appendChild(floatingText);
  setTimeout(() => {
    element.removeChild(floatingText);
  }, 1000);
}

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

bonusButton.addEventListener("click", function () {
  if (score >= bonusCost) {
    score -= bonusCost;
    updateScore();
    activateBonus();
    bonusButton.classList.add("animate");
    setTimeout(() => {
      bonusButton.classList.remove("animate");
    }, 600);
  } else {
    alert("Not enough cookies!");
  }
});

function updateMultiplier() {
  multiplierButton.textContent = `Multiplier x${multiplier} (${multiplierCost} cookies)`;
  multiplierLabel.textContent = multiplier;
}

function startAutoClick() {
  autoClickInterval = setInterval(function () {
    score += clickValue * multiplier;
    updateScore();
  }, 1000);
  autoClickLabel.textContent++;
}

function activateBonus() {
  clickValue *= 2;
  bonusLabel.textContent++;
  updateScore();
  bonusActivationCounter++;
  changeCookieImageOnBonus();
  bonusTimeout = setTimeout(function () {
    clickValue /= 2;
    bonusLabel.textContent--;
  }, 30000);
}

function checkCookies() {
  multiplierButton.disabled = score < multiplierCost;
  autoClickButton.disabled = score < autoClickCost;
  bonusButton.disabled = score < bonusCost;
}

document.addEventListener("DOMContentLoaded", function () {
  updateScore();
  updateMultiplier();
  checkCookies();
});

function updateScore() {
  scoreLabel.textContent = score.toLocaleString();
  checkCookies();
}

function changeCookieImageAll(index) {
  for (let i = 1; i <= 4; i++) {
    let lumpIcon = document.getElementById(`lumpsIcon${i}`);
    lumpIcon.style.backgroundImage = `url(image/index${index}/SuperCookieImage${i}.png)`;
  }
}



function activateBonus() {
  clickValue *= 2;
  bonusLabel.textContent++;
  updateScore();
  bonusActivationCounter++;
  changeCookieImageOnBonus();
  bonusTimeout = setTimeout(function () {
      clickValue /= 2;
      bonusLabel.textContent--;
      deactivateBonusAnimation(); // Désactiver l'animation lorsque le bonus expire
  }, 30000);

  activateBonusAnimation(); // Activer l'animation lorsque le bonus est activé
}

function deactivateBonus() {
  clearTimeout(bonusTimeout); // Annuler le timeout du bonus si désactivé manuellement
  clickValue /= 2;
  bonusLabel.textContent--;
  deactivateBonusAnimation(); // Désactiver l'animation lorsque le bonus est désactivé manuellement
}

function activateBonusAnimation() {
  if (!isAnimationActive) { // Vérifie si l'animation n'est pas déjà active
      sprite.style.display = 'block'; // Affiche l'animation lorsque le bonus est activé
      isAnimationActive = true; // Met à jour l'état de l'animation
  }
}

function deactivateBonusAnimation() {
  if (isAnimationActive) { // Vérifie si l'animation est active
      sprite.style.display = 'none'; // Cache l'animation lorsque le bonus n'est pas actif
      isAnimationActive = false; // Met à jour l'état de l'animation
  }
}


function changeCookieImageOnBonus() {
  if (bonusActivationCounter >= 1 && bonusActivationCounter <= 5) {
      changeCookieImageAll(1);
  } else if (bonusActivationCounter > 5 && bonusActivationCounter <= 10) {
      changeCookieImageAll(2);
  } else if (bonusActivationCounter > 10) {
      activateBonusAnimation(); // Activer l'animation lorsque le bonus est supérieur à 10
  } else {
      changeCookieImageAll(3);
      deactivateBonusAnimation(); // Désactiver l'animation si bonusActivationCounter ne correspond à aucun cas
  }
}

// Autres fonctions JavaScript nécessaires ici...
// Code à exécuter lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function () {
  updateScore();
  updateMultiplier();
  checkCookies();
});
