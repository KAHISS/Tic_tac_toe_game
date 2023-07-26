// pegando elementos
const game = document.getElementById("game");
const player1NameInput = document.getElementById("namePlayer1");
const player2NameInput = document.getElementById("namePlayer2");
const playerTieName = document.getElementById("nameTie");
const InitPlayer = document.querySelectorAll(".initBtn");
const playerName = document.querySelector("#currentPlayer > h1");
const restart = document.getElementById("restart");
const fields = document.querySelectorAll(".field");
const amountWinsX = document.getElementById("numberWinsPlayer1");
const amountWinsO = document.getElementById("numberWinsPlayer2");
const amountWinsTie = document.getElementById("numberWinsTie");

// vez do jogador
let currentPlayer = "";
let victorysX = [0, 0, 0, 0, 0, 0, 0, 0]
let victorysO = [0, 0, 0, 0, 0, 0, 0, 0]

let positions = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7']
]



function nameAndColor(element, type) {
  switch (type) {
    case 1:
      element.innerText = currentPlayer;
      element.style.color = currentPlayer === "X" ? "#4b93f1" : "#f16262";
      break;

    case 2:
      element.innerText = currentPlayer === "X" ? player1NameInput.value : player2NameInput.value;
      element.style.color = currentPlayer === "X" ? "#4b93f1" : "#f16262";
      break;

    default:
      break;
  }
}

function checkWins(move){

  positions.forEach((position, index) => {
    position.forEach((posi) => {
      if (move.id === posi && currentPlayer != 'O') {
        victorysX[index] ++
      }
      if (move.id === posi && currentPlayer != 'X') {
        victorysO[index] ++
      }
    })  
  })

  if (document.querySelectorAll(`[data-simbol=""]`).length < 1 && !(victorysX.includes(3)) && !victorysO.includes(3)) {
    document.querySelectorAll('.field').forEach((element) => {
      element.style.background = '#be9f47'
      playerName.innerText = 'Empate'
      playerName.style.color = '#be9f47'
    })

    amountWinsTie.innerText ++
  } else if (victorysX.includes(3)) {
    positions[victorysX.indexOf(3)].forEach((id) => {
      document.getElementById(`${id}`).style.background = '#081c3b'
    })

    document.querySelectorAll('.field').forEach((element) => {
      element.disabled = true
    })

    amountWinsX.innerText ++

  } else if (victorysO.includes(3)) {
    positions[victorysO.indexOf(3)].forEach((id) => {
      document.getElementById(`${id}`).style.background = '#3b0814'
    })

    document.querySelectorAll('.field').forEach((element) => {
      element.disabled = true
    })

    amountWinsO.innerText ++
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    nameAndColor(playerName, 2);
    move.disabled = true;
  }

}

InitPlayer.forEach((element) => {
  element.addEventListener("click", (eve) => {
    if (player1NameInput.value === "" || player2NameInput.value === "") {
      alert('Preencha o nome dos jogadores')
      return;
    }

    if (eve.currentTarget.id !== "btnRandom") {
      currentPlayer = eve.currentTarget.dataset.init;
    } else {
      currentPlayer = ["X", "O"][Math.floor(Math.random() * 2)];
    }

    nameAndColor(playerName, 2);

    document.getElementById("currentPlayerInit").style.display = "none";
    player1NameInput.disabled = true;
    player2NameInput.disabled = true;
  });
});

fields.forEach((element) => {
  element.addEventListener("click", (eve) => {
    if (currentPlayer === "") {
      alert('Escolha alguem para iniciar')
      return;
    }

    eve.currentTarget.dataset.simbol = currentPlayer;   
    nameAndColor(eve.currentTarget, 1);
    checkWins(element)
  });
});

restart.addEventListener("click", () => {
  currentPlayer = "";
  victorysX = [0, 0, 0, 0, 0, 0, 0, 0]
  victorysO = [0, 0, 0, 0, 0, 0, 0, 0]

  fields.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
    element.style.background = '#ebebeb'
    element.dataset.simbol = ''
  });

  document.getElementById("currentPlayerInit").style.display = "flex";

  player1NameInput.disabled = false;
  player2NameInput.disabled = false;

  playerName.style.color = "#38393d";
  playerName.innerText = "Iniciar";
});
