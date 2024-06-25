// Initialisation des variables
let score = 0; // Score initial
let clickValue = 1; // Valeur de chaque clic
let multiplier = 1; // Multiplicateur initial
let multiplierCost = 10; // CoÃ»t initial pour augmenter le multiplicateur
let autoClickCost = 100; // CoÃ»t initial pour activer l'auto-clic
let bonusCost = 200; // CoÃ»t initial pour activer le bonus
let autoClickInterval; // Variable pour stocker l'intervalle d'auto-clic
let bonusTimeout; // Variable pour stocker le timeout du bonus
let clickCounter = 0; // Compteur de clics
let bonusActivationCounter = 0; // Compteur d'activation du bonus
let imageIndex = 0; // Index des images
let autoClickCount = 0; // Variable pour suivre le nombre d'auto-clics
let bonusActive = false; // Variable pour vÃ©rifier si le bonus est actif
let isAnimationActive = false; // Variable pour suivre l'Ã©tat de l'animation


// SÃ©lection des Ã©lÃ©ments HTML
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


// Fonction appelÃ©e lors du clic sur un cookie
function clickLump(element) {
 score += clickValue * multiplier; // Augmente le score en fonction de la valeur du clic et du multiplicateur
 updateScore(); // Met Ã  jour l'affichage du score
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
 }, 1000); // Retire le texte flottant aprÃ¨s 1 seconde
}


// Fonction pour gÃ©rer le clic sur le bouton de multiplicateur
multiplierButton.addEventListener("click", function () {
 if (score >= multiplierCost && multiplier < 5) {
   // VÃ©rifie si le score est suffisant et si le multiplicateur est infÃ©rieur Ã  5
   score -= multiplierCost; // Diminue le score du coÃ»t du multiplicateur
   multiplier++; // Augmente le multiplicateur
   clickValue *= 2; // Double la valeur de chaque clic
   multiplierCost *= 2; // Double le coÃ»t du multiplicateur
   updateScore(); // Met Ã  jour l'affichage du score
   updateMultiplier(); // Met Ã  jour l'affichage du multiplicateur
 } else if (multiplier >= 5) {
   alert("Niveau max atteint!"); // Alerte lorsque le multiplicateur atteint le niveau maximum
 } else {
   alert("Pas assez de cookies!"); // Alerte lorsque le score est insuffisant
 }
});


// Fonction pour gÃ©rer le clic sur le bouton d'auto-clic
autoClickButton.addEventListener("click", function () {
 if (score >= autoClickCost) {
   // VÃ©rifie si le score est suffisant
   score -= autoClickCost; // Diminue le score du coÃ»t de l'auto-clic
   autoClickCost *= 2; // Double le coÃ»t de l'auto-clic
   updateScore(); // Met Ã  jour l'affichage du score
   startAutoClick(); // DÃ©marre l'auto-clic
 } else {
   alert("Pas assez de cookies!"); // Alerte lorsque le score est insuffisant
 }
});


// Fonction pour gÃ©rer le clic sur le bouton de bonus
bonusButton.addEventListener("click", function () {
 if (score >= bonusCost) {
   // VÃ©rifie si le score est suffisant
   score -= bonusCost; // Diminue le score du coÃ»t du bonus
   updateScore(); // Met Ã  jour l'affichage du score
   activateBonus(); // Active le bonus
   bonusButton.classList.add("animate");
   setTimeout(() => {
     bonusButton.classList.remove("animate");
   }, 600); // Retire l'animation aprÃ¨s 0.6 seconde
 } else {
   alert("Pas assez de cookies!"); // Alerte lorsque le score est insuffisant
 }
});


// Ajout d'Ã©couteurs d'Ã©vÃ©nements pour les boutons d'arrÃªt
stopAutoClickButton.addEventListener("click", stopAutoClick);
stopMultiplierButton.addEventListener("click", stopMultiplier);
stopBonusButton.addEventListener("click", stopBonus);


