//loufti update 25-06-2024
// Initialisation des variables
let score = 0; // Score initial
let clickValue = 1; // Valeur de chaque clic
let multiplier = 1; // Multiplicateur initial
let multiplierCost = 10; // Coût initial pour augmenter le multiplicateur
let autoClickCost = 100; // Coût initial pour activer l'auto-clic
let bonusCost = 200; // Coût initial pour activer le bonus
let autoClickInterval; // Variable pour stocker l'intervalle d'auto-clic
let bonusTimeout; // Variable pour stocker le timeout du bonus
let clickCounter = 0; // Compteur de clics
let bonusActivationCounter = 0; // Compteur d'activation du bonus
let imageIndex = 0; // Index des images
let autoClickCount = 0; // Variable pour suivre le nombre d'auto-clics
let bonusActive = false; // Variable pour vérifier si le bonus est actif
let isAnimationActive = false; // Variable pour suivre l'état de l'animation

// Sélection des éléments HTML
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

// Fonction appelée lors du clic sur un cookie
function clickLump(element) {
  score += clickValue * multiplier; // Augmente le score en fonction de la valeur du clic et du multiplicateur
  updateScore(); // Met à jour l'affichage du score
  showFloatingText(element, "+1"); // Affiche le texte flottant "+1"
}

// Fonction pour afficher un texte flottant
function showFloatingText(element, text) {
  const floatingText = document.createElement("div");
  floatingText.className = "floatingText";
  floatingText.innerText = text;
  element.appendChild(floatingText);
  setTimeout(() => {
    element.removeChild(floatingText);
  }, 1000); // Retire le texte flottant après 1 seconde
}

// Fonction pour gérer le clic sur le bouton de multiplicateur
multiplierButton.addEventListener("click", function () {
  if (score >= multiplierCost && multiplier < 5) {
    // Vérifie si le score est suffisant et si le multiplicateur est inférieur à 5
    score -= multiplierCost; // Diminue le score du coût du multiplicateur
    multiplier++; // Augmente le multiplicateur
    clickValue *= 2; // Double la valeur de chaque clic
    multiplierCost *= 2; // Double le coût du multiplicateur
    updateScore(); // Met à jour l'affichage du score
    updateMultiplier(); // Met à jour l'affichage du multiplicateur
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
    score -= bonusCost; // Diminue le score du coût du bonus
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

// Ajout d'écouteurs d'événements pour les boutons d'arrêt
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
    // Vérifie si l'auto-clic n'est pas déjà actif
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
  updateScore(); // Met à jour l'affichage du score
  bonusActivationCounter++; // Incrémente le compteur d'activation du bonus
  bonusActive = true; // Activer le bonus
  changeCookieImageOnBonus(); // Change l'image des cookies
  bonusTimeout = setTimeout(function () {
    clickValue /= 2; // Réinitialise la valeur de chaque clic
    bonusLabel.textContent--; // Décrémente le nombre de bonus actifs
    deactivateBonusAnimation(); // Désactiver l'animation lorsque le bonus expire
    bonusActive = false; // Désactiver le bonus
  }, 30000); // Le bonus dure 30 secondes

  activateBonusAnimation(); // Activer l'animation lorsque le bonus est activé
}

// Fonction pour vérifier le score et désactiver les boutons si nécessaire
function checkCookies() {
  multiplierButton.disabled = score < multiplierCost; // Désactive le bouton si le score est insuffisant
  autoClickButton.disabled = score < autoClickCost; // Désactive le bouton si le score est insuffisant
  bonusButton.disabled = score < bonusCost; // Désactive le bouton si le score est insuffisant
}

// Code à exécuter lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function () {
  updateScore(); // Met à jour l'affichage du score
  updateMultiplier(); // Met à jour l'affichage du multiplicateur
  checkCookies(); // Vérifie le score et désactive les boutons si nécessaire
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
  clearTimeout(bonusTimeout); // Annuler le timeout du bonus si désactivé manuellement
  clickValue /= 2; // Réinitialise la valeur de chaque clic
  bonusLabel.textContent--; // Décrémente le nombre de bonus actifs
  deactivateBonusAnimation(); // Désactiver l'animation lorsque le bonus est désactivé manuellement
}

// Fonction pour activer l'animation de bonus
function activateBonusAnimation() {
  if (!isAnimationActive) {
    // Vérifie si l'animation n'est pas déjà active
    sprite.style.display = "block"; // Affiche l'animation lorsque le bonus est activé
    isAnimationActive = true; // Met à jour l'état de l'animation
  }
}

// Fonction pour désactiver l'animation de bonus
function deactivateBonusAnimation() {
  if (isAnimationActive) {
    // Vérifie si l'animation est active
    sprite.style.display = "none"; // Cache l'animation lorsque le bonus n'est pas actif
    isAnimationActive = false; // Met à jour l'état de l'animation
  }
}

// Fonction pour changer l'image des cookies lors de l'activation du bonus
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

// Fonction pour arrêter l'auto-clic
function stopAutoClick() {
  clearInterval(autoClickInterval); // Arrête l'intervalle d'auto-clic
  autoClickInterval = null; // Réinitialise l'intervalle
  autoClickCount = 0; // Réinitialise le nombre d'auto-clics
  autoClickLabel.textContent = autoClickCount; // Met à jour l'affichage des auto-clics
}

// Fonction pour arrêter le multiplicateur
function stopMultiplier() {
  multiplier = 1; // Réinitialise le multiplicateur à 1
  multiplierLabel.textContent = multiplier; // Met à jour l'affichage du multiplicateur
}

// Fonction pour arrêter le bonus
function stopBonus() {
  clearTimeout(bonusTimeout); // Arrête le temps du bonus
  multiplier = 1; // Réinitialise le multiplicateur à 1
  bonusActive = false; // Désactive le bonus
  bonusLabel.textContent--; // Met à jour l'affichage des bonus
  deactivateBonusAnimation(); // Désactiver l'animation lorsque le bonus est désactivé
}

// Autres fonctions JavaScript nécessaires ici...
// Code à exécuter lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function () {
  updateScore();
  updateMultiplier();
  checkCookies();
});
