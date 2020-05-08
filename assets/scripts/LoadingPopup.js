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

  this.bg =  Util.createSprite({
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
    rotation: -90,
    scaleXY: 1.5
  });

  this.loaderText = new PIXI.Text('Waiting For Opponent', {
    font: '35px Snippet',
    fontSize: 17,
    fill: 'white',
    align: 'center',
    width: 250,
    height: 150
  });
  this.loaderText.anchor.set(0.5);
  this.loaderText.position.x = 640 * 0.5;
  this.loaderText.position.y = 280;
  this.bg.addChild(this.loaderText);


  this.loadingIndicator = new PIXI.Sprite(NORD.assetsManager.getTexture('loadIcon'));
  this.loadingIndicator.anchor.set(0.5);
  this.loadingIndicator.position.set(0, -40);
  this.loadingIndicator.scale.x = 0.5;
  this.loadingIndicator.scale.y = 0.5;
  this.addChild(this.loadingIndicator);
  this.currentAngle = 0;


  this.timerTextValue = 15;
  this.timerText = new PIXI.Text('', {
    font: '35px Snippet',
    fontSize: 17,
    fill: 'white',
    align: 'center'
  });
  this.timerText.anchor.set(0.5);
  this.timerText.position.set(0, -80);
  this.addChild(this.timerText);



  this.Button = Util.createButton('btn', this, null, '', 0, 80, 147, 68, NORD.game.tweenClickSimple, NORD.assetsManager.getAsset('CommonBtn'), {
    texture: 'CommonBtn',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.8,
    scaleY: 0.8
  });
  this.Button.alpha = 0;
  this.Button.soundClick = NORD.assetsManager.getAsset('play_button');
  this.Button.addListener('button_click', function(data) {
    if (NORD.mainMenu.loadingPopup.timerText.timerTextValue <= 0) {
      MainMenuLocation.enableAllButtons();
      NORD.mainMenu.loadingPopup.hide();
      MainMenuLocation.multiplayerSelectionPopup.show();
    }
  }, this);

  var buttonText = new PIXI.Text('Okay', {
    font: '35px Snippet',
    fontSize: 17,
    fill: 'white',
    align: 'center'
  });
  buttonText.anchor.set(0.5);
  buttonText.position.set(0, 0);
  this.Button.addChild(buttonText);
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
    if (callback) callback();
  }

  if (data.name == 'hide') {
    this.state = 'hide';
    this.visible = false;
    this.interactiveChildren = false;
    if (callback) callback();
  }
};

//Shunmugam Multiplayer Selection Popup End
