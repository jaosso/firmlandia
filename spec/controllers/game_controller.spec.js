var GameController =
  require('../../app/controllers/game_controller').GameController;

describe('Game class ', function () {
  var game_controller;
  beforeEach(function () {
    game_controller = new GameController();
  });
  
  test('constructor works properly, succeeds', function () {
    expect(game_controller).not.toBe(null);
  });
});
