var boardSettings = require('../spec_variables').boardSettings;
var TreeNode = require('../../app/models/tree_node').TreeNode;

var BoardFactory =
  require('../../app/controllers/board_controller').BoardFactory;

describe('BoardFactory creates Board properly ', function () {
  var boardFactory;
  beforeAll(function () {
    boardFactory = new BoardFactory();
  });

  test('when all params are valid, succeeds', function () {
    var validBoard = boardFactory.create(
      boardSettings.shape,
      boardSettings.prime_color,
      boardSettings.second_color
    );

    expect(validBoard.getShape()).toEqual(boardSettings.shape);
    expect(validBoard.getPath().path).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
      { x: 2, y: 5 },
      { x: 1, y: 5 },
      { x: 0, y: 5 },
      { x: 0, y: 4 },
      { x: 0, y: 3 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
    ]);
    expect(validBoard.getPrimeColor()).toEqual(boardSettings.prime_color);
    expect(validBoard.getSecondColor()).toEqual(boardSettings.second_color);
  });
});

describe('BoardFactory calculates the path for a given shape correctly ', function () {
  var boardFactory;
  beforeAll(function () {
    boardFactory = new BoardFactory();
  });

  test('when empty shape is given, fails', function () {
    expect(boardFactory.calcPath(['']).length).toEqual(null);
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

    expect(boardFactory.calcPath(validShape).path).toEqual(validPath.path);
  });
});

describe('BoardFactory calculates adjacency matrix correctly ', function () {
  var boardFactory;
  beforeAll(function () {
    boardFactory = new BoardFactory();
  });

  test('when diagonal is false, succeeds', function () {
    var nodes = [
      new TreeNode({ x: 0, y: 0 }),
      new TreeNode({ x: 1, y: 0 }),
      new TreeNode({ x: 2, y: 0 }),
      new TreeNode({ x: 2, y: 1 }),
      new TreeNode({ x: 2, y: 2 }),
      new TreeNode({ x: 1, y: 2 }),
      new TreeNode({ x: 0, y: 2 }),
      new TreeNode({ x: 0, y: 1 }),
    ];

    expect(
      boardFactory.buildAdjacencyMatrix(nodes, { diagonal: false })
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
      new TreeNode({ x: 0, y: 0 }),
      new TreeNode({ x: 1, y: 0 }),
      new TreeNode({ x: 0, y: 1 }),
      new TreeNode({ x: 1, y: 1 }),
    ];

    expect(
      boardFactory.buildAdjacencyMatrix(nodes, { diagonal: true })
    ).toEqual([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ]);
  });
});

describe('BoardFactory calculates hamiltonian cycle correctly from adjacency matrix ', function () {
  var boardFactory;
  beforeAll(function () {
    boardFactory = new BoardFactory();
  });

  test(' when there is no hamiltonian cycle, fails', function () {
    var invalidAdjacencyMatrix = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    expect(boardFactory.buildHamiltonianCycle(invalidAdjacencyMatrix)).toEqual(
      null
    );
  });

  test(' when there is a hamiltonian cycle, succeeds', function () {
    var validAdjacencyMatrix = [
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 1],
    ];

    expect(boardFactory.buildHamiltonianCycle(validAdjacencyMatrix)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7,
    ]);
  });
});
