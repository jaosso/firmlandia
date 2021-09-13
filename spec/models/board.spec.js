var boardSettings = require('../spec_variables').boardSettings;
var newBoardSettings = require('../spec_variables').newBoardSettings;
var Board = require('../../app/models/board').Board;

describe('Board data object ', function () {
  var board;
  beforeEach(function () {
    board = new Board(
      boardSettings.shape,
      boardSettings.path,
      boardSettings.prime_color,
      boardSettings.second_color
    );
  });

  test('constructor creates object properly, succeeds', function () {
    expect(board).not.toEqual(null);
  });

  test('getters work properly, succeeds', function () {
    expect(board.getShape()).toEqual(boardSettings.shape);
    expect(board.getPath()).toEqual(boardSettings.path);
    expect(board.getPrimeColor()).toEqual(boardSettings.prime_color);
    expect(board.getSecondColor()).toEqual(boardSettings.second_color);
    expect(typeof board.getTokenList()).toEqual(typeof {});
    expect(board.getPathLength()).toEqual(boardSettings.path.length);
  });

  test('plain setters work properly, succeeds', function () {
    board.setShape(newBoardSettings.shape);
    board.setPath(newBoardSettings.path);
    board.setPrimeColor(newBoardSettings.prime_color);
    board.setSecondColor(newBoardSettings.second_color);

    expect(board.getShape()).toEqual(newBoardSettings.shape);
    expect(board.getPath()).toEqual(newBoardSettings.path);
    expect(board.getPrimeColor()).toEqual(newBoardSettings.prime_color);
    expect(board.getSecondColor()).toEqual(newBoardSettings.second_color);
  });

  test('add token to board, succeeds', function () {
    var player_id = 0;
    var token_color = 'red';
    var position = 0;

    board.addToken(player_id, token_color, position);
    var tokenList = board.getTokenList();
    var newToken = tokenList[player_id];

    expect(newToken).not.toEqual(null);
    expect(newToken.getPlayerId()).toEqual(player_id);
    expect(newToken.getTokenColor()).toEqual(token_color);
    expect(newToken.getPosition()).toEqual(position);
  });
});
