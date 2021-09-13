var Board = require('../models/board').Board;

class BoardFactory {
  constructor() {}

  create(shape, prime_color, second_color) {
    return new Board(shape, this.calcPath(shape), prime_color, second_color);
  }

  calcPath(shape) {
    var path = { length: null, path: [] };

    // find start tile
    var width = shape[0].length;
    var height = shape.length;

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        // console.log(x + ' ' + y);
      }
    }
    return path;
  }
}

module.exports.BoardFactory = BoardFactory;
