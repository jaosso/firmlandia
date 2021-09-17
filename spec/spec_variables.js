// this file contains larger variables for testing purposes

var newBoardSettings = {
  shape: ['00S100', '011110', '111111', '111111', '011110', '001100'],
  path: [(0, 0), (0, 1)],
  prime_color: 'blue',
  second_color: 'white',
};

var boardSettings = {
  shape: ['S11111', '100001', '100001', '100001', '100001', '111111'],
  path: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
    { x: 0, y: 5 },
    { x: 1, y: 5 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 5, y: 4 },
    { x: 5, y: 3 },
    { x: 5, y: 2 },
    { x: 5, y: 1 },
    { x: 5, y: 0 },
    { x: 4, y: 0 },
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
  ],
  prime_color: 'green',
  second_color: 'black',
};

module.exports = { boardSettings, newBoardSettings };
