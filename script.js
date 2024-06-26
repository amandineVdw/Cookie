// Initialisation des variables
let score = 0; // Score initial
let clickValue = 1; // Valeur de chaque clic
let multiplier = 1; // Multiplicateur initial
let multiplierCost = 10; // Cout initial pour augmenter le multiplicateur
let autoClickCost = 100; // Cout initial pour activer l'auto-clic
let bonusCost = 200; // Cout initial pour activer le bonus
let autoClickInterval; // Variable pour stocker l'intervalle d'auto-clic
let bonusTimeout; // Variable pour stocker le timeout du bonus
let clickCounter = 0; // Compteur de clics
let bonusActivationCounter = 0; // Compteur d'activation du bonus
let imageIndex = 0; // Index des images
let autoClickCount = 0; // Variable pour suivre le nombre d'auto-clics
let bonusActive = false; // Variable pour véifier si le bonus est actif
let isAnimationActive = false; // Variable pour suivre l'état de l'animation

// Sélection des élements HTML
const multiplierLabel = document.getElementById("multiplierValue");
const multiplierButton = document.getElementById("multiplierButton");
const autoClickLabel = document.getElementById("autoClickValue");
const autoClickButton = document.getElementById("autoClickButton");
const bonusLabel = document.getElementById("bonusValue");
const bonusButton = document.getElementById("bonusButton");
const scoreLabel = document.getElementById("lumpsScore");
const stopAutoClickButton = document.getElementById("stopAutoClickButton");
const stopMultiplierButton = document.getElementById("stopMultiplierButton");
const stopBonusButton = document.getElementById("stopBonusButton");
const sprite = document.getElementById("sprite");
const volumeValue = document.getElementById("volumeValue");
const modeCheckbox = document.getElementById("mode-nuit");

// Fonction appelée lors du clic sur un cookie
function clickLump(element) {
  score += clickValue * multiplier; // Augmente le score en fonction de la valeur du clic et du multiplicateur
  updateScore(); // Met à jour l'affichage du score
  showFloatingText(element, "+"); // Affiche le texte flottant "+1-cookie"
}

// Fonction pour afficher mini-cookie --> on-click
function showFloatingText(element, text) {
  const floatingText = document.createElement("div");
  floatingText.className = "floatingText";

  const iconImg = document.createElement("img");
  iconImg.src = "image/miniCookie.png"; // Chemin vers votre image locale
  iconImg.alt = "Cookie Clicker Icon";

  // Création d'un span pour contenir l'image et le texte
  const iconSpan = document.createElement("span");
  iconSpan.appendChild(iconImg);
  iconSpan.innerHTML += " " + text; // Ajoute le texte à côté de l'image

  floatingText.appendChild(iconSpan);
  element.appendChild(floatingText);

  setTimeout(() => {
    element.removeChild(floatingText);
  }, 1000); // Retire le texte flottant après 1 seconde
}

// fonction pour changer de back ground avec une checkBox
document.addEventListener("DOMContentLoaded", function () {
  const modeCheckbox = document.getElementById("mode-nuit");

  modeCheckbox.addEventListener("change", function () {
    if (modeCheckbox.checked) {
      document.body.classList.add("mode-nuit");
    } else {
      document.body.classList.remove("mode-nuit");
    }
  });
});

// Fonction pour gérer le clic sur le bouton de multiplicateur
multiplierButton.addEventListener("click", function () {
  if (score >= multiplierCost && multiplier < 5) {
    // Vérifie si le score est suffisant et si le multiplicateur est inférieur à  5
    score -= multiplierCost; // Diminue le score du coût du multiplicateur
    multiplier++; // Augmente le multiplicateur
    clickValue *= 2; // Double la valeur de chaque clic
    multiplierCost *= 2; // Double le  coût du multiplicateur
    updateScore(); // Met à  jour l'affichage du score
    updateMultiplier(); // Met à  jour l'affichage du multiplicateur
  } else if (multiplier >= 5) {
    alert("Niveau max atteint!"); // Alerte lorsque le multiplicateur atteint le niveau maximum
  } else {
    alert("Pas assez de cookies!"); // Alerte lorsque le score est insuffisant
  }
});

