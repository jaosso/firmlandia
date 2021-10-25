var Quiz = require('./quiz').Quiz;
var Dice = require('./dice').Dice;
var PointMarkerController =
  require('./point_marker_controller').PointMarkerController;
var BoardController = require('./board_controller').BoardController;

class GameController {
  constructor(game_config) {
    this.game_config = Object.assign(
      {
        board_config: null,
        point_marker_config: null,
        dice_config: null,
        quiz_config: null,
      },
      game_config
    );
    this.board_controller = new BoardController(game_config.board_config);
    this.point_marker_controller = new PointMarkerController(
      game_config.point_marker_config
    );
    this.dice = new Dice(game_config.dice_config);
    this.quiz = new Quiz(game_config.quiz_config);
  }
}

module.exports.GameController = GameController;
