const { carrier } = require('./battleship')

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