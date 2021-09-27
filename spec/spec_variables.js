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

var pointMarkerSettings = {
  shape: ['001100', '011110', '111111', '011110', '001100'],
  state: ['NNNNNN', 'NNNNNN', 'NNNNNN', 'NNNNNN', 'NNNNNN'],
  points: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  playerToSign: {
    '001': 0,
    '002': 1,
    '003': 2,
    '004': 3,
    '005': 4,
    '006': 5,
    '007': 6,
    '008': 7,
    '009': 8,
    '010': 9,
  },
};

var newPointMarkerSettings = {
  shape: ['001100', '011110', '111111', '011110', '001100'],
  state: ['NN0NNN', 'N1111N', '222222', 'N3333N', 'NN44NN'],
  points: { 0: 1, 1: 4, 2: 6, 3: 4, 4: 2, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  playerToSign: {
    '001': 0,
    '002': 1,
    '003': 2,
    '004': 3,
    '005': 4,
    '006': 5,
    '007': 6,
    '008': 7,
    '009': 8,
    '010': 9,
  },
};

module.exports = {
  boardSettings,
  newBoardSettings,
  pointMarkerSettings,
  newPointMarkerSettings,
};
