var BoardFactory =
  require('../../app/controllers/board_controller').BoardFactory;

describe('Board class ', function () {
  test('when nothing, succeeds', function () {
    expect(true).toBeTruthy();
  });
});

describe('BoardFactory creates Board properly ', function () {
  var boardFactory;
  beforeAll(function () {
    boardFactory = new BoardFactory();
  });

  test(' when all params are valid, succeeds', function () {
    var validBoard = boardFactory.create();
  });
});
