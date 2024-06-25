//Tester la compatibilité en Javascript-Voici une petite fonction javascript pour tester, si le navigateur reconnait les animations CSS3.

function haveAnimation() {
  var animation = false,
    domPrefixes = ["Webkit", "Moz", "O", "ms", "Khtml"],
    elm = document.createElement("span");
  if (typeof elm.style["animationName"] != "undefined") {
    return true;
  }
  for (var i = 0; i < 5; i++) {
    if (typeof elm.style[domPrefixes[i] + "AnimationName"] != "undefined") {
      return true;
    }
  }
  return false;
}
console.log(haveAnimation);

// Variables globales pour suivre le score, le multiplicateur, le nombre de clics automatiques, le nombre de bonus, et l'état des fonctions
let score = 0;
let multiplier = 1;
let autoClickCount = 0;
let bonusCount = 0;
let bonusActive = false;
let autoClickInterval = null;
let bonusTimeout = null;
let timer;
let ele = document.getElementById("timer");
let imageIndex = 0;
let bonusActivationCounter = 0;

// Sélection des éléments HTML
let scoreValue = document.getElementById("scoreValue");
let multiplierButton = document.getElementById("multiplierButton");
let multiplierValue = document.getElementById("multiplierValue");
let autoClickButton = document.getElementById("autoClickButton");
let autoClickValue = document.getElementById("autoClickValue");
let bonusButton = document.getElementById("bonusButton");
let bonusValue = document.getElementById("bonusValue");
let cookieClick = document.getElementById("cookie"); //Amandine update 24-06
let stopMultiplierButton = document.getElementById("stopMultiplierButton");
let stopAutoClickButton = document.getElementById("stopAutoClickButton");
let stopBonusButton = document.getElementById("stopBonusButton");
let scoreLabel = document.getElementById("scoreValue");
let sprite = document.getElementById("spriteSuperCookie");
let isAnimationActive = false; // Variable pour suivre l'état de l'animation



//Amandine Update 24-06
// Fonction pour gérer les clics sur le bouton "cookie" + update score + 
function handleCookieClick(element) {
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
  } else {git 
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

/** END CORRECTION*/






function handleCookieClick() {
  score += multiplier;
  if (bonusActive) {
    score *= 2;
  }
  updateScore();
  checkBonusActivation();
}

cookie.addEventListener("click", handleCookieClick);

function handleMultiplierPurchase() {
  if (score >= 10 && multiplier < 5) {
    score -= 10;
    multiplier += 1;
    multiplierValue.textContent = multiplier;
    updateScore();
    checkBonusActivation();
  }
}


multiplierButton.addEventListener("click", handleMultiplierPurchase);


function stopMultiplier() {
  multiplier = 1;
  multiplierValue.textContent = multiplier;
}

stopMultiplierButton.addEventListener("click", stopMultiplier);

function handleAutoClickPurchase() {
  if (score >= 100) {
    score -= 100;
    autoClickCount += 1;
    autoClickValue.textContent = autoClickCount;
    updateScore();
    if (autoClickInterval === null) {
      autoClickInterval = setInterval(function () {
        score += multiplier;
        if (bonusActive) {
          score *= 2;
        }
        updateScore();
        checkBonusActivation();
      }, 1000); 
    }
  }
}


autoClickButton.addEventListener("click", handleAutoClickPurchase);

function stopAutoClick() {
  clearInterval(autoClickInterval);
  autoClickInterval = null;
  autoClickCount = 0;
  autoClickValue.textContent = autoClickCount;
}


stopAutoClickButton.addEventListener("click", stopAutoClick);

function handleBonusActivation() {
  if (score >= 200 && !bonusActive) {
    score -= 200;
    bonusActive = true;
    bonusCount += 1;
    bonusValue.textContent = bonusCount;
    updateScore();
    activateBonus();
  }
}


bonusButton.addEventListener("click", handleBonusActivation);

function stopBonus() {
  clearTimeout(bonusTimeout);
  multiplier = 1;
  bonusActive = false;
  bonusValue.textContent = bonusCount;
  checkBonusActivation();
}







