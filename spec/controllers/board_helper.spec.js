var BoardHelper = require('../../app/controllers/board_helper').BoardHelper;

describe('BoardHelper class ', function () {
  var boardHelper;
  beforeAll(function () {
    boardHelper = new BoardHelper();
  });

  test('distanceBetween calculates Distance between two points correctly', function () {
    var p1 = { x: 5, y: 5 };
    var p2 = { x: 3, y: 5 };
    var p3 = { x: 5, y: 5 };

    expect(boardHelper.distanceBetween(p1, p2)).toEqual(2);
    expect(boardHelper.distanceBetween(p1, p3)).toEqual(0);
  });

  describe('calculation of adjacency matrix ', function () {
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
        boardHelper.buildAdjacencyMatrix(nodes, { diagonal: false })
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
          boardHelper.buildAdjacencyMatrix(nodes, { diagonal: true })
        ).toEqual([
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ]);
      });
  });

  describe('BoardController calculates the path for a given shape correctly ', function () {
    test('when empty shape is given, fails', function () {
      expect(boardHelper.calcPath(['']).length).toEqual(null);
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
  
      expect(boardHelper.calcPath(validShape).path).toEqual(validPath.path);
    });
  });
});