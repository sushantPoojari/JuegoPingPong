"use strict";
// require("core-js/modules/es6.function.name");

NORD.ScreenGame = function(config) {
  config.sizeType = 'relative';
  config.widthRelative = 1;
  config.heightRelative = 1;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false;
  this.interactive = false; // this.alpha = 0;
  NORD.game.screenGame = this;

  this.field = NORD.game.field;
  this.addChild(this.field); +

  this.field.on('init_game', function() { // self.updateScore();
  });
  this.field.on('goal', function() { // self.updateScore();
  });
  this.field.on('round_complete', function() {
    setTimeout(function() {
      self.field.initRound();
    }, 1000);
  }, this);
  this.field.on('round_ready', function() {
    var _this = this;

    if (this.field.roundN !== 0) {
      TweenMax.delayedCall(1.0, function() {
        _this.field.startRound();
      });
    }
  }, this);
  this.field.on('game_complete', function(data) {
    // const { winner, playerLeftScore, playerRightScore } = data;
    var winner = data.winner;
    var playerLeftScore = data.playerLeftScore;
    var playerRightScore = data.playerRightScore;
    this.field.clear(); // this.field.initGame(self.createBoard(self.boardName));

    this.panelEndGame.show({
      winner: winner,
      playerLeftScore: playerLeftScore,
      playerRightScore: playerRightScore
    }); // setTimeout(function()
    // {
    //   self.field.clear();
    //   self.field.initGame(self.createBoard(self.boardName));
    //   setTimeout(function()
    //   {
    //     self.field.startGame();
    //   }, 1000);
    // }, 1000);
  }, this);

  if (window.localStorage.enable_settings) {
    this.buttonSettings = Util.createButton('btn', this, null, '', 640 / 2 - 32 / 2 - 5, -480 / 2 + 32 / 2 + 5, 32, 32, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
      atlas: 'texture_atlas',
      texture: 'button_settings.png',
      aX: 0.5,
      aY: 0.5
    });
    this.buttonSettings.on('button_click', function(data) {
      NORD.game.panelSettings.tween({
        name: 'show_anim'
      });
    }, this);
  }

  this.buttonPause = Util.createButton('btn', this, null, '', -710 / 2 + 32 / 2 + 10, -550 / 2 + 32 / 2 + 30, 32, 32, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    texture: 'PauseButton',
    parent: this,
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });


  this.buttonPause.on('button_click', function(data) {
    var _this2 = this;

    if (this.state !== 'show' || this.panelEndGame.state !== 'hide') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      if (NORD.game.currentPlayer == 'three')
        _this2.panelQuit.show()
      else if (NORD.game.currentPlayer == 'two')
        _this2.panelPause2.show()
      else
        _this2.panelPause.show();
    }); // this.toMainMenu();
  }, this); // this.logo = Util.createSprite({ atlas: 'texture_atlas', texture: 'logo.png', parent: this, aX: 0.5, aY: 0.5 });

  NORD.app.on('update', this.update, this);


  //sushant
  this.loadingIndicator = new PIXI.Sprite(NORD.assetsManager.getTexture('loadingIcon'));
  this.loadingIndicator.anchor.set(0.5);
  this.loadingIndicator.position.set(this.field.config.FIELD_WIDTH / 2.1, -this.field.config.FIELD_HEIGHT / 1.92);
  this.loadingIndicator.scale.x = 0.5;
  this.loadingIndicator.scale.y = 0.5;
  this.addChild(this.loadingIndicator);
  this.currentAngle = 0;
  rotateAction();
  this.loadingIndicator.alpha = 0;
  //sushant



  function rotateAction() {
    NORD.game.screenGame.currentAngle += 90;
    // NORD.game.screenGame.currentAngle = NORD.game.screenGame.currentAngle % 360;
    TweenMax.to(NORD.game.screenGame.loadingIndicator, 1, {
      angle: NORD.game.screenGame.currentAngle,
      onComplete: () => {
        rotateAction();
      }
    });
  }

  //sushant
  // if (MultiplayerStarted) {

  this.serverText = new PIXI.Text("- IN", {
    fontFamily: 'Squada One',
    fontSize: 12,
    fill: 'white',
    align: 'center',
    aX: 0,
    aY: 0.5,
  });
  this.serverText.position.set(this.field.config.FIELD_WIDTH / 2.45, this.field.config.FIELD_HEIGHT / 1.93);
  this.addChild(this.serverText);


  this.ActualServerpingText = new PIXI.Text(" 23ms", {
    fontFamily: 'Squada One',
    fontSize: 12,
    fill: 'white',
    align: 'center',
    aX: 0,
    aY: 0.5,
  });
  this.ActualServerpingText.position.set(-this.field.config.FIELD_WIDTH / 2.4, this.field.config.FIELD_HEIGHT / 1.93);
  this.addChild(this.ActualServerpingText);

  NORD.game.screenGame.ServerPing = 0;
  NORD.game.screenGame.OpponentServerPing = 0;
  NORD.events.on(NORD.EVENT_CODE.PING_RECIEVED, function(data) {
    NORD.game.screenMainMenu.subModeSelectionPopup.regionPanelServerName.text = " " + data + "ms";
    NORD.game.screenGame.ServerPing = data;
    NORD.game.screenGame.ActualServerpingText.text = " " + data + "ms";
  });

  // this.pingText = new PIXI.Text("My T.Diff - 0ms", {
  //   font: '35px Snippet',
  //   fontSize: 15,
  //   fill: 'black',
  //   align: 'center'
  // });
  // this.pingText.anchor.set(1);
  // this.pingText.position.set(this.field.config.FIELD_WIDTH / 2.2, -this.field.config.FIELD_HEIGHT / 2);
  // this.addChild(this.pingText);
  //
  // this.pingOppText = new PIXI.Text("Opp T.Diff - 0ms", {
  //   font: '35px Snippet',
  //   fontSize: 15,
  //   fill: 'black',
  //   align: 'center'
  // });
  // this.pingOppText.anchor.set(1);
  // this.pingOppText.position.set(this.field.config.FIELD_WIDTH / 4, -this.field.config.FIELD_HEIGHT / 2);
  // this.addChild(this.pingOppText);

  this.leftPlayerText = new PIXI.Text("", {
    fontFamily: 'Squada One',
    fontSize: 26,
    fill: '#5e7591',
    align: 'center'
  });
  this.leftPlayerText.anchor.set(0, 0.5);
  this.leftPlayerText.position.set(-this.field.config.FIELD_WIDTH / 2.5, -this.field.config.FIELD_HEIGHT / 2.45);
  this.addChild(this.leftPlayerText);


  this.rightPlayerText = new PIXI.Text("", {
    fontFamily: 'Squada One',
    fontSize: 26,
    fill: '#5e7591',
    align: 'center'
  });
  this.rightPlayerText.anchor.set(1, 0.5);
  this.rightPlayerText.position.set(this.field.config.FIELD_WIDTH / 2.5, -this.field.config.FIELD_HEIGHT / 2.45);
  this.addChild(this.rightPlayerText);
  // }
  // //sushant

  this.panelPause = new NORD.PanelPause({
    name: 'panel_pause',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.panelPause.visible = false;

  this.panelPause2 = new NORD.PanelPause2({
    name: 'panel2_pause',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.panelPause2.visible = false;

  this.panelQuit = new NORD.PanelQuit({
    name: 'panel_quit',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.panelQuit.visible = false;

  this.panelEndGame = new NORD.PanelEndGame({
    name: 'panel_end_game',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.panelEndGame.visible = false;
};

NORD.ScreenGame.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.ScreenGame.prototype.constructor = NORD.ScreenGame;

NORD.ScreenGame.prototype.update = function() {
  var paddle = this.field.paddleLeft;
  if (!paddle) return; // console.log(paddle.y);

  if (paddle.y < -125) this.buttonPause.alpha = 0.2;
  else this.buttonPause.alpha = 1.0;
}; // NORD.ScreenGame.prototype.updateScore = function()
// {
//   this.scoreLeft.setScore(this.field.playerLeft.roundScore);
//   this.scoreRight.setScore(this.field.playerRight.roundScore);
// }


NORD.ScreenGame.prototype.toGame = function(board) {
  var self = this;
  this.boardName = board;

  var pauseButton = PIXI.Texture.fromFrame('PauseButton');
  var closeButton = PIXI.Texture.fromFrame('CloseButton');
  this.buttonPause.regularSkin.texture = pauseButton;
  this.buttonPause.scale.set(0.90);

  if (NORD.game.currentPlayer == 'three') {
    this.buttonPause.regularSkin.texture = closeButton;
    this.buttonPause.scale.set(0.75);
  }

  this.field.initGame(this.createBoard(this.boardName));

  this.tween({
    name: 'show_anim'
  }, function() {
    TweenMax.delayedCall(0.2, function() {
      self.field.startGame();
    });
  });
  this.panelEndGame.tween({
    name: 'hide'
  });
};

NORD.ScreenGame.prototype.toMainMenu = function() {
  var self = this;
  NORD.audioManager.stopAudio('BGM');
  NORD.audioManager.playAudio('BGM');
  TweenMax.killAll(false, false, true);
  this.tween({
    name: 'hide_anim'
  }, function() {
    self.field.clear();
    if (MultiplayerStarted)
      DemoLoadFunction.leaveRoom();
    NORD.game.screenMainMenu.toMainMenu();
  });
};

NORD.ScreenGame.prototype.restart = function() {
  var self = this;
  this.field.initGame(self.createBoard(self.boardName));
  TweenMax.delayedCall(0.2, function() {
    self.field.startGame();
  });
};

NORD.ScreenGame.prototype.createBoard = function(boardName) {
  return function() {
    // console.log('CreateBoard:', boardName);
    var board = null;
    if (boardName === 'board_1') board = new NORD.Field.BoardPlanks({
      name: 'PLANKS'
    });
    if (boardName === 'board_2') board = new NORD.Field.BoardClassic({
      name: 'CLASSIC'
    });
    if (boardName === 'board_3') board = new NORD.Field.BoardDiamond({
      name: 'DIAMOND'
    });
    return board;
  };
};

NORD.ScreenGame.prototype.tween = function(data, callback) {
  var self = this;

  if (data.name == 'show_anim' && this.state == 'hide') {
    this.state = 'show_anim'; // this.visible = true;
    // this.alpha = 0;
    //
    // var time = 20 / 30;
    //
    // TweenMax.to(this, time, {alpha: 1, x: 0, y: 0, ease: Power2.easeOut, onComplete: function()
    // {
    //   self.tween({name: 'show'}, callback);
    // }});

    this.tween({
      name: 'show'
    }, callback);
  }

  if (data.name == 'hide_anim' && this.state == 'show') {
    this.state = 'hide_anim'; // this.interactiveChildren = false;
    //
    // var time = 20 / 30;
    //
    // TweenMax.to(this, time, {alpha: 0, x: 0, y: 0, ease: Power2.easeOut, onComplete: function()
    // {
    //   self.tween({name: 'hide'}, callback);
    // }});

    this.tween({
      name: 'hide'
    }, callback);
  }

  if (data.name == 'show' && this.state != 'show') {
    this.state = 'show';
    this.visible = true;
    this.interactiveChildren = true;

    //sushant//shun--fixMe
    if (MultiplayerStarted && PP.server_using == PP.SERVER_USING.Photon) {
      var actorNum = DemoLoadFunction._myActor.actorNr;
      for (var i = 1; i <= 2; i++) {
        if (DemoLoadFunction.actors[i] != undefined)
          if (DemoLoadFunction.actors[i].actorNr == actorNum) {
            NORD.playersName.playerName = DemoLoadFunction.actors[i].name;
          } else {
            NORD.playersName.opponentName = DemoLoadFunction.actors[i].name;
          }
      }
      if (NORD.playersName.playerName == NORD.playersName.opponentName) {
        if (IsHost) {
          NORD.playersName.playerName = NORD.playersName.playerName + "@1";
          NORD.playersName.opponentName = NORD.playersName.opponentName + "@2";
        } else {
          NORD.playersName.opponentName = NORD.playersName.opponentName + "@1";
          NORD.playersName.playerName = NORD.playersName.playerName + "@2";
        }
      }
    }
    this.rightPlayerText.text = "";
    this.leftPlayerText.text = "";
    // this.pingOppText.text = "";
    // this.pingText.text = "";
    this.ActualServerpingText.text = "";
    this.serverText.text = "";
    if (NORD.game.config.players == "one") {
      this.rightPlayerText.text = "YOU";
      this.leftPlayerText.text = "BOT";
    } else if (NORD.game.config.players == "two") {
      this.rightPlayerText.text = "PLAYER 2";
      this.leftPlayerText.text = "PLAYER 1";
    }


    if (MultiplayerStarted) {
      this.ActualServerpingText.text = " 60ms";
      this.serverText.text = " " + localStorage.getItem('savedServerRegion');
      NORD.game.field.sideImage.children[0].visible = true;
      NORD.game.field.sideImage.children[1].visible = true;
      if (NORD.playersName.playerName)
        this.rightPlayerText.text = NORD.playersName.playerName;
      if (NORD.playersName.opponentName)
        this.leftPlayerText.text = NORD.playersName.opponentName;
    }
    //sushant

    if (callback) callback();
  }

  if (data.name == 'hide' && this.state != 'hide') {
    this.state = 'hide';
    this.visible = false;
    this.interactiveChildren = false;
    this.interactive = false;
    if (callback) callback();
  }
};

NORD.ScreenGame.prototype.showIndicator = function(duration) {
  this.loadingIndicator.alpha = 1;
  if (this.loadingDelayCall) {
    this.loadingDelayCall.kill();
  }
  this.loadingDelayCall = TweenMax.delayedCall(duration, function() {
    NORD.game.screenGame.loadingIndicator.alpha = 0;
  });

};

NORD.ScreenGame.ScoreText = function() {
  PIXI.Container.call(this);
  this.scoreText = new PIXI.Text("0", {
    fontFamily: 'Squada One',
    fontSize: 60,
    fill: '#5e7591',
    align: 'center'
  });
  this.scoreText.anchor.set(0.5);
  this.addChild(this.scoreText);
};

NORD.ScreenGame.ScoreText.prototype = Object.create(PIXI.Container.prototype);
NORD.ScreenGame.ScoreText.prototype.constructor = NORD.ScreenGame.ScoreText;

NORD.ScreenGame.ScoreText.prototype.setScore = function(score) {
  this.scoreText.text = score;
  // this.score = score;
  // var texture = NORD.assetsManager.getTexture('texture_atlas', 'score_number_000' + String(this.score + 1) + '.png');
  // this.sprite.texture = texture;
};

NORD.ScreenGame.ScoreText.prototype.getScore = function() {
  return this.scoreText.text;

};

NORD.PanelEndGame = function(config) {
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 300;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false; // this.alpha = 0;

  var TransparentLayer = Util.createSprite({
    parent: this,
    texture: 'DarkLayer',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5,
  });

  this.bg = Util.createSprite({
    parent: this,
    texture: 'BluePanel',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });
  this.bg.position.set(0, 25);

  this.rays = Util.createSprite({
    parent: this.bg,
    texture: 'Rays',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.85,
  });
  this.rays.anchor.set(0.5);
  this.rays.position.set(0, (-this.bg.height / 2 - 50) - (this.rays.height * 0.425));

  rotateAction();

  function rotateAction() {
    requestAnimationFrame(rotateAction);
    if (self.rays != undefined)
      self.rays.rotation += 0.01;
  }

  this.HeaderPanel = Util.createSprite({
    parent: this.bg,
    texture: 'UpperBluePanel',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 1,
  });
  this.HeaderPanel.anchor.set(0.5);
  this.HeaderPanel.position.set(0, (-this.bg.height / 2 * 0.4) - this.HeaderPanel.height / 2);

  this.stars = Util.createSprite({
    parent: this.HeaderPanel,
    texture: 'Stars',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 1,
  });

  this.stars2 = Util.createSprite({
    parent: this.HeaderPanel,
    texture: 'Stars2',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 1,
  });

  decreaseStar1Alpha();
  increaseStar2Alpha();

  function decreaseStar1Alpha() {
    TweenMax.to(self.stars, 2, {
      alpha: 0.3,
      onComplete: function onComplete() {
        setTimeout(function() {
          increaseStar1Alpha();
        }, 1000);
      }
    });
  };

  function increaseStar1Alpha() {
    TweenMax.to(self.stars, 1, {
      alpha: 1,
      onComplete: function onComplete() {
        setTimeout(function() {
          decreaseStar1Alpha();
        }, 1000);
      }
    });
  };

  function decreaseStar2Alpha() {
    TweenMax.to(self.stars2, 1, {
      alpha: 0.3,
      onComplete: function onComplete() {
        setTimeout(function() {
          increaseStar2Alpha();
        }, 1000);
      }
    });
  };

  function increaseStar2Alpha() {
    TweenMax.to(self.stars2, 2, {
      alpha: 1,
      onComplete: function onComplete() {
        setTimeout(function() {
          decreaseStar2Alpha();
        }, 1000);
      }
    });
  };

  this.HeaderText = new PIXI.Text('YOU WON', {
    parent: this.bg,
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center'
  });
  this.HeaderText.anchor.set(0.5);
  this.HeaderText.position.set(0, 0);
  this.HeaderPanel.addChild(this.HeaderText);

  this.scoreHeader = new PIXI.Text('PLAYER 1 SCORE', {
    fontFamily: 'Squada One',
    fontSize: 20,
    fill: 'white',
    align: 'center'
  });
  this.scoreHeader.anchor.set(0.5);
  this.scoreHeader.position.set(0, -70);
  this.addChild(this.scoreHeader);

  this.Highlights = Util.createSprite({
    parent: this.bg,
    x: 0,
    y: -125,
    texture: 'Highlights',
    aX: 0.5,
    aY: 0.5,
    scaleX: 1.15,
    scaleY: 0.85
  });

  this.scoreLabel = new PIXI.Text('0', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center'
  });
  this.scoreLabel.anchor.set(0.5);
  this.scoreLabel.position.set(0, -125);
  this.bg.addChild(this.scoreLabel);

  this.scoreHeader2 = new PIXI.Text('PLAYER 2 SCORE', {
    fontFamily: 'Squada One',
    fontSize: 16,
    fill: 'white',
    align: 'center'
  });
  this.scoreHeader2.anchor.set(0.5);
  this.scoreHeader2.position.set(0, 25);
  this.addChild(this.scoreHeader2);

  this.scoreLabel2 = new PIXI.Text('0', {
    fontFamily: 'Squada One',
    fontSize: 48,
    fill: 'white',
    align: 'center'
  });
  this.scoreLabel2.anchor.set(0.5);
  this.scoreLabel2.position.set(0, 70);
  this.bg.addChild(this.scoreLabel2);


  this.textWin = Util.createSprite({
    parent: this,
    y: -48,
    atlas: 'texture_atlas',
    texture: 'text_computer_win.png',
    aX: 0.5,
    aY: 0.5
  });
  this.textWin.scale.x = this.textWin.scale.y = 0.66;
  this.textWin.visible = false

  this.buttonHome = Util.createButton('btn', this, null, '', 0, 75, 100, 100, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    texture: 'ContinueButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.35
  });

  this.buttonHome.on('button_click', function(data) {
    var _this3 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this3.tween({
        name: 'hide'
      }, function() {
        NORD.game.screenGame.buttonPause.regularSkin.alpha = 1.0;
        NORD.game.screenGame.toMainMenu();
      });
    });
  }, this);

  this.fb_ShareButton = Util.createButton('btn', this, null, '', -65, 135, 100, 100, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    texture: 'FB_ShareButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.40
  });
  this.fb_ShareButton.on('button_click', function(data) {
    var _this4 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this4.tween({
        name: 'hide'
      }, function() {
        window.open(NORD.SHARE_URL.FB, '_blank');
        NORD.game.screenGame.toMainMenu();
      });
    });
  }, this);

  this.twitter_ShareButton = Util.createButton('btn', this, null, '', 65, 135, 100, 100, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    texture: 'Twitter_ShareButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.40
  });
  this.twitter_ShareButton.on('button_click', function(data) {

    var _this4 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this4.tween({
        name: 'hide'
      }, function() {
        window.open(NORD.SHARE_URL.TWITTER, '_blank');
        NORD.game.screenGame.toMainMenu();
      });
    });
  }, this);

  // this.scoreLeft = new NORD.ScreenGame.ScoreText();
  // this.addChild(this.scoreLeft);
  // this.scoreLeft.x = -35;
  // this.scoreLeft.y = -4;
  //
  // this.scoreLine = Util.createSprite({ parent: this, y: -4, atlas: 'texture_atlas', texture: 'score_line.png', aX: 0.5, aY: 0.5 });
  // this.addChild(this.scoreLine);
  //
  // this.scoreRight = new NORD.ScreenGame.ScoreText();
  // this.addChild(this.scoreRight);
  // this.scoreRight.x = 35;
  // this.scoreRight.y = -4;
  //
  // this.scoreLeft.scale.x = this.scoreRight.scale.x = this.scoreLeft.scale.y = this.scoreRight.scale.y = 0.70;
  // this.scoreLine.scale.x = this.scoreLine.scale.y = 0.70;
  // this.scoreLeft.scale = this.scoreRight.scale = { x: 0.8, y: 0.8 };
  // this.scoreLeft.width = this.scoreRight.width = 44;
  // this.scoreLeft.height = this.scoreRight.height = 44;
};

