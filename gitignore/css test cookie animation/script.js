const sprite = document.getElementById("sprite");
const frameCount = 6;
const frameHeight = 600; // Hauteur de chaque frame
let currentFrame = 0;

function updateFrame() {
  const positionY = -currentFrame * frameHeight;
  sprite.style.backgroundPosition = `0px ${positionY}px`;
  currentFrame = (currentFrame + 1) % frameCount;
}

setInterval(updateFrame, 500); // Change de frame toutes les 500ms (ajuste cette valeur pour ralentir/accélérer)
