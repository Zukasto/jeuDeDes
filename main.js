// Définir les variables pour les scores des joueurs
let scoreOne = 0;
let scoreTwo = 0;

// Définir les variables pour le tour en cours
let activePlayer = 1;
let roundScore = 0;

// Sélectionner les éléments HTML pour les scores des joueurs
let scoreOneElement = document.getElementById("scoreOne");
let scoreTwoElement = document.getElementById("scoreTwo");

// Sélectionner les éléments HTML pour les boutons
let rollDiceButton = document.getElementById("rollDice");
let holdButton = document.getElementById("hold");
let newGameButton = document.getElementById("newGame");

// Sélectionner l'élément HTML pour le dé
let diceElement = document.getElementById("dices");

// Fonction pour mettre à jour l'affichage des scores des joueurs
function updateScores() {
  scoreOneElement.textContent = scoreOne + "/100";
  scoreTwoElement.textContent = scoreTwo + "/100";
}

// Fonction pour changer de joueur actif
function switchPlayer() {
  roundScore = 0;
  activePlayer = (activePlayer === 1) ? 2 : 1;
  document.querySelector("#player-" + activePlayer + "-panel").classList.toggle("active");
  document.querySelector("#player-" + (3-activePlayer) + "-panel").classList.toggle("active");
  diceElement.style.display = "block";
}

function newGame() {
  // Réinitialiser les scores et les tours en cours
  scoreOne = 0;
  scoreTwo = 0;
  activePlayer = 1;
  roundScore = 0;

  // Mettre à jour l'affichage des scores
  scoreOneElement.textContent = scoreOne + "/100";
  scoreTwoElement.textContent = scoreTwo + "/100";

  // Cacher le dé
  diceElement.style.display = "none";

  // Mettre à jour les classes CSS pour les panneaux des joueurs
  document.getElementById("player-1-panel").classList.add("active");
  document.getElementById("player-2-panel").classList.remove("active");
  document.getElementById("player-1-panel").classList.remove("winner");
  document.getElementById("player-2-panel").classList.remove("winner");
}

// Fonction pour gérer le lancer de dé
function rollDice() {
  let diceNumber = Math.floor(Math.random() * 6) + 1;
  diceElement.style.display = "block";
  diceElement.src = "images/de" + diceNumber + ".jpg";
  if (diceNumber === 1) {
    switchPlayer();
  } else {
    roundScore += diceNumber;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  }
}

// Fonction pour gérer la fin du tour
function hold() {
  if (activePlayer === 1) {
    scoreOne += roundScore;
  } else {
    scoreTwo += roundScore;
  }
  roundScore = 0;
  updateScores();
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  if (scoreOne >= 100 || scoreTwo >= 100) {
    alert("Le joueur " + activePlayer + " a gagné !");
    newGame();
  } else {
    switchPlayer();
  }
}

// Initialiser une nouvelle partie
newGame();

// Ajouter les écouteurs d'événements pour les boutons
rollDiceButton.addEventListener("click", rollDice);
holdButton.addEventListener("click", hold);
newGameButton.addEventListener("click", newGame);