NORD.PanelEndGame.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.PanelEndGame.prototype.constructor = NORD.PanelEndGame;

NORD.PanelEndGame.prototype.setText = function(winner) {
  var bluePanel = PIXI.Texture.fromFrame('BluePanel');
  var redPanel = PIXI.Texture.fromFrame('RedPanel');
  var stars = PIXI.Texture.fromFrame('Stars');
  var stars2 = PIXI.Texture.fromFrame('Stars2');
  var upperBluePanel = PIXI.Texture.fromFrame('UpperBluePanel');
  var upperRedPanel = PIXI.Texture.fromFrame('UpperRedPanel');
  var redDots = PIXI.Texture.fromFrame('RedDots');
  var redDots2 = PIXI.Texture.fromFrame('RedDots2');

  this.buttonHome.position.y = 90;
  this.fb_ShareButton.visible = true;
  this.twitter_ShareButton.visible = true;
  this.bg.texture = bluePanel;
  this.stars.texture = stars
  this.stars2.texture = stars2
  this.HeaderPanel.texture = upperBluePanel;
  this.rays.visible = true;

  this.scoreLabel.text = NORD.game.field.players.RIGHT.roundScore;
  this.scoreLabel2.text = NORD.game.field.players.LEFT.roundScore;

  this.scoreLabel.style.fill = this.scoreLabel2.style.fill = '#23ccfd'

  if (winner === 'AI') {
    this.HeaderText.text = "YOU LOST";

    this.scoreHeader.text = "COMPUTER SCORE"
    this.scoreHeader2.text = "YOUR SCORE";

    this.scoreLabel.style.fill = this.scoreLabel2.style.fill = '#fc0d1b'

    this.Highlights.visible = false;
    this.fb_ShareButton.visible = false;
    this.twitter_ShareButton.visible = false;
    this.rays.visible = false;

    this.buttonHome.position.y = 125;

    this.bg.texture = redPanel;
    this.stars.texture = redDots;
    this.stars2.texture = redDots2;
    this.HeaderPanel.texture = upperRedPanel;

    this.scoreLabel.text = NORD.game.field.players.LEFT.roundScore;
    this.scoreLabel2.text = NORD.game.field.players.RIGHT.roundScore;
  }
  if (winner === 'PLAYER') {
    this.HeaderText.text = "YOU WON";
    this.scoreHeader.text = "YOUR SCORE";
    this.scoreHeader2.text = "COMPUTER SCORE"
  }
  if (winner === 'PLAYER_LEFT') {
    this.HeaderText.text = "PLAYER 1 WON";
    this.scoreHeader.text = "PLAYER 1 SCORE";
    this.scoreHeader2.text = "PLAYER 2 SCORE";

    this.scoreLabel.text = NORD.game.field.players.LEFT.roundScore;
    this.scoreLabel2.text = NORD.game.field.players.RIGHT.roundScore;

    if (NORD.game.currentPlayer == 'three') {
      this.HeaderText.text = "YOU LOST";
      this.scoreHeader.text = NORD.playersName.opponentName;
      this.scoreHeader2.text = NORD.playersName.playerName;

      this.scoreLabel.style.fill = this.scoreLabel2.style.fill = '#fc0d1b'

      this.Highlights.visible = false;
      this.fb_ShareButton.visible = false;
      this.twitter_ShareButton.visible = false;
      this.rays.visible = false;

      this.buttonHome.position.y = 125;

      this.bg.texture = redPanel;
      this.stars.texture = redDots;
      this.stars2.texture = redDots2;
      this.HeaderPanel.texture = upperRedPanel;
    }

  }
  if (winner === 'PLAYER_RIGHT') {
    this.HeaderText.text = "PLAYER 2 WON";
    this.scoreHeader.text = "PLAYER 2 SCORE";
    this.scoreHeader2.text = "PLAYER 1 SCORE"

    this.scoreLabel.text = NORD.game.field.players.RIGHT.roundScore;
    this.scoreLabel2.text = NORD.game.field.players.LEFT.roundScore;


    if (NORD.game.currentPlayer == 'three') {
      this.HeaderText.text = "YOU WON";
      this.scoreHeader.text = NORD.playersName.playerName;
      this.scoreHeader2.text = NORD.playersName.opponentName;
    }
  }
};

