var boardSettings = require('../spec_variables').boardSettings;

var BoardController =
  require('../../app/controllers/board_controller').BoardController;

describe('BoardController creates Board properly ', function () {
  var boardController;
  beforeAll(function () {
    boardController = new BoardController();
  });

  test('when all params are valid, succeeds', function () {
    var boardOptions = {
      shape: boardSettings.shape,
      prime_color: boardSettings.prime_color,
      second_color: boardSettings.second_color,
    };
    var validBoard = boardController.createBoard(boardOptions);

    expect(validBoard.getShape()).toEqual(boardSettings.shape);
    expect(validBoard.getPath().path).toEqual(boardSettings.path);
    expect(validBoard.getPrimeColor()).toEqual(boardSettings.prime_color);
    expect(validBoard.getSecondColor()).toEqual(boardSettings.second_color);
  });
});

describe('BoardController moves PlayerToken correctly ', function () {
  var boardController;
  var player = { user_id: 0, user_color: 'green' };
  beforeAll(function () {
    boardController = new BoardController();
    var boardOptions = {
      shape: boardSettings.shape,
      prime_color: boardSettings.prime_color,
      second_color: boardSettings.second_color,
    };
    boardController.createBoard(boardOptions);
  });

  describe('when isRounds is enabled ', function () {
    beforeEach(function () {
      var position = 0;
      boardController.addPlayerToken(player, position);

      if (!boardController.isRounds()) boardController.toggleRounds();
    });

    test('moving forwards from start, succeeds', function () {
      var dice = 3;
      boardController.board.getTokenList()[player.user_id].setPosition(0);

      boardController.movePlayerTokenForwards(player.user_id, dice);
      expect(
        boardController.board.getTokenList()[player.user_id].getPosition()
      ).toEqual(3);
    });

    test('moving forwards over start, succeeds', function () {
      var dice = 3;
      boardController.board
        .getTokenList()
        [player.user_id].setPosition(
          boardController.board.getPath().length - 1
        );

      boardController.movePlayerTokenForwards(player.user_id, dice);
      expect(
        boardController.board.getTokenList()[player.user_id].getPosition()
      ).toEqual(2);
    });

    test('moving backwards over start, succeeds', function () {
      var dice = 3;
      boardController.board.getTokenList()[player.user_id].setPosition(0);

      boardController.movePlayerTokenBackwards(player.user_id, dice);
      expect(
        boardController.board.getTokenList()[player.user_id].getPosition()
      ).toEqual(17);
    });

    test('moving backwards from goal, succeeds', function () {
      var dice = 3;
      boardController.board
        .getTokenList()
        [player.user_id].setPosition(
          boardController.board.getPath().length - 1
        );

      boardController.movePlayerTokenBackwards(player.user_id, dice);
      expect(
        boardController.board.getTokenList()[player.user_id].getPosition()
      ).toEqual(16);
    });
  });

  describe('when isRounds is disabled ', function () {
    beforeEach(function () {
      if (boardController.isRounds()) boardController.toggleRounds;
    });

    test('moving forwards from start, succeeds', function () {
      return false;
    });

    test('moving forwards over start, fails', function () {
      return false;
    });

    test('moving backwards over start, fails', function () {
      return false;
    });

    test('moving backwards from goal, succeeds', function () {
      return false;
    });
  });
});
