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

console.log(carrier.checkLength());

module.exports = { carrier }