class Ship {
    constructor(length) {
        this.length = length;
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

const carrier = new Ship(5)
const battleship = new Ship(4)
const cruiser = new Ship(3)
const submarine = new Ship(3)
const patrolboat = new Ship(2)

class Gameboard {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.board = [];
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
            console.log(this.board[i])
            for (let j = 0; j < this.columns; j++) {
            }
        }
    }

    placeShip(length, x, y, orientation) {
        if (orientation == "horizontal") {
            if (length  + x > this.columns) {
                return console.log("Invalid placement")
            }
            for (let i = 0; i < length; i++) {
                this.board[y][x + i] = "S"
            }
        } else if (orientation == "vertical") {
            if (length  + y > this.rows) {
                return console.log("Invalid placement")
            }
            for (let i = 0; i < length; i++) {
                this.board[y + i][x] = "S"
            }
        }
    }
}

    const player = new Gameboard(10, 10);

    player.createBoard();
    player.placeShip(5, 5, 1, "vertical");
    player.displayBoard();


module.exports = { carrier }