// Fonction pour gérer le clic sur le bouton d'auto-clic
autoClickButton.addEventListener("click", function () {
  if (score >= autoClickCost) {
    // Vérifie si le score est suffisant
    score -= autoClickCost; // Diminue le score du coût de l'auto-clic
    autoClickCost *= 2; // Double le coût de l'auto-clic
    updateScore(); // Met à jour l'affichage du score
    startAutoClick(); // Démarre l'auto-clic
  } else {
    alert("Pas assez de cookies!"); // Alerte lorsque le score est insuffisant
  }
});

// Fonction pour gérer le clic sur le bouton de bonus
bonusButton.addEventListener("click", function () {
  if (score >= bonusCost) {
    // Vérifie si le score est suffisant
    score -= bonusCost; // Diminue le score du coÃ»t du bonus
    updateScore(); // Met à jour l'affichage du score
    activateBonus(); // Active le bonus
    bonusButton.classList.add("animate");
    setTimeout(() => {
      bonusButton.classList.remove("animate");
    }, 600); // Retire l'animation après 0.6 seconde
  } else {
    alert("Pas assez de cookies!"); // Alerte lorsque le score est insuffisant
  }
});

// Ajout d'écouteurs d'évenements pour les boutons d'arrét
stopAutoClickButton.addEventListener("click", stopAutoClick);
stopMultiplierButton.addEventListener("click", stopMultiplier);
stopBonusButton.addEventListener("click", stopBonus);

// Fonction pour mettre à jour l'affichage du multiplicateur
function updateMultiplier() {
  multiplierButton.textContent = `Multiplier x${multiplier} (${multiplierCost} cookies)`;
  multiplierLabel.textContent = multiplier;
}

// Fonction pour démarrer l'auto-clic
function startAutoClick() {
  if (!autoClickInterval) {
    // Vérifie si l'auto-clic n'est pas déja  actif
    autoClickInterval = setInterval(function () {
      score += clickValue * multiplier; // Augmente le score en fonction de la valeur du clic et du multiplicateur
      updateScore(); // Met à jour l'affichage du score
    }, 1000); // Exécute toutes les secondes
    autoClickCount++; // Incrémente le nombre d'auto-clics
    autoClickLabel.textContent = autoClickCount; // Met à jour l'affichage des auto-clics
  }
}

// Fonction pour activer le bonus
function activateBonus() {
  clickValue *= 2; // Double la valeur de chaque clic
  bonusLabel.textContent++; // Incrémente le nombre de bonus actifs
  updateScore();
  bonusActivationCounter++; // Incrémente le compteur d'activation du bonus
  bonusActive = true; // Activer le bonus
  changeCookieImageOnBonus(); // Change l'image des cookies
  bonusTimeout = setTimeout(function () {
    clickValue /= 2; // Réinitialise la valeur de chaque clic
    bonusLabel.textContent--; // Décrémente le nombre de bonus actifs
    deactivateBonusAnimation(); // Désactiver l'animation lorsque le bonus expire
    bonusActive = false; // Désactiver le bonus
  }, 30000); // Le bonus dure 30 secondes

  activateBonusAnimation(); // Activer l'animation lorsque le bonus est activÃ©
}

// Fonction pour vérifier le score et désactiver les boutons si nécessaire
// Désactive le bouton si le score est insuffisant
function checkCookies() {
  multiplierButton.disabled = score < multiplierCost;
  autoClickButton.disabled = score < autoClickCost;
  bonusButton.disabled = score < bonusCost;
}

// Code à exécuter lorsque la page est chargée
//met à jours
document.addEventListener("DOMContentLoaded", function () {
  updateScore();
  updateMultiplier();
  checkCookies();
});

// Fonction pour mettre à jour l'affichage du score

function updateScore() {
  scoreLabel.textContent = score.toLocaleString(); // Affiche le score avec des séparateurs de milliers
  checkCookies(); // Vérifie le score et désactive les boutons si nécessaire
}

