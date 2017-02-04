import '../style/app.scss';

var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var squares = Array.from(document.getElementsByClassName("square"));
var players = ['X', 'O'];
var playerState = players[Math.floor(Math.random()*players.length)];
var currentPlayer = document.querySelector(".currentPlayer");
var winnerX, winnerO;
var restartGame = document.querySelector(".restartGame");
var body = document.querySelector("body");
var winner = document.querySelector(".winner");


restartGame.addEventListener("click", (event) => {
  squares.forEach(elem => elem.innerHTML = "");
  restartGame.style.display = "none";
  body.style.backgroundColor = 'white';
  body.className = '';
  winnerX = null;
  winnerO = null;
  winner.innerHTML = "";
});

squares.forEach(function(element) {
  element.addEventListener("click", (event) => {
    if (winnerX || winnerO) return;
    if(element.innerHTML === ""){
      element.innerHTML = playerState;
      playerState = playerState === 'X' ? 'O' : 'X';
      currentPlayer.textContent = playerState;
      checkIfWinner();
    }
  })
})

currentPlayer.textContent = playerState;

function checkIfWinner() {
  winnerX = winningCombinations.some(function(combo) {
    return combo.every(elem => pattern('X').indexOf(elem) > -1);
  })
  winnerO = winningCombinations.some(function(combo) {
    return combo.every(elem => pattern('O').indexOf(elem) > -1);
  })

  if (winnerX) {
    setWinner('X');
  } else if (winnerO) {
    setWinner('O');
  } else if (squares.every(elem => elem.innerHTML !== "")) {
    setWinner('Cat');
  }
}

function setWinner(winningPlayer) {
  if(winningPlayer !== 'Cat'){
    body.className = 'pyro';
    body.style.backgroundColor = 'RGBA(33, 33, 33, 1.00)';
  }
  winner.innerHTML = 'The winner is ' + winningPlayer;
  restartGame.style.display = "inline-block";
}

function pattern(letter) {
  var pattern = [];
  squares.forEach(function(element, index) {
    if(element.innerHTML === letter) {
      pattern.push(index);
    }
  })
  return pattern;
}
