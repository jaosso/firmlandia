// this file contains larger variables for testing purposes

var boardSettings = {
  shape: ["00S100", "011110", "111111", "111111", "011110", "001100"],
  path: [(0, 0), (0, 1)],
  prime_color: "blue",
  second_color: "white",
};

var newBoardSettings = {
  shape: ["S11111", "100001", "100001", "100001", "100001", "111111"],
  path: [(0, 0), (0, 1)],
  prime_color: "green",
  second_color: "black",
};

module.exports = { boardSettings, newBoardSettings };
