// import Phaser from 'phaser'
// import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js'
var Phaser = require('phaser');
var IO = require('socket.io-client');
// var BoardPlugin = require('./rexboardplugin.min.js')
var BoardPlugin = require('phaser3-rex-plugins/dist/rexboardplugin.min.js')

const TILESMAP_INNERBOARD = require('../assets/tilesmaps/inner.json').tilesmap_innerboard
const TILESMAP_OUTERBOARD = require('../assets/tilesmaps/outer.json').tilesmap_outerboard
const TILESMAP_SYMBOL_WISDOM = require('../assets/tilesmaps/symbols.json').wisdom
const TILESMAP_SYMBOL_INSIGHT = require('../assets/tilesmaps/symbols.json').insight
const TILESMAP_SYMBOL_ADVICE = require('../assets/tilesmaps/symbols.json').advice
const TILESMAP_SYMBOL_STRENGTH = require('../assets/tilesmaps/symbols.json').strength
const TILESMAP_SYMBOL_UNDERSTANDING = require('../assets/tilesmaps/symbols.json').understanding
const TILESMAP_SYMBOL_PIETY = require('../assets/tilesmaps/symbols.json').piety
const TILESMAP_SYMBOL_FEAROFGOD = require('../assets/tilesmaps/symbols.json').fearofgod

const Between = Phaser.Math.Between;
class MyGame extends Phaser.Scene {
    constructor () {
        super("game");
    }

    preload () {
        // load the rexBoardPlugin to handle my game board
        this.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
        this.load.scenePlugin('QuizModalPlugin', '/quiz_plugin.js', 'quizModal', 'quizModal')
    }

    create () {
        this.socket = IO.connect();
        // create an board from the rexBoardPlugin with the predefined tilesmap
        var innerboard = new Board(this, TILESMAP_INNERBOARD, 80, 80);
        var outerboard = new Board(this, TILESMAP_OUTERBOARD, 50, 50);

        // create a button to trigger the quiz function as long as there are no other mechanics to do so
        var buttonQuiz = this.add.text(1000, 100, 'Quiz', { fill: '#0f0' });
        buttonQuiz.setInteractive({ useHandCursor: true })
        .on('pointerover', () => { buttonQuiz.setStyle({ fill: '#ff0'}) })
        .on('pointerout', () => { buttonQuiz.setStyle({ fill: '#0f0'}) })
        .on('pointerdown', () => {
            buttonQuiz.setStyle({ fill: '#0ff' });
            // pause MyGame scene an start the Quiz scene
            this.scene.pause().launch('quiz');
          })
        .on('pointerup', () => { buttonQuiz.setStyle({ fill: '#ff0' }) });

        // create symbols
        var wisdom = createMiniBoard(this, 800, 100)
        var insight = createMiniBoard(this, 900, 150)
        var advice = createMiniBoard(this, 800, 200)
        var strength = createMiniBoard(this, 900, 250)
        var understanding = createMiniBoard(this, 800, 300)
        var piety = createMiniBoard(this, 900, 350)
        var fearofgod = createMiniBoard(this, 800, 400)

        addMapToMiniBoard(this, wisdom, TILESMAP_SYMBOL_WISDOM, 0xffffff)
        addMapToMiniBoard(this, insight, TILESMAP_SYMBOL_INSIGHT, 0xffffff)
        addMapToMiniBoard(this, advice, TILESMAP_SYMBOL_ADVICE, 0xffffff)
        addMapToMiniBoard(this, strength, TILESMAP_SYMBOL_STRENGTH, 0xffffff)
        addMapToMiniBoard(this, understanding, TILESMAP_SYMBOL_UNDERSTANDING, 0xffffff)
        addMapToMiniBoard(this, piety, TILESMAP_SYMBOL_PIETY, 0xffffff)
        addMapToMiniBoard(this, fearofgod, TILESMAP_SYMBOL_FEAROFGOD, 0xffffff)

        makeMiniBoardDraggable(wisdom, innerboard)
        makeMiniBoardDraggable(insight, innerboard)
        makeMiniBoardDraggable(advice, innerboard)
        makeMiniBoardDraggable(strength, innerboard)
        makeMiniBoardDraggable(understanding, innerboard)
        makeMiniBoardDraggable(piety, innerboard)
        makeMiniBoardDraggable(fearofgod, innerboard)

        // spawn the player
        var playerToken = new PlayerToken(outerboard, {
            x: 0,
            y: 0
        }, 0xffffff);

        var movingPointsTxt = this.add.text(10, 10, '');
        this.input.on('pointerdown', function (pointer) {
            var movingPoints = Between(1, 6);
            movingPointsTxt.setText(movingPoints)
            playerToken.moveForward(movingPoints);
        });
    }
}

