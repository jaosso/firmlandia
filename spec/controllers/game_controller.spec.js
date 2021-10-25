var GameController =
  require('../../app/controllers/game_controller').GameController;
var GameConfig = require('../../app/config/game_config.json');

describe('Game class ', function () {
  var game_controller;
  beforeEach(function () {
    game_controller = new GameController(GameConfig);
  });

  test('constructor works properly, succeeds', function () {
    expect(game_controller).not.toBe(null);
  });

  test('parts of the game get initialized, succeeds', function () {
    expect(game_controller.board_controller).not.toEqual(null);
    expect(game_controller.point_marker_controller).not.toEqual(null);
    expect(game_controller.quiz).not.toEqual(null);
    expect(game_controller.dice).not.toEqual(null);
  });
});