NORD.PanelEndGame.prototype.show = function(data) {
  //const { winner, playerLeftScore, playerRightScore } = data;
  var winner = data.winner;
  var playerLeftScore = data.playerLeftScore;
  var playerRightScore = data.playerRightScore; // this.scoreLeft.setScore(playerLeftScore);
  // this.scoreRight.setScore(playerRightScore);

  // //sushant
  // if (MultiplayerStarted) {
  //   this.removeChild(this.textWin);
  //   this.textWin = new PIXI.Text(winner + " \nwins", {
  //     fontFamily: 'Squada One',
  //     fontSize: 26,
  //     fill: 'white',
  //     align: 'center'
  //   });
  //   this.textWin.anchor.set(0.5);
  //   this.textWin.position.set(0, -40);
  //   this.addChild(this.textWin);
  // } else
  this.setText(winner);


  this.tween({
    name: 'show_anim'
  }); // console.log(this.visible, this.alpha, this.state);
};

NORD.PanelEndGame.prototype.tween = function(data, callback) {
  var self = this;

  if (data.name == 'show_anim' && this.state == 'hide') {
    this.state = 'show_anim';
    this.visible = true;
    this.alpha = 0;
    this.y = -30;
    TweenMax.to(NORD.game.screenGame.buttonPause.regularSkin, 6 / 30, {
      alpha: 0,
      ease: Power2.easeOut
    });
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

NORD.PanelPause = function(config) {
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 300;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false; // this.alpha = 0;

  var TransparentLayer = Util.createSprite({
    parent: this,
    texture: 'TransparentLayer',
    aX: 0.5,
    aY: 0.5,
    scaleX: 100,
    scaleY: 100,
  });

  TransparentLayer.alpha = 0.85;

  this.bg = Util.createSprite({
    parent: this,
    texture: 'PauseBg',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.45
  });

  this.buttonClose = Util.createButton('btn', this, null, '', this.bg.width * 0.425, -this.bg.height * 0.425, 234, 84, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    parent: this.bg,
    texture: 'CloseButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });
  this.buttonClose.on('button_click', function(data) {
    var _this5 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this5.hide();
    });
  }, this);

  this.popupHeader = new PIXI.Text('PAUSED', {
    parent: this.bg,
    fontFamily: 'Squada One',
    fontSize: 34,
    fill: 'white',
    align: 'center'
  });
  this.popupHeader.anchor.set(0.5);
  this.popupHeader.position.set(0, -this.bg.height * this.bg.scale.y * 0.65);
  this.addChild(this.popupHeader);

  this.dividerLine = Util.createSprite({
    parent: this,
    x: 0,
    y: -75,
    texture: 'Separator',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.25
  });

  this.scoreHeader = new PIXI.Text('YOUR SCORE : ', {
    fontFamily: 'Squada One',
    fontSize: 24,
    fill: 'white',
    align: 'center'
  });
  this.scoreHeader.anchor.set(0.5);
  this.scoreHeader.position.set(0, -25);
  this.addChild(this.scoreHeader);

  this.Highlights = Util.createSprite({
    parent: this.bg,
    x: 0,
    y: 100,
    texture: 'Highlights',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 1
  });

  this.scoreLabel = new PIXI.Text('0', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center'
  });
  this.scoreLabel.anchor.set(0.5);
  this.scoreLabel.position.set(0, 0);
  this.Highlights.addChild(this.scoreLabel);

  this.buttonHome = Util.createButton('btn', this, null, '', -this.bg.width * this.bg.scale.x / 2, this.bg.height * 0.45, 100, 100, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    parent: this.bg,
    texture: 'HomeButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });
  this.buttonHome.on('button_click', function(data) {
    var _this6 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      // this.hide({}, () =>
      // {
      //   NORD.game.screenGame.toMainMenu();
      // });
      _this6.tween({
        name: 'hide'
      }, function() {

        //sushant
        if (MultiplayerStarted) {
          var seObj = new PP.ServerObject();
          seObj.eventType = NORD.PP_EVENT.EVENT_GAME_EXIT_BETWEEN;

          NORD.gameEventHandler.sendEvent(seObj);

          NORD.mainMenu.loadingPopup.hide();
        }
        //sushant

        NORD.app.apiCallback('statistics', 'exit');
        NORD.game.screenGame.buttonPause.regularSkin.alpha = 1.0;
        NORD.game.field.setPause(false);
        NORD.game.screenGame.toMainMenu();
      });
    });
  }, this);

  var audioButton = new NORD.GUI.ButtonAudio({
    parentPanel: this,
    x: 85,
    y: 160,
    width: 100,
    height: 100,
    scaleXY: 0.575,
    soundClick: NORD.assetsManager.getAsset('sound_click'),
    skin: {
      on: {
        texture: 'SoundOnButton'
      },
      off: {
        texture: 'SoundOffButton'
      }
    }
  });
};