class Quiz extends Phaser.Scene {
  constructor() {
    super("quiz")
  }

  preload() {
    this.load.scenePlugin('ButtonPlugin', '/button_plugin.js', 'button', 'button');
    this.load.scenePlugin('QuizModalPlugin', '/quiz_plugin.js', 'quizModal', 'quizModal');
  }

  create() {
    var quiz = new QuizModalPlugin(this);

    // load question and answers
    var questionText = "Welches Feld möchtest du auswählen?";
    var answer1 = "dieses schon";
    var answer2 = "dieses nicht";
    var answer3 = "dieses nicht";
    var answer4 = "dieses nicht";

    // init the quiz
    quiz.init();
    quiz.setQuiz(questionText, answer1, "diese ist falsch", "diese ist falsch", "diese ist falsch");

    quiz.setOnFinish( () => {
      if(quiz.getIsAnswerCorrect()) {
        console.log("Correct!");
      } else {
        console.log("Wrong!");
      }

      var resumeButton = new ButtonPlugin(this);
      resumeButton.init({ positionX: 150, positionY: 150, windowWidth: 150, windowHeight: 50, text: "Resume"});
      resumeButton.setOnClick( () => {
        quiz.toggleWindow();
        resumeButton.toggleWindow();
        this.scene.pause().resume("game");
       });
    });
  }

  refresh() {
    this.scene.bringToTop();
  }
}

class Player {
  constructor (opts) {
    if (!opts) opts = {};
    // Identifires
    this.playerId = opts.playerId || 0,
    this.playerName = opts.playerName || "player_name",
    this.playerColor = opts.playerColor || "0x000000",
    // Board variables
    this.position = opts.position || 0,
    this.orderPosition = opts.orderPosition || 0,
    this.lastDice = opts.lastDice || 0,
    this.points= opts.points || 0,
    // Currencies
    this.wind = this.wind || 0,
    this.fire = this.fire || 0,
    this.dove = this.dove || 0,
    // Inventory
    this.wisdom = this.wisdom || 0,
    this.insight = this.insight || 0,
    this.advice = this.advice || 0,
    this.strength = this.strength || 0,
    this.understanding = this.understanding || 0,
    this.piety = this.piety || 0,
    this.fearofgod = this.fearofgod || 0

  }
}

const COLORMAP = [0x087f23, 0x4caf50];
class Board extends RexPlugins.Board.Board {
    constructor(scene, tilesMap, x, y) {
        var tiles = createTileMap(tilesMap);
        // create board
        var config = {
            grid: getQuadGrid(scene, x, y),
            width: tiles[0].length,
            height: tiles.length,
            //wrap: true
        }
        super(scene, config);
        this.createPath(tiles);
    }

    createPath(tiles) {
        // tiles : 2d array
        var line, symbol, cost;
        for (var tileY = 0, ycnt = tiles.length; tileY < ycnt; tileY++) {
            line = tiles[tileY];
            for (var tileX = 0, xcnt = line.length; tileX < xcnt; tileX++) {
                symbol = line[tileX];
                if (symbol === ' ') {
                    continue;
                }

                cost = parseFloat(symbol);
                this.scene.rexBoard.add.shape(this, tileX, tileY, 0, COLORMAP[cost])
                    .setStrokeStyle(1, 0xffffff, 1)
                    .setData('cost', cost);
            }
        }
        return this;
    }
}