// Fonction pour changer l'image de tous les cookies
function changeCookieImageAll(index) {
  for (let i = 1; i <= 4; i++) {
    let lumpIcon = document.getElementById(`lumpsIcon${i}`);
    lumpIcon.style.backgroundImage = `url(image/index${index}/SuperCookieImage${i}.png)`;
  }
}

// Fonction pour désactiver le bonus
function deactivateBonus() {
  clearTimeout(bonusTimeout);
  clickValue /= 2;
  bonusLabel.textContent--;
  deactivateBonusAnimation();
}

// Fonction pour activer l'animation de bonus
function activateBonusAnimation() {
  if (!isAnimationActive) {
    sprite.style.display = "block";
    isAnimationActive = true;
  }
}

// Fonction pour désactiver l'animation de bonus
function deactivateBonusAnimation() {
  if (isAnimationActive) {
    sprite.style.display = "none"; // Cache l'animation lorsque le bonus n'est pas actif
    isAnimationActive = false;
  }
}

// Fonction pour changer l'image des cookies lors de l'activation du bonus
function changeCookieImageOnBonus() {
  if (bonusActivationCounter >= 1 && bonusActivationCounter <= 5) {
    changeCookieImageAll(1);
  } else if (bonusActivationCounter > 5 && bonusActivationCounter <= 10) {
    changeCookieImageAll(2);
  } else if (bonusActivationCounter > 10) {
    activateBonusAnimation();
  } else {
    changeCookieImageAll(3);
    deactivateBonusAnimation();
  }
}

// Fonction pour arréter l'auto-clic  --> stop-on-click
function stopAutoClick() {
  clearInterval(autoClickInterval);
  autoClickInterval = null;
  autoClickCount = 0;
  autoClickLabel.textContent = autoClickCount;
}

// Fonction pour arréter le multiplicateur --> stop-on-click
function stopMultiplier() {
  multiplier = 1;
  multiplierLabel.textContent = multiplier;
}

// Fonction pour arréter le bonus --> stop-on-click
function stopBonus() {
  clearTimeout(bonusTimeout);
  multiplier = 1;
  bonusActive = false;
  bonusLabel.textContent--;
  deactivateBonusAnimation();
}

// Fonction pour démarrer le chronométre
function startTimer() {
  let startTime = Date.now();

  function updateTimer() {
    const timerElement = document.getElementById("timer");
    let elapsedTime = Date.now() - startTime;

    let totalSeconds = Math.floor(elapsedTime / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timerElement.textContent = `${minutes}:${seconds}`;
  }

  // Mettre à jour le chronométre chaque seconde
  setInterval(updateTimer, 1000);
}

// Démarrer le chronométre quand la page est chargée
window.onload = startTimer;

// Initialisation des variables et autres fonctions

// Récupérez l'élément audio
const gameSound = new Audio("/audio/fond.mp3");

// Fonction pour jouer le son
function playGameSound() {
  gameSound.currentTime = 0; // Rembobinez le son au début pour le jouer à chaque clic
  gameSound.volume =
    parseFloat(document.getElementById("volumeRange").value) / 100; // Récupère le volume à partir du range
  gameSound.play(); // Joue le son
}

// Fonction pour ajuster le volume
function adjustVolume() {
  const volumeValue = document.getElementById("volumeRange").value;
  document.getElementById("volumeValue").textContent = volumeValue;

  clickSound.volume = parseFloat(volumeValue) / 100; // Met à jour le volume du son
}

// Fonction pour arrêter le son
function stopGameSound() {
  gameSound.pause();
  gameSound.currentTime = 0;
}
// Fonction pour jouer le beep on-click
function beep() {
  var beep = new Audio();
  beep.src = "/audio/beep.mp3";
  beep.play();
}

// Ajout d'un écouteur d'évenement pour le bouton d'activation du son
document.getElementById("startSound").addEventListener("click", playGameSound);

// Ajout d'un écouteur d'événement pour le bouton d'arrêt du son
document.getElementById("stopSound").addEventListener("click", stopGameSound);

// Code à  exécuter lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function () {
  updateScore();
  updateMultiplier();
  checkCookies();
  adjustVolume();
  playGameSound();
  stopGameSound();
  beep();
});
