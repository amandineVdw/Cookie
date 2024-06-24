// Variables globales pour les éléments et les paramètres d'animation
var container = document.getElementById('animationContainer');
var dollarsContainer = document.getElementById('dollarsContainer');
var smallDollars = document.getElementById('smallDollars');
var grandmasGrandma = document.getElementById('grandmasGrandma');
var bank = document.getElementById('bank');

var dollarSpeed = 2; // Vitesse de déplacement initiale du dollar en pixels par intervalle
var grandmaSpeed = 2; // Vitesse initiale de déplacement de la grand-mère en pixels par intervalle
var accelerationFactor = 1.15; // Facteur d'accélération de la grand-mère après la moitié du parcours
var animationSpeed = 10; // Intervalle de rafraîchissement de l'animation en millisecondes

// Fonction pour démarrer l'animation
function startAnimation() {
    var pos = -smallDollars.offsetWidth; // Position initiale hors écran à gauche
    var grandmaPos = -grandmasGrandma.offsetWidth; // Position initiale hors écran à gauche
    var startOffset = 0; // Offset de départ pour la grand-mère

    var intervalId = setInterval(function () {
        pos += dollarSpeed;
        smallDollars.style.left = pos + "px";

        // Démarrer la grand-mère lorsque les dollars démarrent
        if (pos >= startOffset && grandmasGrandma.style.visibility !== 'visible') {
            grandmasGrandma.style.visibility = 'visible';
            startGrandmaAnimation();
        }

        if (pos > dollarsContainer.offsetWidth) {
            clearInterval(intervalId); // Arrête l'animation lorsque les dollars atteignent la limite du conteneur
            smallDollars.style.display = 'none'; // Cache les dollars une fois terminé
        }
    }, animationSpeed);

    // Fonction pour démarrer l'animation de la grand-mère
    function startGrandmaAnimation() {
        var targetPos = dollarsContainer.offsetWidth - grandmasGrandma.offsetWidth; // Position cible pour rattraper les dollars

        var grandmaIntervalId = setInterval(function () {
            grandmaPos += dollarSpeed; // La grand-mère suit la vitesse des dollars
            grandmasGrandma.style.left = grandmaPos + "px";

            // Accélérer la grand-mère après avoir passé la moitié du parcours
            if (grandmaPos > pos / 2) {
                grandmaSpeed *= accelerationFactor;
            }

            if (grandmaPos >= targetPos) {
                clearInterval(grandmaIntervalId); // Arrête l'animation lorsque la grand-mère rattrape les dollars
                // Ajouter d'autres actions ici si nécessaire
            }
        }, animationSpeed);
    }
}

// Démarrer l'animation des dollars et de la grand-mère au chargement de la page
startAnimation();