// Seems to be the player (Board.Shape is a Polygon Shape object for board games)
class PlayerToken extends RexPlugins.Board.Shape {
    constructor(board, tileXY, color) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 1, color);
        scene.add.existing(this);
        this.setScale(0.9);

        // add behaviors
        this.monopoly = scene.rexBoard.add.monopoly(this, {
            face: 0,
            pathTileZ: 0,
            costCallback: function (curTileXY, preTileXY, monopoly) {
                var board = monopoly.board;
                return board.tileXYZToChess(curTileXY.x, curTileXY.y, 0).getData('cost');
            },
        });
        this.moveTo = scene.rexBoard.add.moveTo(this);

        // private members
        this.movingPathTiles = [];
    }

    showMovingPath(tileXYArray) {
        this.hideMovingPath();
        var tileXY, worldXY;
        var scene = this.scene,
            board = this.rexChess.board;
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
            this.movingPathTiles.push(scene.add.circle(worldXY.x, worldXY.y, 10, 0xb0003a));
        }
    }

    hideMovingPath() {
        for (var i = 0, cnt = this.movingPathTiles.length; i < cnt; i++) {
            this.movingPathTiles[i].destroy();
        }
        this.movingPathTiles.length = 0;
        return this;
    }

    moveForward(movingPoints) {
        if (this.moveTo.isRunning) {
            return this;
        }

        var path = this.monopoly.getPath(movingPoints);
        this.showMovingPath(path);
        this.moveAlongPath(path);
        return this;
    }
    moveAlongPath(path) {
        if (path.length === 0) {
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        var tileData = path.shift();
        this.moveTo.moveTo(tileData);
        this.monopoly.setFace(this.moveTo.destinationDirection);
        return this;
    }
}

var actionOnClick = function (scene) {
  // start Quiz
  console.log("Hallo Welt")
  console.log(scene.scene)
  scene.scene.start("quiz")
}

// creates a MiniBoard by an passed tilemap
var createMiniBoard = function (scene, x, y) {
  return scene.rexBoard.add.miniBoard(x, y, {
      grid: getQuadGrid(scene, 0, 0),
      draggable: true
  })
}

// adds a map shaped object to the passed MiniBoard
var addMapToMiniBoard = function (scene, miniBoard, tilesMap, color) {
  var line
  for (var i = 0, icnt = tilesMap.length; i < icnt; i++) {
    line = tilesMap[i].split('')
    for (var j = 0, jcnt = line.length; j < jcnt; j++) {
      if (line[j] !== ' ') {
        scene.rexBoard.add.shape(miniBoard, j - 1, i - 1, 0, color)
      }
    }
  }
}

// adds a QuadGrid to the given scene
var getQuadGrid = function (scene, x, y) {
    var grid = scene.rexBoard.add.quadGrid({
        x: x,
        y: y,
        cellWidth: 18,
        cellHeight: 18,
        type: 0
    });
    return grid;
}

// Split the TILESMAP
var createTileMap = function (tilesMap, out) {
    if (out === undefined) {
        out = [];
    }
    for (var i = 0, cnt = tilesMap.length; i < cnt; i++) {
        out.push(tilesMap[i].split(''));
    }
    return out;
}

var makeMiniBoardDraggable = function (miniBoard, mainBoard) {
    miniBoard
        .on('dragstart', function (pointer, dragX, dragY) {
            this.pullOutFromMainBoard();
            this.setAlpha(0.3);
        }, miniBoard)
        .on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY);
            if (this.isOverlapping(mainBoard)) {
                this.setAlpha(0.7);
                this.alignToMainBoard(mainBoard);
            } else {
                this.setAlpha(0.3);
            }
        }, miniBoard)
        .on('dragend', function (pointer, dragX, dragY) {
            this.putOnMainBoard(mainBoard);
            if (this.mainBoard) {
                this.setAlpha(1);
            }
        }, miniBoard);
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MyGame, Quiz],
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

const GAME = new Phaser.Game(config);
