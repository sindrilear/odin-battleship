import { Ship, Gameboard, Player } from "./battleship.js";

const btnstartGame = document.querySelector(".start");
btnstartGame.addEventListener("click", () => {
  if (human.playerBoard.checkIfShipsPlaced()) {
    initiated = true;
  } else {
    editGameText("Ships aren't placed! 🚢");
  }
  const randomButton = document.getElementById("randomizeButton");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");
  randomButton.style.display = "none";
  startButton.style.display = "none";
  restartButton.style.display = "block";
});

const btnrandomizeShips = document.querySelector(".randomize");
btnrandomizeShips.addEventListener("click", () => {
  human.playerBoard.clearBoard();
  randomizeShips(human);
  renderGameboard();
});

const btnRestart = document.querySelector(".restart");
btnRestart.addEventListener("click", () => {
  const randomButton = document.getElementById("randomizeButton");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");
  restartGame();
  randomButton.style.display = "block";
  startButton.style.display = "block";
  restartButton.style.display = "none";
});

let initiated = false;
let cheat = true;
let aiMoves = [];
let humanScore = 0;
let computerScore = 0;

const human = new Player(10, 10);
const computer = new Player(10, 10);
randomizeShips(computer);

function editGameText(string) {
  document.getElementById("gametext").innerHTML = string;
}

function renderScoreText() {
  document.getElementById(
    "scoretextHuman"
  ).textContent = `Score: ${humanScore}`;
  document.getElementById(
    "scoretextComputer"
  ).textContent = `Score: ${computerScore}`;
}

function randomGridCell() {
  return Math.floor(Math.random() * 100);
}

function createCoords(digits) {
  const n = Number(digits);
  const row = Math.floor(n / 10);
  const col = n % 10;
  return [col, row];
}

function randomizeShips(player) {
  const carrier = new Ship(5, "carrier");
  const battleship = new Ship(4, "battleship");
  const cruiser = new Ship(3, "cruiser");
  const submarine = new Ship(3, "submarine");
  const patrolboat = new Ship(2, "patrolboat");

  let usedCells = [];
  let Ships = [carrier, battleship, cruiser, submarine, patrolboat];
  let ship = "";

  while (Ships.length > 0) {
    let validPlacement = false;
    ship = Ships.pop();
    while (!validPlacement) {
      let randomCell = randomGridCell();
      if (usedCells.includes(randomCell) === false) {
        let randomOrientation = Math.floor(Math.random() * 2); 
        let shipOrientation =
          randomOrientation === 0 ? "vertical" : "horizontal";

        let [x, y] = createCoords(randomCell);

        if (
          player.playerBoard.placeShip(
            ship,
            x,
            y,
            shipOrientation,
            randomCell
          ) !== "Invalid placement"
        ) {
          validPlacement = true;
          let cellIndex = randomCell;
          for (let i = 0; i < ship.length; i++) {
            usedCells.push(cellIndex);
            if (shipOrientation === "horizontal") {
              cellIndex++;
            } else {
              cellIndex = cellIndex + 10; 
            }
          }
        } else {
          usedCells.push(randomCell);
        }
      }
    }
  }
}

function createGameboard() {
  const gridContainerHuman = document.querySelector(".grid-container.Human");
  const gridContainerComputer = document.querySelector(
    ".grid-container.Computer"
  );
  const rows = human.playerBoard.rows;
  let columnIDH = 0;
  let columnIDC = 0;

  for (let i = 0; i < rows; i++) {
    const gridRow = document.createElement("div");
    gridRow.className = "gridrow";
    gridRow.setAttribute("id", `row-${i}`);
    gridContainerHuman.appendChild(gridRow);
    for (let j = 0; j < rows; j++) {
      const gridcell = document.createElement("div");
      gridcell.className = "gridcell";
      gridcell.setAttribute("id", `gridcellH-${columnIDH}`);
      gridRow.appendChild(gridcell);
      columnIDH++;
    }
  }

  for (let i = 0; i < rows; i++) {
    const gridRow = document.createElement("div");
    gridRow.className = "gridrow";
    gridRow.setAttribute("id", `row-${i}`);
    gridContainerComputer.appendChild(gridRow);
    for (let j = 0; j < rows; j++) {
      const gridcell = document.createElement("div");
      gridcell.className = "gridcell Computer";
      gridcell.setAttribute("id", `gridcellC-${columnIDC}`);
      gridcell.setAttribute("onclick", `attackShip(${columnIDC}, "human")`);
      gridRow.appendChild(gridcell);
      columnIDC++;
    }
  }
}

