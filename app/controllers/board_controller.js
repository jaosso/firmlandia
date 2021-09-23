var Board = require('../models/board').Board;
var BoardHelper = require('./board_helper').BoardHelper;

class BoardController {
  constructor(options) {
    options = Object.assign(
      {
        rounds: false,
        board: null,
      },
      options
    );

    this.rounds = options.rounds;
    this.board = options.board;
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
        this.boardHelper.calcPath(options.shape, {
          diagonal: options.diagonal,
        }),
      options.prime_color,
      options.second_color
    );

    return this.board;
  }

  getBoard() {
    return this.board;
  }

  isRounds() {
    return this.rounds;
  }

  toggleRounds() {
    if (this.rounds) {
      this.rounds = false;
    } else {
      this.rounds = true;
    }
  }

  addPlayerToken(player, position) {
    this.board.addToken(player.user_id, player.user_color, position);
  }

  movePlayerTokenForwards(player_id, dice) {
    var token = this.board.getTokenList()[player_id];
    token.moveForward(dice);

    if (this.isRounds()) {
      token.setPosition(token.getPosition() % this.board.getPath().length);
    }
  }

  movePlayerTokenBackwards(player_id, dice) {
    var token = this.board.getTokenList()[player_id];
    token.moveBackward(dice);
    
    if (token.getPosition() < 0) {
      
      if (this.isRounds()) {
        var val = this.board.getPath().length + token.getPosition();
        token.setPosition(val);
      } else {
        token.setPosition(0);
      }
    }
  }
}

module.exports.BoardController = BoardController;
