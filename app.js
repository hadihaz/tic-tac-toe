let gameBoard = ["", "", "", "", "", "", "", "", ""];
let selectedCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function gameBoardController(id) {
  let player1Choice = parseInt(id[1]);
  if (!selectedCells.includes(player1Choice)) return;
  gameBoard[player1Choice] = player1.getChar();
  displayController.changeContent(`#${id}`, player1.getChar());
  selectedCells = selectedCells.filter((item) => item !== player1Choice);
  endGame();
  equalControl();
  if (endGame()) {
    return;
  }
  setTimeout(function () {
    let player2Choice = robot();
    if (player2Choice != undefined) {
      gameBoard[player2Choice] = player2.getChar();
      displayController.changeContent(`#_${player2Choice}`, player2.getChar());
      selectedCells = selectedCells.filter((item) => item !== player2Choice);
      endGame();
      equalControl();
    }
  }, 200);
}

function robot() {
  if (selectedCells != []) {
    return selectedCells[
      (item = Math.floor(Math.random() * selectedCells.length))
    ];
  }
}
const player = (name, char, turn) => {
  const getName = () => name;
  const getChar = () => char;
  const getTurn = () => turn;
  const setName = (n) => {
    name = n;
  };
  const setChar = (c) => {
    char = c;
  };
  const changeTurn = () => {
    turn = !turn;
  };
  return { getChar, getName, getTurn, setName, setChar, changeTurn };
};
let player1 = player("", "", true);
let player2 = player("", "", false);

const displayElements = (() => {
  const select = (id) => document.querySelector(`${id}`);
  const selectAll = (id) => document.querySelectorAll(`${id}`);
  return { select, selectAll };
})();

const displayController = (() => {
  const changeDisplay = (el, display) =>
    (displayElements.select(el).style.display = display);
  const changeContent = (el, content) =>
    (displayElements.select(el).innerHTML = content);
  return { changeDisplay, changeContent };
})();
function startGame(name, char) {
  let c1 = "X";
  let c2 = "O";
  if (!char) {
    c1 = "O";
    c2 = "X";
  }
  let n1 = "Player" + c1;
  let n2 = "Player" + c2;
  if (name) {
    n1 = name;
  }
  player1.setName(n1);
  player2.setName(n2);
  player1.setChar(c1);
  player2.setChar(c2);
  displayController.changeDisplay(".modal", "none");
  displayController.changeDisplay(".panel", "none");
  // displayController.changeContent('.Turns', `${player1.getName()}'s Turn`)
}
function endGame() {
  const winningMoods = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let mood of winningMoods) {
    if (
      gameBoard[mood[0]] == gameBoard[mood[1]] &&
      gameBoard[mood[1]] == gameBoard[mood[2]] &&
      gameBoard[mood[0]] != ""
    ) {
      displayController.changeDisplay(".modal", "flex");
      displayController.changeDisplay(".status", "flex");
      if (gameBoard[mood[0]] == player1.getChar()) {
        displayController.changeContent(
          `.statusHeader`,
          `${player1.getName()} Won`
        );
      } else {
        displayController.changeContent(
          `.statusHeader`,
          `${player2.getName()} Won`
        );
      }
      return true;
    }
  }
}
let tern = 0;
function equalControl() {
  tern += 1;
  if (tern >= 9) {
    displayController.changeDisplay(".modal", "flex");
    displayController.changeDisplay(".status", "flex");
    displayController.changeContent(`.statusHeader`, `Equal`);
  }
}

function displayEventListener() {
  displayElements.select("#form").onsubmit = (e) => {
    e.preventDefault();
    let name = displayElements.select("#name").value;
    let char = displayElements.select("#choice1").checked;
    startGame(name, char);
  };

  displayElements.selectAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (player1.getTurn) {
        gameBoardController(e.target.id);
      }

      e.preventDefault();
    });
  });
  displayElements.select(".playAgain").addEventListener("click", (e) => {
    displayController.changeDisplay(".modal", "none");
    displayController.changeDisplay(".status", "none");
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    selectedCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    tern = 0;
    if (!player1.getTurn()) player1.changeTurn();
    displayElements.selectAll(".cell").forEach((cell) => {
      cell.innerHTML = "";
    });
    e.preventDefault();
  });
}
displayEventListener();
