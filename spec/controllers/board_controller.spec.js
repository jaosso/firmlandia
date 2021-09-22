var boardSettings = require('../spec_variables').boardSettings;

var BoardController =
  require('../../app/controllers/board_controller').BoardController;

describe('BoardFactory creates Board properly ', function () {
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
    var validBoard = boardController.create(boardOptions);

    expect(validBoard.getShape()).toEqual(boardSettings.shape);
    expect(validBoard.getPath().path).toEqual(boardSettings.path);
    expect(validBoard.getPrimeColor()).toEqual(boardSettings.prime_color);
    expect(validBoard.getSecondColor()).toEqual(boardSettings.second_color);
  });
});

describe('BoardFactory calculates the path for a given shape correctly ', function () {
  var boardController;
  beforeAll(function () {
    boardController = new BoardController();
  });

  test('when empty shape is given, fails', function () {
    expect(boardController.calcPath(['']).length).toEqual(null);
  });

  test('when valid shape is given, succeeds', function () {
    var validShape = ['S11', '101', '111'];
    var validPath = {
      length: 8,
      path: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
        { x: 1, y: 0 },
      ],
    };

    expect(boardController.calcPath(validShape).path).toEqual(validPath.path);
  });
});

describe('BoardFactory calculates adjacency matrix correctly ', function () {
  var boardController;
  beforeAll(function () {
    boardController = new BoardController();
  });

  test('when diagonal is false, succeeds', function () {
    var nodes = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ];

    expect(
      boardController.buildAdjacencyMatrix(nodes, { diagonal: false })
    ).toEqual([
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 1],
    ]);
  });

  test('when diagonal is true, succeeds', function () {
    var nodes = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ];

    expect(
      boardController.buildAdjacencyMatrix(nodes, { diagonal: true })
    ).toEqual([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ]);
  });
});
