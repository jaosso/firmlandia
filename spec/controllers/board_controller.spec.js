var boardSettings = require("../spec_variables").boardSettings;

var BoardFactory =
  require("../../app/controllers/board_controller").BoardFactory;

describe("Board class ", function () {
  test("when nothing, succeeds", function () {
    expect(true).toBeTruthy();
  });
});

describe("BoardFactory creates Board properly ", function () {
  var boardFactory;
  beforeAll(function () {
    boardFactory = new BoardFactory();
  });

  test(" when all params are valid, succeeds", function () {
    var validBoard = boardFactory.create(
      boardSettings.shape,
      boardSettings.prime_color,
      boardSettings.second_color
    );

    expect(validBoard.getShape()).toEqual(boardSettings.shape);
    expect(validBoard.getPath()).toEqual([
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
