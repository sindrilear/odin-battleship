import { Ship, Gameboard, Player } from "./battleship.js";

const btnplaceShips = document.querySelector(".place");
btnplaceShips.addEventListener("click", () => {
  renderGameboard();
});

const carrier = new Ship(5, "carrier");
const battleship = new Ship(4, "battleship");
const cruiser = new Ship(3, "cruiser");
const submarine = new Ship(3, "submarine");
const patrolboat = new Ship(2, "patrolboat");

const human = new Player(10, 10);
human.playerBoard.placeShip(carrier, 0, 0, "horizontal");
human.playerBoard.placeShip(battleship, 0, 1, "horizontal");
human.playerBoard.placeShip(cruiser, 0, 2, "horizontal");
human.playerBoard.placeShip(submarine, 0, 3, "horizontal");
human.playerBoard.placeShip(patrolboat, 0, 4, "horizontal");
const computer = new Player(10, 10);
computer.playerBoard.placeShip(carrier, 0, 0, "horizontal");
computer.playerBoard.placeShip(battleship, 0, 1, "horizontal");
computer.playerBoard.placeShip(cruiser, 0, 2, "horizontal");
computer.playerBoard.placeShip(submarine, 0, 3, "horizontal");
computer.playerBoard.placeShip(patrolboat, 0, 4, "horizontal");

console.log(human);

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
      gridcell.setAttribute("onclick", `attackShip(${columnIDC})`);
      gridRow.appendChild(gridcell);
      columnIDC++;
    }
  }
}

function attackShip(coordinates) {
  const digitsArray = String(coordinates).split("").map(Number);
  if (digitsArray.length < 2) {
    digitsArray.unshift(0);
  }
  let x = digitsArray[0];
  let y = digitsArray[1];

  if (
    computer.playerBoard.board[x][y] != "HIT" &&
    computer.playerBoard.board[x][y] != "MISS"
  ) {
    computer.playerBoard.receiveAttack(y, x);
  }
  console.log(computer.playerBoard.displayBoard());
}

function renderGameboard() {
  let gridid = 0;
  for (let i = 0; i < human.playerBoard.rows; i++) {
    for (let j = 0; j < human.playerBoard.columns; j++) {
      if (human.playerBoard.board[i][j] != 0) {
        let shipname = human.playerBoard.board[i][j].name;
        console.log(shipname);
        let gridcell = document.getElementById(`gridcellH-${gridid}`);
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

window.createGameboard = createGameboard;
window.attackShip = attackShip;
