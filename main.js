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
  diceElement.style.display = "block";

  // Mettre à jour les classes CSS pour les panneaux des joueurs
  document.getElementById("player-1-panel").classList.add("active");
  document.getElementById("player-2-panel").classList.remove("active");
  document.getElementById("player-1-panel").classList.remove("winner");
  document.getElementById("player-2-panel").classList.remove("winner");
}

// Fonction pour gérer le lancer de dé
function rollDice() {
  let diceSound = new Audio('son/roll.wav');
  let oneSound = new Audio('son/loose.wav')
  diceSound.play();
  let diceNumber = Math.floor(Math.random() * 6) + 1;
  diceElement.style.display = "block";
  diceElement.src = "images/de" + diceNumber + ".jpg";
  if (diceNumber === 1) {
    switchPlayer();
    oneSound.play()
  } else {
    roundScore += diceNumber;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  }
}

// Fonction pour gérer la fin du tour
  function hold() {
    let keepSound = new Audio('son/keep.mp3');
    let winSoundOne = new Audio('son/win1.mp3');
    let winSoundTwo = new Audio('son/win2.mp3');
    
    if (activePlayer === 1) {
      scoreOne += roundScore;
      if (scoreOne >= 100) {
        winSoundOne.play();
        newGame();
        return;
      }
    } else {
      scoreTwo += roundScore;
      if (scoreTwo >= 100) {
        winSoundTwo.play();
        newGame();
        return;
      }
    }
    roundScore = 0;
    updateScores();
    keepSound.play();
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    switchPlayer();
  }

// Initialiser une nouvelle partie
newGame();

// Ajouter les écouteurs d'événements pour les boutons
rollDiceButton.addEventListener("click", rollDice);
holdButton.addEventListener("click", hold);
newGameButton.addEventListener("click", newGame);

