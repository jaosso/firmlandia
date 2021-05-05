var ButtonPlugin = function (scene) {
  this.scene = scene;
  this.systems = scene.sys;

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this);
  }
};

// Register this plugin with the PluginManager
ButtonPlugin.register = function (PluginManager) {
  PluginManager.register('ButtonPlugin', ButtonPlugin, 'button');
};

ButtonPlugin.prototype = {
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
    this.windowAlpha = opts.windowAlpha || 0.8;
    this.windowColor = opts.windowColor || 0x303030;
    this.backgroundColor = opts.backgroundColor || 0x000000;
    this.backgroundAlpha = opts.backgroundAlpha || 1;
    this.textColor = opts.textColor || 0xffffff;
    this.textAlpha = opts.textAlpha || 1;
    this.windowHeight = opts.windowHeight || 150;
    this.windowWidth = opts.windowWidth || 300;
    this.positionX = opts.positionX || 0;
    this.positionY = opts.positionY || 0;
    this.text = opts.text || "Click Me!";
    this.visible = opts.visible || true;
    this.isActive = opts.isActive || true;

    this.count = 0;

    this.onClick = function () { console.log("Click!"); };
    // this.onClick;
    this.graphics;
    this.buttonBox;
    this.backgroundBox;

    // Create the dialog window
    this._createButton();
  },

  setOnClick: function (onClick) {
    this.onClick = onClick;
  },

  setButtonColor: function(color, alpha) {
    this._setButtonColor(color, alpha);
  },

  toggleActive: function() {
    if (this.isActive) {
      this.isActive = false;
      this._setButtonColor(this.windowColor, 0.5);
      this.buttonBox.input.cursor = 'default';
    } else {
      this.isActive = true;
      this._setButtonColor(this.windowColor, 1);
      this.buttonBox.input.cursor = 'pointer';
    }
  },

  toggleWindow: function() {
    this.visible = !this.visible;
    if (this.text) this.text.visible = this.visible;
    if (this.graphics) this.graphics.visible = this.visible;
    if (this.buttonBox) this.buttonBox.visible = this.visible;
    if (this.backgroundBox) this.backgroundBox.visible = this.visible;
  },

  _createButton: function () {
    // calculate the center of the button
    centerX = this.positionX + this.windowWidth/2;
    centerY = this.positionY + this.windowHeight/2;


    this.graphics = this.scene.add.graphics();
    this._createButtonBorder(this.positionX, this.positionY, this.windowWidth, this.windowHeight);
    this._createButtonField(centerX, centerY, this.windowWidth, this.windowHeight);

    // Calculate the Center of the button box and move the text so text.center fits the calculated center
    this.text = this.scene.add.text(this.positionX, this.positionY, this.text, { wordWrap: { width: this.windowWidth - 4 } });
    currentCenter = this.text.getCenter();
    this.text.setPosition(this.positionX + centerX - currentCenter.x, this.positionY + centerY - currentCenter.y);

    // Create onClick function
    this.buttonBox.setInteractive();
    this.buttonBox.input.cursor = 'pointer';
    this.buttonBox.on('pointerover', () => { })
      .on('pointerout', () => { })
      .on('pointerdown', () => {
        if(this.isActive) {
          oldAlpha = this.windowAlpha;
          this._setButtonColor(this.windowColor, this.windowAlpha - 0.2);
          this.windowAlpha = oldAlpha;
          this.onClick();
        }
      })
      .on('pointerup', () => { this._setButtonColor(this.windowColor, this.windowAlpha); });
  },

  _createButtonBorder: function (x, y, width, height) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, width, height);
  },

  _createButtonField: function(x, y, width, height) {
    this.graphics.fillStyle(this.backgroundColor, this.backgroundAlpha);
    this.graphics.fillRect(this.positionX, this.positionY, width, height);
    this.buttonBox = this.scene.add.rectangle(x, y, width - 2, height - 2, this.windowColor);
  },

  _setButtonColor: function(color, alpha) {
    this.windowColor = color;
    this.windowAlpha = alpha;
    this.buttonBox.setFillStyle(color, alpha);
  }
}