// Fonction pour mettre Ã  jour l'affichage du multiplicateur
function updateMultiplier() {
 multiplierButton.textContent = `Multiplier x${multiplier} (${multiplierCost} cookies)`;
 multiplierLabel.textContent = multiplier;
}


// Fonction pour dÃ©marrer l'auto-clic
function startAutoClick() {
 if (!autoClickInterval) {
   // VÃ©rifie si l'auto-clic n'est pas dÃ©jÃ  actif
   autoClickInterval = setInterval(function () {
     score += clickValue * multiplier; // Augmente le score en fonction de la valeur du clic et du multiplicateur
     updateScore(); // Met Ã  jour l'affichage du score
   }, 1000); // ExÃ©cute toutes les secondes
   autoClickCount++; // IncrÃ©mente le nombre d'auto-clics
   autoClickLabel.textContent = autoClickCount; // Met Ã  jour l'affichage des auto-clics
 }
}


// Fonction pour activer le bonus
function activateBonus() {
 clickValue *= 2; // Double la valeur de chaque clic
 bonusLabel.textContent++; // IncrÃ©mente le nombre de bonus actifs
 updateScore(); // Met Ã  jour l'affichage du score
 bonusActivationCounter++; // IncrÃ©mente le compteur d'activation du bonus
 bonusActive = true; // Activer le bonus
 changeCookieImageOnBonus(); // Change l'image des cookies
 bonusTimeout = setTimeout(function () {
   clickValue /= 2; // RÃ©initialise la valeur de chaque clic
   bonusLabel.textContent--; // DÃ©crÃ©mente le nombre de bonus actifs
   deactivateBonusAnimation(); // DÃ©sactiver l'animation lorsque le bonus expire
   bonusActive = false; // DÃ©sactiver le bonus
 }, 30000); // Le bonus dure 30 secondes


 activateBonusAnimation(); // Activer l'animation lorsque le bonus est activÃ©
}


// Fonction pour vÃ©rifier le score et dÃ©sactiver les boutons si nÃ©cessaire
function checkCookies() {
 multiplierButton.disabled = score < multiplierCost; // DÃ©sactive le bouton si le score est insuffisant
 autoClickButton.disabled = score < autoClickCost; // DÃ©sactive le bouton si le score est insuffisant
 bonusButton.disabled = score < bonusCost; // DÃ©sactive le bouton si le score est insuffisant
}


// Code Ã  exÃ©cuter lorsque la page est chargÃ©e
document.addEventListener("DOMContentLoaded", function () {
 updateScore(); // Met Ã  jour l'affichage du score
 updateMultiplier(); // Met Ã  jour l'affichage du multiplicateur
 checkCookies(); // VÃ©rifie le score et dÃ©sactive les boutons si nÃ©cessaire
});


// Fonction pour mettre Ã  jour l'affichage du score
function updateScore() {
 scoreLabel.textContent = score.toLocaleString(); // Affiche le score avec des sÃ©parateurs de milliers
 checkCookies(); // VÃ©rifie le score et dÃ©sactive les boutons si nÃ©cessaire
}


// Fonction pour changer l'image de tous les cookies
function changeCookieImageAll(index) {
 for (let i = 1; i <= 4; i++) {
   let lumpIcon = document.getElementById(`lumpsIcon${i}`);
   lumpIcon.style.backgroundImage = `url(image/index${index}/SuperCookieImage${i}.png)`;
 }
}


// Fonction pour dÃ©sactiver le bonus
function deactivateBonus() {
 clearTimeout(bonusTimeout); // Annuler le timeout du bonus si dÃ©sactivÃ© manuellement
 clickValue /= 2; // RÃ©initialise la valeur de chaque clic
 bonusLabel.textContent--; // DÃ©crÃ©mente le nombre de bonus actifs
 deactivateBonusAnimation(); // DÃ©sactiver l'animation lorsque le bonus est dÃ©sactivÃ© manuellement
}


// Fonction pour activer l'animation de bonus
function activateBonusAnimation() {
 if (!isAnimationActive) {
   // VÃ©rifie si l'animation n'est pas dÃ©jÃ  active
   sprite.style.display = "block"; // Affiche l'animation lorsque le bonus est activÃ©
   isAnimationActive = true; // Met Ã  jour l'Ã©tat de l'animation
 }
}


