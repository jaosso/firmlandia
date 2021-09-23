var Board = require('../models/board').Board;
var BoardHelper = require('./board_helper').BoardHelper;

class BoardController {
  constructor() {
    this.board = null;
    this.boardHelper = new BoardHelper();
  }

  createBoard(options) {
    options = Object.assign(
      {
        shape: null,
        path: null,
        diagonal: false,
        prime_color: null,
        second_color: null,
      },
      options
    );

    this.board = new Board(
      options.shape,
      options.path ||
        this.boardHelper.calcPath(options.shape, { diagonal: options.diagonal }),
      options.prime_color,
      options.second_color
    );

    return this.board;
  }

  addPlayerToken(player, position) {
    this.board.addToken(player.user_id, player.user_color, position);
  }

  movePlayerTokenForwards(player_id, dice) {
    var tokens = this.board.getTokenList();
    tokens[player_id].moveForward(dice);
  }

  movePlayerTokenBackwards(player_id, dice) {
    var tokens = this.board.getTokenList();
    tokens[player_id].moveBackward(dice);
  }
}

module.exports.BoardController = BoardController;
