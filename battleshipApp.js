import { Ship, Gameboard, Player } from "./battleship.js";

const btnplaceShips = document.querySelector(".start");
btnplaceShips.addEventListener("click", () => {
  if (human.playerBoard.checkIfShipsPlaced()) {
    initiated = true;
  } else {
    console.log("Ships aren't placed!")
  }
});

const btnrandomizeShips = document.querySelector(".randomize");
btnrandomizeShips.addEventListener("click", () => {
  human.playerBoard.clearBoard();
  human.playerBoard.displayBoard();
  randomizeShips(human);
  renderGameboard();
});

const carrier = new Ship(5, "carrier");
const battleship = new Ship(4, "battleship");
const cruiser = new Ship(3, "cruiser");
const submarine = new Ship(3, "submarine");
const patrolboat = new Ship(2, "patrolboat");

let initiated = false;
let aiMoves = [];

const human = new Player(10, 10);
const computer = new Player(10, 10);
randomizeShips(computer);

console.log(computer.playerBoard.displayBoard())


function randomGridCell() {
  let GridCell = Math.floor(Math.random() * 99)
  return GridCell;
}

function createCoords(digits) {
  const digitsArray = String(digits).split("").map(Number);
    if (digitsArray.length < 2) {
      digitsArray.unshift(0);
    }
    return digitsArray;
}

function randomizeShips(player) {
  let usedCells = []; 
  let Ships = [carrier, battleship, cruiser, submarine, patrolboat]
  let ship = "";
  while (Ships.length > 0) {
  let validPlacement = false;
  let shipOrientation = "horizontal"
  ship = Ships.pop();
    while (validPlacement == false) {
      let randomCell = randomGridCell();
        console.log(`Current used cells: ${usedCells}`)
        console.log(`Used cells includes ${randomCell}? ${usedCells.includes(randomCell)}`);
        if (usedCells.includes(randomCell) == false) {
          let randomOrientation = Math.floor(Math.random() * 2)
          if (randomOrientation == "0") {
            shipOrientation = "vertical"
            }   
            let digitsArray = createCoords(randomCell);
            let x = digitsArray[0];
            let y = digitsArray[1];
            if (player.playerBoard.placeShip(ship, x, y, shipOrientation, randomCell) != "Invalid placement") {
              validPlacement = true;  
              for (let i = 0; i < ship.length; i++) {
                
                usedCells.push(randomCell);
                if (shipOrientation == "horizontal") {
                  randomCell = randomCell + 10;
                } else {
                  randomCell++;
                }
              }
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
  if (initiated == true) {
    let digitsArray = createCoords(coordinates);
    let x = digitsArray[0];
    let y = digitsArray[1];

    if (player == "human") {
      if (
        computer.playerBoard.board[x][y] != "HIT" &&
        computer.playerBoard.board[x][y] != "MISS"
      ) {
        computer.playerBoard.receiveAttack(y, x);
        renderGameboard(coordinates, y, x, "human");
      }
    } else if (player == "computer") {
      human.playerBoard.receiveAttack(y, x);
      renderGameboard(coordinates, y, x, "computer");
    }
    } else {
      return "Game not started"
  }
}

function renderGameboard(coordinates, y, x, player) {
  let gridid = 0;
  if (initiated == false) {
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
          gridcell.style.backgroundColor = "#7A918D"
        }
        gridid++;
      }
    }
  }
  if (player == "human") {
    let attackedCell = document.getElementById(`gridcellC-${coordinates}`);
    let attackedBoard = computer.playerBoard.board[x][y];
    if (attackedBoard == "HIT") {
      attackedCell.style.backgroundColor = "green";
    } else {
      attackedCell.style.backgroundColor = "#660B05";
      computerTurn();
    }
  } else if (player == "computer") {
    let attackedCell = document.getElementById(`gridcellH-${coordinates}`);
    let attackedBoard = human.playerBoard.board[x][y];
    if (attackedBoard == "HIT") {
      attackedCell.style.backgroundColor = "green";
      computerTurn();
    } else {
      attackedCell.style.backgroundColor = "#660B05";
    }
  }
}

function computerTurn() {
  let validMove = false;
  while (validMove == false) {
  let aiMove = randomGridCell();
    if (aiMoves.includes(aiMove) == false) {
      validMove = true;
      aiMoves.push(aiMove)
      attackShip(aiMove, "computer")
    }
  }
}

function renderComputerBoard() {
  let gridid = 0;
  for (let i = 0; i < computer.playerBoard.rows; i++) {
    for (let j = 0; j < computer.playerBoard.columns; j++) {
      if (computer.playerBoard.board[i][j] != 0) {
        let shipname = computer.playerBoard.board[i][j].name;
        let gridcell = document.getElementById(`gridcellC-${gridid}`);
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
      }
      gridid++;
    }
  }
}

createGameboard();
renderComputerBoard();

window.attackShip = attackShip;
