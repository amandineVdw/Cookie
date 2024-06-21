document.getElementById("show-popup").addEventListener("click", () => {
  const popup = document.getElementById("popup");
  const sprite = document.getElementById("sprite");

  // Afficher le popup
  popup.style.display = "block";

  // Démarrer l'animation
  sprite.style.animation = "kick 3s steps(12) forwards";

  // Cacher le popup après 3 secondes (durée de l'animation)
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
});
