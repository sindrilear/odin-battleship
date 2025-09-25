const { Ship, Gameboard, Player } = require("./battleship");

const carrier = new Ship(5, "carrier");
const battleship = new Ship(4, "battleship");
const cruiser = new Ship(3, "cruiser");
const submarine = new Ship(3, "submarine");
const patrolboat = new Ship(2, "patrolboat");

console.log(carrier)