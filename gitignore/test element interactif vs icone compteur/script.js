var Game = {
  score: 0,
  clickLump: function (element) {
    this.score++;
    this.updateScore();
    this.showFloatingText(element, "+1");
  },
  updateScore: function () {
    var lumpsAmount = document.getElementById("lumpsAmount");
    lumpsAmount.innerText = this.score;
  },
  showFloatingText: function (element, text) {
    var floatingText = document.createElement("div");
    floatingText.className = "floatingText";
    floatingText.innerText = text;

    element.appendChild(floatingText);

    setTimeout(function () {
      element.removeChild(floatingText);
    }, 1000); // Remove floating text after 1 second
  },
};
