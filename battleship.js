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

    if (this.hits == this.length) {
      this.isSunk = true;
    }
  }
}

export class Gameboard {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];
    this.ships = [];
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

  displayBoard() {
    for (let i = 0; i < this.rows; i++) {
      console.log(this.board[i]);
      for (let j = 0; j < this.columns; j++) {}
    }
  }

  placeShip(ship, x, y, orientation) {
    if (orientation == "horizontal") {
      if (ship.length + x > this.columns) {
        return "Invalid placement";
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = ship;
      }
    } else if (orientation == "vertical") {
      if (ship.length + y > this.rows) {
        return "Invalid placement";
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    let coordinates = this.board[y][x];
    if (coordinates != 0) {
      coordinates.getHit();
      this.board[y][x] = "HIT";
    } else {
      this.board[y][x] = "MISS";
    }
  }

  checkIfAllShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk != true) {
        return "There are still ships on the board";
      }
    }
    return "All ships sunk";
  }
}

export class Player {
  constructor(x, y) {
    this.playerBoard = new Gameboard(x, y);
    this.playerBoard.createBoard();
  }
}