// Fonction pour dÃ©sactiver l'animation de bonus
function deactivateBonusAnimation() {
 if (isAnimationActive) {
   // VÃ©rifie si l'animation est active
   sprite.style.display = "none"; // Cache l'animation lorsque le bonus n'est pas actif
   isAnimationActive = false; // Met Ã  jour l'Ã©tat de l'animation
 }
}


// Fonction pour changer l'image des cookies lors de l'activation du bonus
function changeCookieImageOnBonus() {
 if (bonusActivationCounter >= 1 && bonusActivationCounter <= 5) {
   changeCookieImageAll(1);
 } else if (bonusActivationCounter > 5 && bonusActivationCounter <= 10) {
   changeCookieImageAll(2);
 } else if (bonusActivationCounter > 10) {
   activateBonusAnimation(); // Activer l'animation lorsque le bonus est supÃ©rieur Ã  10
 } else {
   changeCookieImageAll(3);
   deactivateBonusAnimation(); // DÃ©sactiver l'animation si bonusActivationCounter ne correspond Ã  aucun cas
 }
}


// Fonction pour arrÃªter l'auto-clic
function stopAutoClick() {
 clearInterval(autoClickInterval); // ArrÃªte l'intervalle d'auto-clic
 autoClickInterval = null; // RÃ©initialise l'intervalle
 autoClickCount = 0; // RÃ©initialise le nombre d'auto-clics
 autoClickLabel.textContent = autoClickCount; // Met Ã  jour l'affichage des auto-clics
}


// Fonction pour arrÃªter le multiplicateur
function stopMultiplier() {
 multiplier = 1; // RÃ©initialise le multiplicateur Ã  1
 multiplierLabel.textContent = multiplier; // Met Ã  jour l'affichage du multiplicateur
}


// Fonction pour arrÃªter le bonus
function stopBonus() {
 clearTimeout(bonusTimeout); // ArrÃªte le temps du bonus
 multiplier = 1; // RÃ©initialise le multiplicateur Ã  1
 bonusActive = false; // DÃ©sactive le bonus
 bonusLabel.textContent--; // Met Ã  jour l'affichage des bonus
 deactivateBonusAnimation(); // DÃ©sactiver l'animation lorsque le bonus est dÃ©sactivÃ©
}


// Fonction pour dÃ©marrer le chronomÃ¨tre
function startTimer() {
 let startTime = Date.now();


 function updateTimer() {
   const timerElement = document.getElementById('timer');
   let elapsedTime = Date.now() - startTime;


   let totalSeconds = Math.floor(elapsedTime / 1000);
   let minutes = Math.floor(totalSeconds / 60);
   let seconds = totalSeconds % 60;


   minutes = String(minutes).padStart(2, '0');
   seconds = String(seconds).padStart(2, '0');


   timerElement.textContent = `${minutes}:${seconds}`;
 }


 // Mettre Ã  jour le chronomÃ¨tre chaque seconde
 setInterval(updateTimer, 1000);
}


// DÃ©marrer le chronomÃ¨tre dÃ¨s que la page est chargÃ©e
window.onload = startTimer;

// Initialisation des variables et autres fonctions

// Récupérez l'élément audio
const clickSound = document.getElementById('clickSound');

// Fonction pour jouer le son
function playClickSound() {
  clickSound.currentTime = 0; // Rembobinez le son au début pour le jouer à chaque clic
  clickSound.volume = parseFloat(document.getElementById('volumeRange').value) / 100; // Récupère le volume à partir du range
  clickSound.play(); // Joue le son
}
// Code à exécuter lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function () {
  adjustVolume(); // Initialise le volume
  // Autres initialisations
});


// Autres fonctions JavaScript nÃ©cessaires ici...
// Code Ã  exÃ©cuter lorsque la page est chargÃ©e
document.addEventListener("DOMContentLoaded", function () {
 updateScore();
 updateMultiplier();
 checkCookies();
});