NORD.PanelPause.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.PanelPause.prototype.constructor = NORD.PanelPause;

NORD.PanelPause.prototype.show = function(data) {
  NORD.game.config.players = NORD.game.currentPlayer;
  this.scoreLabel.text = NORD.game.field.players.RIGHT.roundScore;
  this.scoreHeader.text = "YOUR SCORE :";

  if (!MultiplayerStarted) {
    NORD.game.field.setPause(true);
    TweenMax.pauseAll();
  }
  this.tween({
    name: 'show_anim'
  });
};

NORD.PanelPause.prototype.hide = function(data, callback) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    if (!MultiplayerStarted) {
      NORD.game.field.setPause(false);
      TweenMax.resumeAll();
    }
    if (callback) callback();
  });
};

NORD.PanelPause.prototype.tween = function(data, callback) {
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

/***************************************************************************************Pause Popup Local Multi*************************************************************************************/

NORD.PanelPause2 = function(config) {
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 300;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false; // this.alpha = 0;

  var TransparentLayer = Util.createSprite({
    parent: this,
    texture: 'TransparentLayer',
    aX: 0.5,
    aY: 0.5,
    scaleX: 100,
    scaleY: 100,
  });

  TransparentLayer.alpha = 0.85;

  this.bg = Util.createSprite({
    parent: this,
    texture: 'PauseBg',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.4,
    scaleY: 0.5
  });

  this.buttonClose = Util.createButton('btn', this, null, '', this.bg.width * 0.425, -this.bg.height * 0.425, 234, 84, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    parent: this.bg,
    texture: 'CloseButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });
  this.buttonClose.on('button_click', function(data) {
    var _this5 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this5.hide();
    });
  }, this);

  this.popupHeader = new PIXI.Text('PAUSED', {
    parent: this.bg,
    fontFamily: 'Squada One',
    fontSize: 34,
    fill: 'white',
    align: 'center'
  });
  this.popupHeader.anchor.set(0.5);
  this.popupHeader.position.set(0, -this.bg.height * this.bg.scale.y * 0.65);
  this.addChild(this.popupHeader);

  this.dividerLine = Util.createSprite({
    parent: this,
    x: 0,
    y: -100,
    texture: 'Separator',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.25
  });

  this.scoreHeader = new PIXI.Text('PLAYER-1 SCORE : ', {
    fontFamily: 'Squada One',
    fontSize: 24,
    fill: 'white',
    align: 'center'
  });
  this.scoreHeader.anchor.set(0.5);
  this.scoreHeader.position.set(0, -55);
  this.addChild(this.scoreHeader);

  this.Highlights = Util.createSprite({
    parent: this.bg,
    x: 0,
    y: -15,
    texture: 'Highlights',
    aX: 0.5,
    aY: 0.5,
    scaleY: 0.85
  });

  this.scoreLabel = new PIXI.Text('0', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center'
  });
  this.scoreLabel.anchor.set(0.5);
  this.scoreLabel.position.set(0, 0);
  this.Highlights.addChild(this.scoreLabel);

  this.scoreHeader2 = new PIXI.Text('PLAYER-2 SCORE : ', {
    fontFamily: 'Squada One',
    fontSize: 24,
    fill: 'white',
    align: 'center'
  });
  this.scoreHeader2.anchor.set(0.5);
  this.scoreHeader2.position.set(0, 50);
  this.addChild(this.scoreHeader2);

  this.Highlights2 = Util.createSprite({
    parent: this.bg,
    x: 0,
    y: 195,
    texture: 'Highlights',
    aX: 0.5,
    aY: 0.5,
    scaleY: 0.8
  });

  this.scoreLabel2 = new PIXI.Text('0', {
    fontFamily: 'Squada One',
    fontSize: 64,
    fill: 'white',
    align: 'center'
  });
  this.scoreLabel2.anchor.set(0.5);
  this.scoreLabel2.position.set(0, 0);
  this.Highlights2.addChild(this.scoreLabel2);

  this.buttonHome = Util.createButton('btn', this, null, '', -this.bg.width * this.bg.scale.x / 2, this.bg.height * 0.45, 100, 100, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    parent: this.bg,
    texture: 'HomeButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });
  this.buttonHome.on('button_click', function(data) {
    var _this6 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      // this.hide({}, () =>
      // {
      //   NORD.game.screenGame.toMainMenu();
      // });
      _this6.tween({
        name: 'hide'
      }, function() {

        //sushant
        if (MultiplayerStarted) {
          var seObj = new PP.ServerObject();
          seObj.eventType = NORD.PP_EVENT.EVENT_GAME_EXIT_BETWEEN;

          NORD.gameEventHandler.sendEvent(seObj);

          NORD.mainMenu.loadingPopup.hide();
        }
        //sushant

        NORD.app.apiCallback('statistics', 'exit');
        NORD.game.screenGame.buttonPause.regularSkin.alpha = 1.0;
        NORD.game.field.setPause(false);
        NORD.game.screenGame.toMainMenu();
      });
    });
  }, this);

  var audioButton = new NORD.GUI.ButtonAudio({
    parentPanel: this,
    x: 85,
    y: 175,
    width: 100,
    height: 100,
    scaleXY: 0.575,
    soundClick: NORD.assetsManager.getAsset('sound_click'),
    skin: {
      on: {
        texture: 'SoundOnButton'
      },
      off: {
        texture: 'SoundOffButton'
      }
    }
  });
};

