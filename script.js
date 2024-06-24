let score = 0;
let clickValue = 1;
let multiplier = 1;
let multiplierCost = 10;
let autoClickCost = 100;
let bonusCost = 200;
let autoClickInterval;
let bonusTimeout;

const scoreLabel = document.getElementById('scoreValue');
const multiplierLabel = document.getElementById('multiplierValue');
const multiplierButton = document.getElementById('multiplierButton');
const autoClickButton = document.getElementById('autoClickButton');
const bonusButton = document.getElementById('bonusButton');

// Click on the cookie
document.getElementById('cookie').addEventListener('click', function () {
    score += clickValue * multiplier;
    updateScore();
});

// Buy multiplier
multiplierButton.addEventListener('click', function () {
    if (score >= multiplierCost) {
        score -= multiplierCost;
        multiplier++;
        clickValue *= 2;
        multiplierCost *= 2;
        updateScore();
        updateMultiplier();
        checkCookies(); // Vérifier si les boutons doivent être désactivés
    } else {
        alert("Not enough cookies!");
    }
});

// Buy auto-clicker
autoClickButton.addEventListener('click', function () {
    if (score >= autoClickCost) {
        score -= autoClickCost;
        autoClickCost *= 2;
        updateScore();
        startAutoClick();
        checkCookies(); // Vérifier si les boutons doivent être désactivés
    } else {
        alert("Not enough cookies!");
    }
});

// Buy bonus
bonusButton.addEventListener('click', function () {
    if (score >= bonusCost) {
        score -= bonusCost;
        updateScore();
        activateBonus();
        checkCookies(); // Vérifier si les boutons doivent être désactivés
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
}

// Bonus functionality
function activateBonus() {
    clickValue *= 2; // Double the click value for 30 seconds
    updateScore();

    // Timer for bonus duration
    setTimeout(function () {
        clickValue /= 2; // Reset click value after bonus expires
    }, 30000);
}

// Disable buttons if not enough cookies
function checkCookies() {
    multiplierButton.disabled = score < multiplierCost;
    autoClickButton.disabled = score < autoClickCost;
    bonusButton.disabled = score < bonusCost;
}

// Mettre à jour l'horloge toutes les secondes
var timer;
var ele = document.getElementById('timer');

(function (){
    var sec = 0;
    timer= setInterval(()=>{
        ele.innerHTML = '00:'+sec;
        sec ++;
    }, 1000)
})()

// Exécuter les vérifications initiales
updateScore();
updateMultiplier();
checkCookies();

