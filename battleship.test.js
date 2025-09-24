const { Ship, Gameboard } = require('./battleship')

let carrier;
let player;

beforeEach(() => {
    carrier = new Ship(5, "carrier");
    player = new Gameboard(10, 10);
    player.createBoard();
});

test('Carrier length', () => {
    expect(carrier.checkLength()).toBe(5);
});

test('Carrier hits', () => {
    expect(carrier.checkHits()).toBe(0);
});

test('Carrier status', () => {
    expect(carrier.checkStatus()).toBe(false);
});

test('Carrier hit', () => {
    carrier.getHit();
    expect(carrier.checkHits()).toBe(1);
});

test('Carrier sunk', () => {
    for(i = 0; i < 5; i++) {
        carrier.getHit();
    }
    expect(carrier.checkStatus()).toBe(true);
});

test('Grid creation', () => {
    expect(player.board[0][0]).toBe(0);
});

test('Ship placement', () => {
    player.placeShip(carrier, 0, 0, "horizontal");
    expect(player.board[0][0]).toBe(carrier);
});

test('Grid creation error', () => {
    expect(player.placeShip(carrier, 6, 6, "horizontal")).toBe("Invalid placement");
});

test('Ship added to gameboard', () => {
    player.placeShip(carrier, 5, 5, "horizontal");
    expect(player.ships[0].name).toBe("carrier")
});

test('Ship receives attack', () => {
    player.placeShip(carrier, 0, 0, "horizontal");
    player.receiveAttack(0, 0);
    expect(player.ships[0].checkHits()).toBe(1)
});

test('Cell on attack', () => {
    player.placeShip(carrier, 0, 0, "horizontal");
    player.receiveAttack(0, 0);
    expect(player.board[0][0]).toBe('HIT')
});

test('Cell on miss', () => {
    player.placeShip(carrier, 0, 0, "horizontal");
    player.receiveAttack(1, 1);
    expect(player.board[1][1]).toBe('MISS')
});

test('Ship is sunk', () => {
    player.placeShip(carrier, 0, 0, "vertical");
    player.receiveAttack(0, 0);
    player.receiveAttack(0, 1);
    player.receiveAttack(0, 2);
    player.receiveAttack(0, 3);
    player.receiveAttack(0, 4);
    expect(carrier.checkStatus()).toBe(true)
});

test('All ships sunk', () => {
    player.placeShip(carrier, 0, 0, "vertical");
    player.receiveAttack(0, 0);
    player.receiveAttack(0, 1);
    player.receiveAttack(0, 2);
    player.receiveAttack(0, 3);
    player.receiveAttack(0, 4);
    expect(player.checkIfAllShipsSunk()).toBe("All ships sunk")
});

test('All ships are NOT sunk', () => {
    player.placeShip(carrier, 0, 0, "vertical");
    player.receiveAttack(0, 0);
    player.receiveAttack(0, 1);
    player.receiveAttack(0, 2);
    player.receiveAttack(0, 3);
    expect(player.checkIfAllShipsSunk()).toBe("There are still ships on the board")
});