NORD.PanelPause2.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.PanelPause2.prototype.constructor = NORD.PanelPause;

NORD.PanelPause2.prototype.show = function(data) {
  NORD.game.config.players = NORD.game.currentPlayer;
  this.scoreLabel.text = NORD.game.field.players.RIGHT.roundScore;
  this.scoreLabel2.text = NORD.game.field.players.LEFT.roundScore;

  if (!MultiplayerStarted) {
    NORD.game.field.setPause(true);
    TweenMax.pauseAll();
  }
  this.tween({
    name: 'show_anim'
  });
};

NORD.PanelPause2.prototype.hide = function(data, callback) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    if (!MultiplayerStarted) {
      NORD.game.field.setPause(false);
      TweenMax.resumeAll();
    }
    if (callback) callback();
  });
};

NORD.PanelPause2.prototype.tween = function(data, callback) {
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
/***************************************************************************************Quit Popup*************************************************************************************/
NORD.PanelQuit = function(config) {
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 300;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false; // this.alpha = 0;

  var TransparentLayer = Util.createSprite({
    parent: this,
    texture: 'TransparentLayer',
    aX: 0.5,
    aY: 0.5,
    scaleX: 100,
    scaleY: 100,
  });

  TransparentLayer.alpha = 0.85;

  this.bg = Util.createSprite({
    parent: this,
    texture: 'PauseBg',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.45
  });

  this.popupHeader = new PIXI.Text('QUIT ?', {
    parent: this.bg,
    fontFamily: 'Squada One',
    fontSize: 34,
    fill: 'white',
    align: 'center'
  });
  this.popupHeader.anchor.set(0.5);
  this.popupHeader.position.set(0, -this.bg.height * this.bg.scale.y * 0.65);
  this.addChild(this.popupHeader);

  this.dividerLine = Util.createSprite({
    parent: this,
    x: 0,
    y: -75,
    texture: 'Separator',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.25
  });

  this.warningTExt = new PIXI.Text('YOU WILL FORFEIT \n THE MATCH', {
    fontFamily: 'Squada One',
    fontSize: 24,
    fill: 'white',
    align: 'center'
  });
  this.warningTExt.anchor.set(0.5);
  this.warningTExt.position.set(0, 25);
  this.addChild(this.warningTExt);

  this.buttonNo = Util.createButton('btn', this, null, '', -this.bg.width * this.bg.scale.x / 2, this.bg.height * 0.45, 234, 84, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    parent: this.bg,
    texture: 'CloseButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.57
  });
  this.buttonNo.on('button_click', function(data) {
    var _this5 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this5.hide();
    });
  }, this);

  this.buttonYes = Util.createButton('btn', this, null, '', this.bg.width * this.bg.scale.x / 2, this.bg.height * 0.45, 100, 100, NORD.game.tweenClickSimple, NORD.game.soundClickSimple(), {
    parent: this.bg,
    texture: 'YesButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });
  this.buttonYes.on('button_click', function(data) {
    var _this6 = this;

    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      // this.hide({}, () =>
      // {
      //   NORD.game.screenGame.toMainMenu();
      // });
      _this6.tween({
        name: 'hide'
      }, function() {

        //sushant
        if (MultiplayerStarted) {
          var seObj = new PP.ServerObject();
          seObj.eventType = NORD.PP_EVENT.EVENT_GAME_EXIT_BETWEEN;

          NORD.gameEventHandler.sendEvent(seObj);

          NORD.mainMenu.loadingPopup.hide();
        }
        //sushant

        NORD.app.apiCallback('statistics', 'exit');
        NORD.game.screenGame.buttonPause.regularSkin.alpha = 1.0;
        NORD.game.field.setPause(false);
        NORD.game.screenGame.toMainMenu();
      });
    });
  }, this);

};

NORD.PanelQuit.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.PanelQuit.prototype.constructor = NORD.PanelPause;

NORD.PanelQuit.prototype.show = function(data) {
  NORD.game.config.players = NORD.game.currentPlayer;

  if (!MultiplayerStarted) {
    NORD.game.field.setPause(true);
    TweenMax.pauseAll();
  }
  this.tween({
    name: 'show_anim'
  });
};

NORD.PanelQuit.prototype.hide = function(data, callback) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    if (!MultiplayerStarted) {
      NORD.game.field.setPause(false);
      TweenMax.resumeAll();
    }
    if (callback) callback();
  });
};

NORD.PanelQuit.prototype.tween = function(data, callback) {
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
