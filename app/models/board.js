var Token = require('./token').Token;

class Board {
  constructor(shape, path, prime_color, second_color) {
    this.shape = shape;
    this.path = path;
    this.prime_color = prime_color;
    this.second_color = second_color;
    this.token_list = {};
  }

  getShape() {
    return this.shape;
  }

  getPath() {
    return this.path;
  }

  getPrimeColor() {
    return this.prime_color;
  }

  getSecondColor() {
    return this.second_color;
  }

  getTokenList() {
    return this.token_list;
  }

  setShape(shape) {
    this.shape = shape;
  }

  setPath(path) {
    this.path = path;
  }

  getPathLength() {
    return this.path.length;
  }

  setPrimeColor(prime_color) {
    this.prime_color = prime_color;
  }

  setSecondColor(second_color) {
    this.second_color = second_color;
  }

  addToken(player_id, token_color, position) {
    var new_token = new Token(player_id, token_color, position);
    this.token_list[player_id] = new_token;
  }
}

module.exports.Board = Board;
