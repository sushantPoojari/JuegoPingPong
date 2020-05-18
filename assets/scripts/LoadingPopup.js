"use strict";

NORD.LOADING_POPUP_TYPE = {
  InitializingServer: 1,
  WaitingForComponent: 2
}

//Shunmugam Multiplayer Selection Popup
NORD.LoadingPopup = function(config) {
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 300;
  NORD.GUI.BasePanel.call(this, config);
  var loaderText;

  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false;

  this.bg = Util.createSprite({
    parent: this,
    texture: 'BG',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.465
  });

  var dividerLine = Util.createSprite({
    parent: this,
    x: 0,
    y: 20,
    texture: 'Separator',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.25,
    scaleY: 0.5
  });

  dividerLine.angle = 90;

  this.ball = Util.createSprite({
    parent: this,
    x: 0,
    y: 0,
    texture: 'Ball',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5
  });

  var PlayerRight = Util.createSprite({
    parent: this,
    x: 225,
    y: 0,
    texture: 'PlayerRight',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5
  });

  this.playerName = new PIXI.Text('YOU', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center',
    width: 250,
    height: 150
  });
  this.playerName.resolution = 2;
  this.playerName.anchor.set(0.5);
  this.playerName.position.x = 500;
  this.playerName.position.y = 250;
  this.bg.addChild(this.playerName);


  var PlayerLeft = Util.createSprite({
    parent: this,
    x: -225,
    y: 0,
    texture: 'PlayerLeft',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5
  });
  PlayerLeft.alpha = 0.5;

  this.playerName = new PIXI.Text('OPPONENT', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center',
    width: 250,
    height: 150
  });
  this.playerName.resolution = 2;
  this.playerName.anchor.set(0.5);
  this.playerName.position.x = -500;
  this.playerName.position.y = 250;
  this.bg.addChild(this.playerName);

  this.loaderText = new PIXI.Text('Waiting For Opponent...', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center',
  });
  this.loaderText.resolution = 2;
  this.loaderText.anchor.set(0.5);
  this.loaderText.position.x = 0;
  this.loaderText.position.y = -400;
  this.bg.addChild(this.loaderText);


  this.loadingIndicator = new PIXI.Sprite(NORD.assetsManager.getTexture('loadIcon'));
  this.loadingIndicator.anchor.set(0.5);
  this.loadingIndicator.position.set(-225, 0);
  this.loadingIndicator.scale.x = 0.5;
  this.loadingIndicator.scale.y = 0.5;
  this.addChild(this.loadingIndicator);
  this.currentAngle = 0;

  this.timerTextValue = 15;
  this.timerText = new PIXI.Text('', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center'
  });
  this.timerText.resolution = 2;
  this.timerText.anchor.set(0.5);
  this.timerText.position.set(0, 435);
  this.bg.addChild(this.timerText);

  this.Button = Util.createButton('btn', this, null, '', 0, 200, 147, 68, NORD.game.tweenClickSimple, NORD.assetsManager.getAsset('CancelButton'), {
    texture: 'CancelButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5
  });
  this.Button.alpha = 0;
  this.Button.soundClick = NORD.assetsManager.getAsset('play_button');
  this.Button.addListener('button_click', function(data) {
    if (NORD.mainMenu.loadingPopup.timerText.timerTextValue <= 0) {
      MainMenuLocation.enableAllButtons();
      NORD.mainMenu.loadingPopup.hide();
      NORD.game.screenGame.toMainMenu();

      // MainMenuLocation.multiplayerSelectionPopup.show();
    }
  }, this);
};

NORD.LoadingPopup.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.LoadingPopup.prototype.constructor = NORD.LoadingPopup;

NORD.LoadingPopup.prototype.show = function(data) {
  this.loaderText.text = data;

  this.tween({
    name: 'show_anim'
  });
};

NORD.LoadingPopup.prototype.hide = function(data, callback) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    if (callback) callback();
  });
};

NORD.LoadingPopup.prototype.tween = function(data, callback) {
  var self = this;
  if (data.name == 'show_anim' && this.state == 'hide') {
    this.state = 'show_anim';
    this.visible = true;
    this.alpha = 0;
    this.y = -30;
    var time = 6 / 30;
    TweenMax.to(this, time, {
      alpha: 1,
      x: 0,
      y: 0,
      ease: Power2.easeOut,
      onComplete: function onComplete() {
        self.tween({
          name: 'show'
        }, callback);
      }
    }); // this.tween({ name: 'show' }, callback);
  }

  if (data.name == 'hide_anim' && this.state == 'show') {
    this.state = 'hide_anim';
    this.interactiveChildren = false;
    TweenMax.to(NORD.game.screenGame.buttonPause.regularSkin, 6 / 30, {
      alpha: 1,
      ease: Power2.easeOut
    });
    var time = 6 / 30;
    TweenMax.to(this, time, {
      alpha: 0,
      x: 0,
      y: -30,
      ease: Power2.easeOut,
      onComplete: function onComplete() {
        self.tween({
          name: 'hide'
        }, callback);
      }
    }); // this.tween({ name: 'hide' }, callback);
  }

  if (data.name == 'show' && this.state != 'show') {
    this.state = 'show';
    this.visible = true;
    this.interactiveChildren = true;
    this.alpha = 1.0;

    rotateAction();

    function rotateAction() {
      requestAnimationFrame(rotateAction);
      if (NORD.mainMenu.loadingPopup.ball != undefined)
        NORD.mainMenu.loadingPopup.ball.rotation += 0.01;
    }

    moveUp();

    function moveUp() {
      if (NORD.mainMenu.loadingPopup.ball.tweenSpeed != null)
        NORD.mainMenu.loadingPopup.ball.tweenSpeed.kill();
      NORD.mainMenu.loadingPopup.ball.tweenSpeed = TweenMax.to(NORD.mainMenu.loadingPopup.ball.position, 2, {
        x: NORD.mainMenu.loadingPopup.ball.position.x,
        y: -100,
        onComplete: function onComplete() {
          NORD.mainMenu.loadingPopup.ball.tweenSpeed = null;
          moveDown();
        }
      });
    }

    function moveDown() {
      if (NORD.mainMenu.loadingPopup.ball.tweenSpeed != null)
        NORD.mainMenu.loadingPopup.ball.tweenSpeed.kill();
      NORD.mainMenu.loadingPopup.ball.tweenSpeed = TweenMax.to(NORD.mainMenu.loadingPopup.ball.position, 2, {
        x: NORD.mainMenu.loadingPopup.ball.position.x,
        y: 120,
        onComplete: function onComplete() {
          NORD.mainMenu.loadingPopup.ball.tweenSpeed = null;
          moveUp();
        }
      });
    }


    if (callback) callback();
  }

  if (data.name == 'hide') {
    this.state = 'hide';
    this.visible = false;
    this.interactiveChildren = false;
    if (NORD.mainMenu.loadingPopup.ball.tweenSpeed != null)
      NORD.mainMenu.loadingPopup.ball.tweenSpeed.kill();
    if (callback) callback();
  }
};

//Shunmugam Multiplayer Selection Popup End
