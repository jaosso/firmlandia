var QuizModalPlugin = function (scene) {
  // the scene that owns the plugin
  this.scene = scene;
  this.systems = scene.sys;

  this.scene.load.scenePlugin('ButtonPlugin', '/button_plugin.js', 'button', 'button');

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this);
  }
};

// Register this plugin with the PluginManager
QuizModalPlugin.register = function (PluginManager) {
  PluginManager.register('QuizModalPlugin', QuizModalPlugin, 'quizModal');
};

QuizModalPlugin.prototype = {
  // called when the plugin is loaded by the PluginManager
  boot: function () {
    var eventEmitter = this.systems.events;
    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  },

  //  Called when a Scene shuts down, it may then come back again later
  // (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function () {
    if (this.question) this.question.destroy();
    if (this.answerButton1) this.answerButton1.destroy();
    if (this.answerButton2) this.answerButton2.destroy();
    if (this.answerButton3) this.answerButton3.destroy();
    if (this.answerButton4) this.answerButton4.destroy();
  },

  // called when a Scene is destroyed by the Scene Manager
  destroy: function () {
    this.shutdown();
    this.scene = undefined;
  },

  // Initialize the dialog modal
  init: function (opts) {
    // Check to see if any optional parameters were passed
    if (!opts) opts = {};
    // set properties from opts object or use defaults
    this.borderThickness = opts.borderThickness || 3;
    this.borderColor = opts.borderColor || 0x907748;
    this.borderAlpha = opts.borderAlpha || 1;
    this.windowAlpha = opts.windowAlpha || 1;
    this.windowColor = opts.windowColor || 0x303030;
    this.windowHeight = opts.windowHeight || 150;
    this.outerPadding = opts.outerPadding || 32;
    this.innerPadding = opts.innerPadding || 10;
    this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
    this.dialogSpeed = opts.dialogSpeed || 3;

    this.rightAnswerNbr;
    this.answer1;
    this.answer2;
    this.answer3;
    this.answer4;

    // if the dialog window is shown
    this.visible = true;
    this.isActive = true;

    // graphical elements
    this.question;
    this.dialog;
    this.graphics;
    this.closeBtn;
    this.answerButton1;
    this.answerButton2;
    this.answerButton3;
    this.answerButton4;

    this.onFinish = () => {};
    this.isAnswerCorrect = false;


    // Create the dialog window
    this._createWindow();
  },

  // Hide/Show the dialog window
  toggleWindow: function () {
    this.visible = !this.visible;
    if (this.question) this.question.visible = this.visible;
    if (this.answerButton1) this.answerButton1.toggleWindow();
    if (this.answerButton2) this.answerButton2.toggleWindow();
    if (this.answerButton3) this.answerButton3.toggleWindow();
    if (this.answerButton4) this.answerButton4.toggleWindow();
    if (this.graphics) this.graphics.visible = this.visible;
    if (this.closeBtn) this.closeBtn.visible = this.visible;
  },

  // Sets the quiz for the quiz window
  setQuiz: function (questionText, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3) {
    this._setQuiz(questionText, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3)
  },

  setOnFinish: function (onFinish) {
    this.onFinish = onFinish;
  },

  getIsAnswerCorrect: function () {
    return this.isAnswerCorrect;
  },

  // Calcuate the position of the Quiz in the dialog window
  _setQuiz: function (questionText, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3) {
    // Reset the question
    if (this.question) this.question.destroy();

    var x = this.outerPadding + this.innerPadding;
    var y = this._getGameHeight() / 2 - this.windowHeight / 2 - this.outerPadding + this.innerPadding;

    this.question = this.scene.add.text(x, y, questionText, { wordWrap: { width: this._getGameWidth() - (this.outerPadding * 2) - 25 } });
    // randomize answer order
    indexes = [ 0, 1, 2, 3 ];
    answers = [ rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3];
    this._shuffle(indexes);

    this.answer1 = answers[indexes[0]];
    this.answer2 = answers[indexes[1]];
    this.answer3 = answers[indexes[2]];
    this.answer4 = answers[indexes[3]];
    this.rightAnswerNbr = indexes.findIndex( e => e == 0 ) + 1;

    this.answerButton1 = this._createAnswerButton(this.answerButton1, x , y + 50, true, this.answer1);
    this.answerButton2 = this._createAnswerButton(this.answerButton2, x + (this._getGameWidth() / 2) - this.outerPadding, y + 50, false, this.answer2);
    this.answerButton3 = this._createAnswerButton(this.answerButton3, x , y + 100, false, this.answer3);
    this.answerButton4 = this._createAnswerButton(this.answerButton4, x + (this._getGameWidth() / 2) - this.outerPadding, y + 100, false, this.answer4);

    this.answerButton1.setOnClick( () => { this._checkAnswer(1); });
    this.answerButton2.setOnClick( () => { this._checkAnswer(2); });
    this.answerButton3.setOnClick( () => { this._checkAnswer(3); });
    this.answerButton4.setOnClick( () => { this._checkAnswer(4); });
  },

  // Gets the width of the game (based on the scene)
  _getGameWidth: function () {
    return this.scene.sys.game.config.width;
  },

  // Gets the height of the game (based on the scene)
  _getGameHeight: function () {
    return this.scene.sys.game.config.height;
  },

  // Calculates where to place the dialog window based on the game size
  _calculateWindowDimensions: function (width, height) {
    var x = this.outerPadding;
    var y = this._getGameHeight() / 2 - this.windowHeight / 2 - this.outerPadding;
    var rectWidth = width - (this.outerPadding * 2);
    var rectHeight = this.windowHeight;
    return {
      x,
      y,
      rectWidth,
      rectHeight
    };
  },

  // Creates the inner dialog window (where the text is displayed)
  _createInnerWindow: function (x, y, rectWidth, rectHeight) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  },

  // Creates the border rectangle of the dialog window
  _createOuterWindow: function (x, y, rectWidth, rectHeight) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  },

  // Creates the dialog window
  _createWindow: function () {
    var gameHeight = this._getGameHeight();
    var gameWidth = this._getGameWidth();
    var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();

    this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    this._createCloseModalButton();
    this._createCloseModalButtonBorder();
  },

  // Creates the close dialog window button
  _createCloseModalButton: function () {
    var self = this;
    this.closeBtn = this.scene.make.text({
      x: this._getGameWidth() - this.outerPadding - 14,
      y: this._getGameHeight() / 2 - this.windowHeight / 2 - this.outerPadding + this.borderThickness,
      text: 'X',
      style: {
        font: 'bold 12px Arial',
        fill: this.closeBtnColor
      }
    });
    this.closeBtn.setInteractive();

    this.closeBtn.on('pointerover', function () {
      this.setTint(0xff0000);
    });
    this.closeBtn.on('pointerout', function () {
      this.clearTint();
    });
    this.closeBtn.on('pointerdown', function () {
      self.toggleWindow();
      if (self.text) self.text.destroy();
    });
  },

  // Creates the close dialog button border
  _createCloseModalButtonBorder: function () {
    var x = this._getGameWidth() - this.outerPadding - 20;
    var y = this._getGameHeight() / 2 - this.windowHeight / 2 - this.outerPadding;
    this.graphics.strokeRect(x, y, 20, 20);
  },

  // Creates a answer button
  _createAnswerButton: function (answerButton, x, y, isRight, answerText) {
    width = (this._getGameWidth() - (this.outerPadding * 2) - 4 * this.innerPadding) / 2;
    height = (this.windowHeight - this.question.height) / 2 - 4 * this.innerPadding;

    answerButton = new ButtonPlugin(this.scene);
    answerButton.init({ positionX: x, positionY: y, windowWidth: width, windowHeight: height, text: answerText});

    return answerButton;
  },

  _toggleActive: function () {
    this.answerButton1.toggleActive();
    this.answerButton2.toggleActive();
    this.answerButton3.toggleActive();
    this.answerButton4.toggleActive();
  },

  _checkAnswer: function ( buttonNumber ) {
    this._toggleActive();

    if ( buttonNumber == this.rightAnswerNbr ) {
      this.isAnswerCorrect = true;
      if(buttonNumber == 1) {
        this.answerButton1.setButtonColor("0x62f20f", 1);
      } else if (buttonNumber == 2) {
        this.answerButton2.setButtonColor("0x62f20f", 1);
      } else if (buttonNumber == 3) {
        this.answerButton3.setButtonColor("0x62f20f", 1);
      } else if (buttonNumber == 4) {
        this.answerButton4.setButtonColor("0x62f20f", 1);
      }
    } else {
      this.isAnswerCorrect = false;
      if(buttonNumber == 1) {
        this.answerButton1.setButtonColor("0xeb4034", 1);
      } else if (buttonNumber == 2) {
        this.answerButton2.setButtonColor("0xeb4034", 1);
      } else if (buttonNumber == 3) {
        this.answerButton3.setButtonColor("0xeb4034", 1);
      } else if (buttonNumber == 4) {
        this.answerButton4.setButtonColor("0xeb4034", 1);
      }
    }

    this.onFinish();
  },

  _shuffle:  function (array) {
    array.sort(() => {
      return Math.random() - .5;
    });
  }
};
