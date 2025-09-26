import { Ship, Gameboard, Player } from "./battleship.js";

let carrier;
let human;

beforeEach(() => {
  carrier = new Ship(5, "carrier");
  human = new Player(10, 10);
});

test("Carrier length", () => {
  expect(carrier.checkLength()).toBe(5);
});

test("Carrier hits", () => {
  expect(carrier.checkHits()).toBe(0);
});

test("Carrier status", () => {
  expect(carrier.checkStatus()).toBe(false);
});

test("Carrier hit", () => {
  carrier.getHit();
  expect(carrier.checkHits()).toBe(1);
});

test("Carrier sunk", () => {
  for (i = 0; i < 5; i++) {
    carrier.getHit();
  }
  expect(carrier.checkStatus()).toBe(true);
});

test("Grid creation", () => {
  expect(human.playerBoard.board[0][0]).toBe(0);
});

test("Ship placement", () => {
  human.playerBoard.placeShip(carrier, 0, 0, "horizontal");
  expect(human.playerBoard.board[0][0]).toBe(carrier);
});

test("Grid creation error", () => {
  expect(human.playerBoard.placeShip(carrier, 6, 6, "horizontal")).toBe(
    "Invalid placement"
  );
});

test("Ship added to gameboard", () => {
  human.playerBoard.placeShip(carrier, 5, 5, "horizontal");
  expect(human.playerBoard.ships[0].name).toBe("carrier");
});

test("Ship receives attack", () => {
  human.playerBoard.placeShip(carrier, 0, 0, "horizontal");
  human.playerBoard.receiveAttack(0, 0);
  expect(human.playerBoard.ships[0].checkHits()).toBe(1);
});

test("Coordinate on attack", () => {
  human.playerBoard.placeShip(carrier, 0, 0, "horizontal");
  human.playerBoard.receiveAttack(0, 0);
  expect(human.playerBoard.board[0][0]).toBe("HIT");
});

test("Coordinate on miss", () => {
  human.playerBoard.placeShip(carrier, 0, 0, "horizontal");
  human.playerBoard.receiveAttack(1, 1);
  expect(human.playerBoard.board[1][1]).toBe("MISS");
});

test("Ship is sunk", () => {
  human.playerBoard.placeShip(carrier, 0, 0, "vertical");
  human.playerBoard.receiveAttack(0, 0);
  human.playerBoard.receiveAttack(0, 1);
  human.playerBoard.receiveAttack(0, 2);
  human.playerBoard.receiveAttack(0, 3);
  human.playerBoard.receiveAttack(0, 4);
  expect(carrier.checkStatus()).toBe(true);
});

test("All ships sunk", () => {
  human.playerBoard.placeShip(carrier, 0, 0, "vertical");
  human.playerBoard.receiveAttack(0, 0);
  human.playerBoard.receiveAttack(0, 1);
  human.playerBoard.receiveAttack(0, 2);
  human.playerBoard.receiveAttack(0, 3);
  human.playerBoard.receiveAttack(0, 4);
  expect(human.playerBoard.checkIfAllShipsSunk()).toBe(true);
});

test("All ships are NOT sunk", () => {
  human.playerBoard.placeShip(carrier, 0, 0, "vertical");
  human.playerBoard.receiveAttack(0, 0);
  human.playerBoard.receiveAttack(0, 1);
  human.playerBoard.receiveAttack(0, 2);
  human.playerBoard.receiveAttack(0, 3);
  expect(human.playerBoard.checkIfAllShipsSunk()).toBe(false);
});
