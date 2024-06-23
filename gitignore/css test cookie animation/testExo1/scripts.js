
// scripts.js

// Variables pour la gestion de l'animation
var container = document.getElementById('sprite');
var frameHeight = 360; // Hauteur de chaque frame
var totalFrames = 11; // Nombre total de frames dans le sprite
var currentFrame = 0;

function animateSprite() {
    currentFrame = (currentFrame + 1) % totalFrames;
    var yPos = -currentFrame * frameHeight;
    container.style.backgroundPosition = '0 ' + yPos + 'px';
}

// Appeler la fonction d'animation toutes les 100 ms (par exemple)
setInterval(animateSprite, 200);

// Lancer l'animation une fois que la page est chargée
window.onload = function() {
  animateSprite();
};