function attackShip(coordinates, player) {
  if (initiated !== true) return "Game not started";

  let [x, y] = createCoords(coordinates);

  if (player === "human") {
    const cellValue = computer.playerBoard.board[y][x];
    if (cellValue !== "HIT" && cellValue !== "MISS") {
      computer.playerBoard.receiveAttack(x, y);
      renderGameboard(coordinates, y, x, "human");
    }
  } else if (player === "computer") {
    human.playerBoard.receiveAttack(x, y);
    renderGameboard(coordinates, y, x, "computer");
  }
}

function renderGameboard(coordinates, y, x, player) {
  let gridid = 0;
  if (initiated === false) {
    for (let i = 0; i < human.playerBoard.rows; i++) {
      for (let j = 0; j < human.playerBoard.columns; j++) {
        let gridcell = document.getElementById(`gridcellH-${gridid}`);
        if (human.playerBoard.board[i][j] != 0) {
          let shipname = human.playerBoard.board[i][j].name;
          if (shipname == "carrier") {
            gridcell.style.backgroundColor = "#F9ED69";
          } else if (shipname == "battleship") {
            gridcell.style.backgroundColor = "#F08A5D";
          } else if (shipname == "cruiser") {
            gridcell.style.backgroundColor = "#B83B5E";
          } else if (shipname == "submarine") {
            gridcell.style.backgroundColor = "#6A2C70";
          } else if (shipname == "patrolboat") {
            gridcell.style.backgroundColor = "#252A34";
          }
        } else {
          gridcell.style.backgroundColor = "#7A918D";
        }
        gridid++;
      }
    }
  }

  if (player === "human") {
    let attackedCell = document.getElementById(`gridcellC-${coordinates}`);
    let attackedBoard = computer.playerBoard.board[y][x];
    if (attackedBoard == "HIT") {
      attackedCell.style.backgroundColor = "green";
      if (computer.playerBoard.checkIfAllShipsSunk()) {
        endGame("human");
        return;
      }
      editGameText("It's a hit! Player gets to go again!");
    } else {
      attackedCell.style.backgroundColor = "#660B05";
      editGameText("Womp Womp! It's a miss!");
      computerTurn();
    }
  } else if (player === "computer") {
    let attackedCell = document.getElementById(`gridcellH-${coordinates}`);
    let attackedBoard = human.playerBoard.board[y][x];
    if (attackedBoard == "HIT") {
      attackedCell.style.backgroundColor = "green";
      if (human.playerBoard.checkIfAllShipsSunk()) {
        endGame("computer");
        return;
      }
      computerTurn();
    } else {
      attackedCell.style.backgroundColor = "#660B05";
    }
  }
}

function endGame(player) {
  editGameText(`All ships sunk! ${player} wins!`);
  initiated = false;
  if (player == "human") {
    humanScore++;
  } else {
    computerScore++;
  }
  renderScoreText();
}

function computerTurn() {
  let validMove = false;
  while (validMove == false) {
    let aiMove = randomGridCell();
    if (aiMoves.includes(aiMove) == false) {
      validMove = true;
      aiMoves.push(aiMove);
      attackShip(aiMove, "computer");
    }
  }
}

function renderComputerBoard() {
  let gridid = 0;
  for (let i = 0; i < computer.playerBoard.rows; i++) {
    for (let j = 0; j < computer.playerBoard.columns; j++) {
      let gridcell = document.getElementById(`gridcellC-${gridid}`);
      if (computer.playerBoard.board[i][j] != 0 && cheat == true) {
        let shipname = computer.playerBoard.board[i][j].name;
        if (shipname == "carrier") {
          gridcell.style.backgroundColor = "#F9ED69";
        } else if (shipname == "battleship") {
          gridcell.style.backgroundColor = "#F08A5D";
        } else if (shipname == "cruiser") {
          gridcell.style.backgroundColor = "#B83B5E";
        } else if (shipname == "submarine") {
          gridcell.style.backgroundColor = "#6A2C70";
        } else if (shipname == "patrolboat") {
          gridcell.style.backgroundColor = "#252A34";
        }
      } else {
        gridcell.style.backgroundColor = "#7A918D";
      }
      gridid++;
    }
  }
}

function restartGame() {
  initiated = false;
  human.playerBoard.clearBoard();
  computer.playerBoard.clearBoard();
  renderGameboard();
  randomizeShips(computer);
  renderComputerBoard();
}

createGameboard();
renderComputerBoard();
renderScoreText();

window.attackShip = attackShip;
