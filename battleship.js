export class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hits = 0;
    this.isSunk = false;
  }

  checkLength() {
    return this.length;
  }

  checkHits() {
    return this.hits;
  }

  checkStatus() {
    return this.isSunk;
  }

  getHit() {
    this.hits++;

    if (this.hits === this.length) {
      this.isSunk = true;
    }
  }

  resetHits() {
    this.hits = 0;
    this.isSunk = false;
  }
}

export class Gameboard {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];
    this.ships = [];
  }

  checkIfShipsPlaced() {
    return this.ships.length >= 5;
  }

  createBoard() {
    const rows = this.rows;
    const columns = this.columns;
    const grid = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < columns; j++) {
        grid[i][j] = 0;
      }
    }
    this.board = grid;
  }

  clearBoard() {
    this.board = [];
    this.createBoard();
    this.ships = [];
  }

  displayBoard() {
    for (let i = 0; i < this.rows; i++) {
      console.log(this.board[i]);
    }
  }

  checkIfShip(x, y) {
    if (!this.board[y]) return false;
    if (this.board[y][x] === undefined) return false;
    return this.board[y][x] !== 0;
  }

  placeShip(ship, x, y, orientation, randomCell) {
    x = Number(x);
    y = Number(y);

    if (orientation === "horizontal") {
      if (ship.length + x > this.columns) {
        return "Invalid placement";
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.checkIfShip(x + i, y)) {
          return "Invalid placement";
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = ship;
      }
    } else if (orientation === "vertical") {
      if (ship.length + y > this.rows) {
        return "Invalid placement";
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.checkIfShip(x, y + i)) {
          return "Invalid placement";
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x] = ship;
      }
    } else {
      return "Invalid placement";
    }

    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    if (!this.board[y] || this.board[y][x] === undefined) return;

    const cell = this.board[y][x];

    if (cell === "HIT" || cell === "MISS") return;

    if (cell !== 0) {
      cell.getHit();
      this.board[y][x] = "HIT";
    } else {
      this.board[y][x] = "MISS";
    }
  }

  checkIfAllShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk !== true) {
        return false;
      }
    }
    return true;
  }
}

export class Player {
  constructor(x, y) {
    this.playerBoard = new Gameboard(x, y);
    this.playerBoard.createBoard();
  }
}
