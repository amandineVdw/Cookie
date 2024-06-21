// Variables globales pour suivre le score, le multiplicateur, le nombre de clics automatiques, le nombre de bonus, et l'état des fonctions
let score = 0;
let multiplier = 1;
let autoClickCount = 0;
let bonusCount = 0;
let bonusActive = false;
let autoClickInterval = null;
let bonusTimeout = null;

// Sélection des éléments HTML
let scoreValue = document.getElementById('scoreValue');
let multiplierButton = document.getElementById('multiplierButton');
let multiplierValue = document.getElementById('multiplierValue');
let autoClickButton = document.getElementById('autoClickButton');
let autoClickValue = document.getElementById('autoClickValue');
let bonusButton = document.getElementById('bonusButton');
let bonusValue = document.getElementById('bonusValue');
let cookieButton = document.getElementById('cookie');
let stopMultiplierButton = document.getElementById('stopMultiplierButton');
let stopAutoClickButton = document.getElementById('stopAutoClickButton');
let stopBonusButton = document.getElementById('stopBonusButton');

// Fonction pour mettre à jour l'affichage du score
function updateScore() {
    scoreValue.textContent = score;
}

// Fonction pour gérer les clics sur le bouton "cookie"
function handleCookieClick() {
    // Ajoute des cookies en fonction du multiplicateur
    score = score + multiplier;
    // Si le bonus est actif, double le score
    if (bonusActive) {
        score = score * 2;
    }
    // Met à jour l'affichage du score
    updateScore();
    // Vérifie si un bonus peut être activé
    checkBonusActivation();
}

// Ajouter un écouteur d'événement pour le bouton "cookie"
cookieButton.addEventListener('click', handleCookieClick);

// Fonction pour gérer l'achat du multiplicateur
function handleMultiplierPurchase() {
    // Vérifie si le score est suffisant et si le multiplicateur est inférieur à 5
    if (score >= 10 && multiplier < 5) {
        // Déduit 10 cookies du score
        score = score - 10;
        // Augmente le multiplicateur
        multiplier = multiplier + 1;
        // Met à jour l'affichage du multiplicateur
        multiplierValue.textContent = multiplier;
        // Met à jour l'affichage du score
        updateScore();
        // Vérifie si un bonus peut être activé
        checkBonusActivation();
    }
}

// Ajouter un écouteur d'événement pour le bouton du multiplicateur
multiplierButton.addEventListener('click', handleMultiplierPurchase);

// Fonction pour arrêter le multiplicateur
function stopMultiplier() {
    // Réinitialise le multiplicateur à 1
    multiplier = 1;
    // Met à jour l'affichage du multiplicateur
    multiplierValue.textContent = multiplier;
}

// Ajouter un écouteur d'événement pour le bouton d'arrêt du multiplicateur
stopMultiplierButton.addEventListener('click', stopMultiplier);

// Fonction pour gérer l'achat de l'auto-clic
function handleAutoClickPurchase() {
    // Vérifie si le score est suffisant
    if (score >= 100) {
        // Déduit 100 cookies du score
        score = score - 100;
        // Augmente le nombre d'auto-clics
        autoClickCount = autoClickCount + 1;
        // Met à jour l'affichage des auto-clics
        autoClickValue.textContent = autoClickCount;
        // Met à jour l'affichage du score
        updateScore();
        // Si l'auto-clic n'est pas déjà actif
        if (autoClickInterval === null) {
            // Définit un intervalle qui ajoute des cookies automatiquement toutes les secondes
            autoClickInterval = setInterval(function() {
                // Ajoute des cookies en fonction du multiplicateur
                score *= multiplier;
                // Si le bonus est actif, double le score
                if (bonusActive) {
                    score *= 2;
                }
                // Met à jour l'affichage du score
                updateScore();
                // Vérifie si un bonus peut être activé
                checkBonusActivation();
            }, 1000); // Répète toutes les secondes
        }
    }
}

// Ajouter un écouteur d'événement pour le bouton d'achat de l'auto-clic
autoClickButton.addEventListener('click', handleAutoClickPurchase);

// Fonction pour arrêter l'auto-clic
function stopAutoClick() {
    // Arrête l'intervalle d'auto-clic
    clearInterval(autoClickInterval);
    // Réinitialise l'intervalle
    autoClickInterval = null;
    // Réinitialise le nombre d'auto-clics
    autoClickCount = 0;
    // Met à jour l'affichage des auto-clics
    autoClickValue.textContent = autoClickCount;
}

// Ajouter un écouteur d'événement pour le bouton d'arrêt de l'auto-clic
stopAutoClickButton.addEventListener('click', stopAutoClick);

// Fonction pour gérer l'activation du bonus
function handleBonusActivation() {
    // Vérifie si le score est suffisant et si le bonus n'est pas déjà actif
    if (score >= 200 && bonusActive === false) {
        // Déduit 200 cookies du score
        score = score - 200;
        // Active le bonus
        bonusActive = true;
        // Augmente le nombre de bonus
        bonusCount = bonusCount + 1;
        // Met à jour l'affichage des bonus
        bonusValue.textContent = bonusCount;
        // Met à jour l'affichage du score
        updateScore();
        // Active le bonus
        activateBonus();
    }
}

// Ajouter un écouteur d'événement pour le bouton d'activation du bonus
bonusButton.addEventListener('click', handleBonusActivation);

// Fonction pour arrêter le bonus
function stopBonus() {
    // Arrête le temps du bonus
    clearTimeout(bonusTimeout);
    // Réinitialise le multiplicateur à 1
    multiplier = 1;
    // Désactive le bonus
    bonusActive = false;
    // Met à jour l'affichage des bonus
    bonusValue.textContent = bonusCount;
    // Vérifie si un bonus peut être activé
    checkBonusActivation();
}

// Ajouter un écouteur d'événement pour le bouton d'arrêt du bonus
stopBonusButton.addEventListener('click', stopBonus);

// Fonction pour activer le bonus
function activateBonus() {
    // Définit un délai après lequel le bonus sera désactivé
    bonusTimeout = setTimeout(function() {
        // Réinitialise le multiplicateur après 30 secondes
        multiplier = 1;
        // Désactive le bonus
        bonusActive = false;
        // Vérifie si un bonus peut être activé
        checkBonusActivation();
    }, 30000); // 30 secondes
}

// Fonction pour vérifier si un nouveau bonus peut être activé
function checkBonusActivation() {
    // Si le score est suffisant et que le bonus n'est pas déjà actif
    bonusButton.disabled = !(score >= 200 && bonusActive === false);
}

// Vérification initiale lors du chargement de la page
checkBonusActivation();
updateScore();