"use strict";

var MainMenuLocation;
var MultiplayerStarted = false;
var IsHost = false;
NORD.mainMenu = null;

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

NORD.ScreenMainMenu = function(config) {
  var _this = this;
  NORD.mainMenu = this;
  var isAllButtonEnabled;
  this.isAllButtonEnabled = true;

  config.sizeType = 'relative';
  config.widthRelative = 1;
  config.heightRelative = 1;
  NORD.GUI.BasePanel.call(this, config);

  var self = this;
  var startY = -50;
  var gConfig = NORD.game.config;

  MainMenuLocation = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false;
  /*********************************************************************************BG**************************************************************************************************/
  var bg = Util.createSprite({
    parent: this,
    texture: 'BG',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.465
  });
  this.containerSwitchers = new PIXI.Container();
  this.addChild(this.containerSwitchers); // this.containerSwitchers.y = - 200;

  /*********************************************************************************Game Logo**************************************************************************************************/
  var logo = Util.createSprite({
    parent: this,
    x: 0,
    y: -140,
    atlas: 'texture_atlas',
    texture: 'logo.png',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.4,
    scaleY: 0.4
  });
  this.containerSwitchers = new PIXI.Container();
  this.addChild(this.containerSwitchers); // this.containerSwitchers.y = - 200;

  /*********************************************************************************Game Type**************************************************************************************************/
  this.switcherPlayers = this.createSwitcher(0, startY + 0, 'label_players', 'players', 'left', function(side) {
    var dataMap = {
      left: 'one',
      center: 'two',
      right: 'three'
    };

    var config = NORD.game.config;
    config.players = dataMap[side];
    NORD.game.currentPlayer = dataMap[side];
    NORD.game.setConfig(config); // console.log('SSS:', config)
  });

  /*********************************************************************************Game Mode**************************************************************************************************/
  this.switcherMode = this.createSwitcher(0, startY + 150, 'label_mode', 'mode', 'left', function(side) {
    var dataMap = {
      left: 'classic',
      right: 'action'
    };
    var config = NORD.game.config;
    config.mode = dataMap[side];
    NORD.game.setConfig(config);

    if (config.players != 'three')
      return;

    if (side == 'left') {
      NORD.game.panelSettings.actionMode = NORD.MULTIPLAYER_GAME_MODE_TYPE.NONE
    } else(side == 'right')
    NORD.game.config.board = NORD.MULTIPLAYER_BOARD_TYPE.NORMAL_MODE
  });

  this.switcherMode.on('switch_start', function(side) {
    if (side === 'right' && _this.actionHint.visible) {
      _this.clearPulse(); // console.log('CLEAR:', this.switcherMode.containerRight.alpha);

    } else if (side === 'left' && _this.actionHintShows % 2 == 0 && !NORD.game.config.isActionPlayed) {
      // console.log('PLAY:', this.switcherMode.containerRight.alpha);
      _this.clearPulse();

      _this.tweenPulse();
    }
  });
  /***************************************************************************************Audio Button*************************************************************************************/
  this.audioButton = new NORD.GUI.ButtonAudio({
    parentPanel: this,
    x: -325,
    y: -185,
    width: 42,
    height: 42,
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

  /***************************************************************************************Play Button*************************************************************************************/
  this.playButton = Util.createButton('btn', this, null, '', 0, 200, 147, 68, NORD.game.tweenClickSimple, NORD.assetsManager.getAsset('play_button'), {
    texture: 'PlayButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5,
  });

  this.playButton.addListener('button_click', function(data) {
    var _this2 = this;
    // if (this.state !== 'show' || this.panelEndGame.state !== 'hide') return;

    this.disableAllButtons();

    TweenMax.delayedCall(0.07 * 2, function() {
      if (NORD.game.config.players == "three")
        _this2.randomNamePopup.show();
      else
        _this2.subModeSelectionPopup.show();
    });
  }, this);
  alignItems([logo, this.containerSwitchers, this.playButton], 460);

  /***************************************************************************************Popup Sub Mode Selection*************************************************************************************/
  this.subModeSelectionPopup = new NORD.subModeSelectionPopup({
    name: 'panel_subMode',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.subModeSelectionPopup.visible = false;

  /************************************************************************************************************************************************************************************/

  this.boardSelected = 'board_2';
  this.ballDiamondGeneratedPos = 0;

  function alignItems(items, height) {
    var totalHeight = 0;
    items.forEach(function(item) {
      totalHeight += item.height;
    });
    var freeSpace = height - totalHeight;
    var shift = freeSpace / (items.length + 1);
    var posY = -height / 2 + shift;
    items.forEach(function(item) {
      item.y = posY + item.height / 2; // item.posi y = posY + item.height/2;
      // console.log('Q:', item.height,  posY + item.height/2);

      posY += item.height + shift;
    });
    items[1].y -= 4; // console.log('Align:', totalHeight, freeSpace)
  }


  this.actionHint = Util.createSprite({
    parent: this,
    x: 195,
    y: 18,
    rotation: -6.7 * Util.TO_RADIANS,
    atlas: 'texture_atlas',
    texture: 'action_hint.png',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.41,
    scaleY: 0.41
  }); // this.actionBorder = Util.createSprite({ parent: this.switcherMode.containerRight, atlas: 'texture_atlas', texture: 'action_border.png', aX: 0.5, aY: 0.5, scaleXY: 0.79, alpha: 0.0 });
  // this.actionBorder.alpha = 0.0;
  // this.actionBorder.width = this.switcherPlayers.sideRight.spriteOn.width;
  // this.actionBorder.height = this.switcherPlayers.sideRight.spriteOn.height;
  // this.actionBorder.height -= 2;

  this.actionWhite = Util.createSprite({
    parent: this.switcherMode.containerRight,
    atlas: 'texture_atlas',
    texture: 'action_white.png',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.79,
    alpha: 0.0
  });
  this.actionWhite.alpha = 0.0; // this.actionHintShows = NORD.game.config.actionHintShows;

  this.actionHintShows = 0; // var audioButton = new NORD.GUI.ButtonAudio({ parentPanel: this, x: 200, y: 0, width: 100, height: 100 });


  this.randomNamePopup = new NORD.randomNamePopup({
    name: 'panel_randomName',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.randomNamePopup.visible = false;

  this.multiplayerSelectionPopup = new NORD.MultiplayerSelectionPopup({
    name: 'panel_randomName',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.multiplayerSelectionPopup.visible = false;

  this.loadingPopup = new NORD.LoadingPopup({
    name: 'loading popup',
    parentPanel: NORD.GUIManager.stage,
    container: this
  });
  this.loadingPopup.visible = false;
  rotateAction();

  function rotateAction() {
    NORD.mainMenu.loadingPopup.currentAngle += 90;
    // NORD.game.screenGame.currentAngle = NORD.game.screenGame.currentAngle % 360;
    TweenMax.to(NORD.mainMenu.loadingPopup.loadingIndicator, 1, {
      angle: NORD.mainMenu.loadingPopup.currentAngle,
      onComplete: () => {
        rotateAction();
      }
    });
  }

  if (PP.server_using == PP.SERVER_USING.Photon) {

  } else {
    NORD.sfsController.initiializeSFS();
  }
};

NORD.ScreenMainMenu.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.ScreenMainMenu.prototype.constructor = NORD.ScreenMainMenu;

NORD.ScreenMainMenu.prototype.disableAllButtons = function() {

  this.isAllButtonEnabled = false;

  NORD.game.screenGame.panelEndGame.shareButton.interactive = false;

  //disable switcherPlayers
  this.switcherPlayers.interactive = false;
  this.switcherPlayers.interactiveChildren = false;

  //disable switcherPlayers
  this.switcherMode.interactive = false;
  this.switcherMode.interactiveChildren = false;

  this.audioButton.interactive = false;
  this.playButton.interactive = false;

  this.switcherPlayers.switchingState = 'none1';
};
NORD.ScreenMainMenu.prototype.enableAllButtons = function() {
  this.isAllButtonEnabled = true;
  NORD.game.screenGame.panelEndGame.shareButton.interactive = true;

  //disable switcherPlayers
  this.switcherPlayers.interactive = true;
  this.switcherPlayers.interactiveChildren = true;

  //disable switcherPlayers
  this.switcherMode.interactive = true;
  this.switcherMode.interactiveChildren = true;

  this.audioButton.interactive = true;
  this.playButton.interactive = true;

  this.switcherPlayers.switchingState = 'none';
};
//sushant

NORD.ScreenMainMenu.prototype.drawPaddle = function() {
  var paddleView = new PaddleView2(0xFFFFFF, true);
  this.addChild(paddleView);
  paddleView.scale.x = paddleView.scale.y = 2;
  paddleView.on('change', function(data) {
    paddleView2.size = data.size;
    paddleView2.controlPoints = data.controlPoints;
    paddleView2.updatePaddle();
  });
  var paddleView2 = new PaddleView2(0xFFFFFF, false);
  this.addChild(paddleView2); // paddleView2.scale.x = paddleView.scale.y = 1.5;

  paddleView.x = 200;
  paddleView2.y = 200;
  paddleView2.x = 200;
};

NORD.ScreenMainMenu.prototype.toGame = function(board) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    NORD.game.screenGame.toGame(board);
    NORD.app.apiCallback('start');
  });
};

NORD.ScreenMainMenu.prototype.toMainMenu = function() {

  //NORD.game.screenMainMenu.buttonText.text = NORD.App.playerController.getTierType() + " | Wins: " + NORD.App.playerController.config.playerRankNumber;
  // this.actionHintShows ++;
  this.actionHint.visible = this.actionHintShows % 2 == 0 && !NORD.game.config.isActionPlayed;
  //sushant
  this.actionHint.visible = false;
  //sushant
  this.actionHint.alpha = 1.0; // this.actionBorder.alpha = 0.0;
  // console.log('FFFF":', this.actionHint.visible, NORD.game.config.isActionPlayed);

  this.tween({
    name: 'show_anim'
  }, function() {
    MainMenuLocation.enableAllButtons();

    // NORD.game.screenGame.toGame(board);
  });
};

NORD.ScreenMainMenu.prototype.clearPulse = function() {
  // TweenMax.killAll(false, true, true);
  if (this.tweenActionHint) {
    // this.tweenActionContainer.kill();
    // this.tweenActionContainerScale.kill();
    this.tweenActionHint.kill(); // this.tweenActionHintScale.kill();
    // this.tweenActionBorder.kill();
    // this.tweenActionWhite.kill();
    // this.tweenActionContainer = this.tweenActionContainerScale = this.tweenActionHint = this.tweenActionHintScale = this.tweenActionBorder = null;
    // this.tweenActionWhite = null;
  } // this.actionBorder.alpha = 0.0;


  this.actionWhite.alpha = 0.0;
  this.switcherMode.containerRight.scale.x = this.switcherMode.containerRight.scale.y = 1.0;
  this.switcherMode.containerRight.alpha = 1.0;
};

NORD.ScreenMainMenu.prototype.tweenPulse = function() {
  var self = this;
  var time = 25 / 30; // function tw(data)
  // {
  //   const { name, target, dir = 'up', normalScale = 1.0, normalRotation = 0, useRotation = false } = data;
  //
  //   const tScale = dir === 'up'?1.05 * normalScale:1.0 * normalScale;
  //   const tAlpha = dir === 'up'?1.00:0.8;
  //   const tRotation = useRotation?(dir === 'up'?normalRotation + 3*Util.TO_RADIANS:normalRotation):0;
  //
  //   self[name] = TweenMax.to(target, time, { rotation: tRotation, alpha: tAlpha, ease: Power1.easeInOut });
  //   self[name+'Scale'] = TweenMax.to(target.scale, time, { x: tScale, y: tScale, ease: Power1.easeInOut, onComplete: () =>
  //   {
  //     self[name] = null;
  //     self[name + 'Scale'] = null;
  //
  //     tw({...data, dir: dir === 'up'?'down':'up'})
  //   }});
  // }
  // tw({ name: 'tween_pulse', name: 'tweenActionContainer', target: this.switcherMode.containerRight });
  // tw({ name: 'tween_pulse', name: 'tweenActionHint', target: this.actionHint, normalScale: 0.41, normalRotation: -5.7*Util.TO_RADIANS, useRotation: true });

  /*
  this.actionBorder.alpha = 0.0;
  function tweenBorder(dir = 'up')
  {
    const tAlpha = dir === 'up'?1.0:0.24;
    self.tweenActionBorder = TweenMax.to(self.actionBorder, time, { alpha: tAlpha, ease: Power1.easeInOut, onComplete: () =>
    {
      self.tweenActionBorder = null;
      tweenBorder(dir === 'up'?'down':'up');
    }});
  }
  tweenBorder();
  */
  // this.actionWhite.alpha = 1;
  // function tweenWhite(dir = 'up') {
  //   const tAlpha = dir === 'up'?0.2:0.0;
  //   self.tweenActionWhite = TweenMax.to(self.actionWhite, time, { alpha: tAlpha, ease: Power2.easeInOut, onComplete: () =>
  //   {
  //     self.tweenActionWhite = null;
  //     tweenWhite(dir === 'up'?'down':'up');
  //   }});
  // }
  // tweenWhite();
  // this.actionBorder.alpha = 0.0;
  // function tweenHint(dir = 'up') {
  //   const tAlpha = dir === 'up' ? 1.0 : 0.34;
  //   self.tweenActionHint = TweenMax.to(self.actionHint, time, {
  //     alpha: tAlpha, ease: Power1.easeInOut, onComplete: () => {
  //       self.tweenActionHint = null;
  //       tweenHint(dir === 'up' ? 'down' : 'up');
  //     }
  //   });
  // }
  // tweenHint(this.actionHint.alpha > 0.9 ? 'down' : 'up');
  // this.actionBorder.alpha = 1.0;
};

NORD.ScreenMainMenu.prototype.tween = function(data, callback) {
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

  if (data.name == 'show_anim_from_preloader' && this.state == 'hide') {
    this.state = 'show_anim';
    this.visible = true;
    this.alpha = 0;
    this.actionHint.visible = this.actionHintShows % 2 == 0 && !NORD.game.config.isActionPlayed;

    //sushant
    this.actionHint.visible = false;
    //sushant

    if (NORD.game.config.players !== 'one') {
      // this.darkDificulty.visible = true; // this.switcherDificulty.alpha = 0.3;

      // this.switcherDificulty.interactive = false;
      // this.switcherDificulty.interactiveChildren = false;
    } else {
      // this.darkDificulty.visible = false; // this.switcherDificulty.alpha = 1;

      // this.switcherDificulty.interactive = true;
      // this.switcherDificulty.interactiveChildren = true;
    }

    if (this.actionHint.visible && NORD.game.config.mode === 'classic') {
      this.tweenPulse();
    }

    var time = 12 / 30;
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
    this.clearPulse();

    if (this.actionHint.visible && NORD.game.config.mode === 'classic') {
      this.tweenPulse();
    }

    if (callback) callback();
  }

  if (data.name == 'hide' && this.state != 'hide') {
    this.state = 'hide';
    this.visible = false;
    this.interactiveChildren = false;
    if (callback) callback();
  }
}; // ======================================================================================================================================== //
// ======================================================================================================================================== //
// ======================================================================================================================================== //


NORD.MenuSwitcher = function(config, switcherConfig, switcher) {
  var _this2 = this;

  NORD.GUI.BasePanel.call(this, config);
  this.selected = switcherConfig.selected;
  this.isCenter = !!switcherConfig.center;

  var setText = function setText(text) {
    var text = new PIXI.Text(text, {
      fontFamily: 'Russo One',
      fontSize: 28,
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    return text;
  };

  this.sideLeft = {
    x: -100,
    y: 0,
    name: 'left',
    spriteOn: Util.createSprite(switcherConfig.left.spriteOn),
    spriteOff: Util.createSprite(switcherConfig.left.spriteOff),
  };

  this.sideRight = {
    x: 100,
    y: 0,
    name: 'right',
    spriteOn: Util.createSprite(switcherConfig.right.spriteOn),
    spriteOff: Util.createSprite(switcherConfig.right.spriteOff)
  };

  if (this.isCenter) {
    this.sideLeft.x = -225;
    this.sideRight.x = 225;
    this.sideCenter = {
      x: 0,
      y: 0,
      name: 'center',
      spriteOn: Util.createSprite(switcherConfig.center.spriteOn),
      spriteOff: Util.createSprite(switcherConfig.center.spriteOff)
    };
    if (switcherConfig.center.spriteOnText != undefined) this.sideCenter.spriteOn.addChild(setText(switcherConfig.center.spriteOnText));
    if (switcherConfig.center.spriteOffText != undefined) this.sideCenter.spriteOff.addChild(setText(switcherConfig.center.spriteOffText));
  } else this.sideCenter = null;


  if (switcher == "Thriller" || switcher == "Region") {
    this.bottomLeft = {
      x: -225,
      y: 50,
      name: 'bottomLeft',
      spriteOn: Util.createSprite(switcherConfig.bottomLeft.spriteOn),
      spriteOff: Util.createSprite(switcherConfig.bottomLeft.spriteOff)
    };

    this.bottomRight = {
      x: 225,
      y: 50,
      name: 'bottomRight',
      spriteOn: Util.createSprite(switcherConfig.bottomRight.spriteOn),
      spriteOff: Util.createSprite(switcherConfig.bottomRight.spriteOff)
    };

    this.bottomCenter = {
      x: 0,
      y: 50,
      name: 'bottomCenter',
      spriteOn: Util.createSprite(switcherConfig.bottomCenter.spriteOn),
      spriteOff: Util.createSprite(switcherConfig.bottomCenter.spriteOff)
    };

    if (switcher != "Region") {
      this.playAll = {
        x: 0,
        y: 120,
        name: 'playAll',
        spriteOn: Util.createSprite(switcherConfig.playAll.spriteOn),
        spriteOff: Util.createSprite(switcherConfig.playAll.spriteOff)
      };
    }
  }

  this.sides = {
    left: this.sideLeft,
    right: this.sideRight,
    center: this.sideCenter,
    bottomLeft: this.bottomLeft,
    bottomRight: this.bottomRight,
    bottomCenter: this.bottomCenter,
    playAll: this.playAll
  };

  if (switcherConfig.left.spriteOnText != undefined) this.sideLeft.spriteOn.addChild(setText(switcherConfig.left.spriteOnText));
  if (switcherConfig.left.spriteOffText != undefined) this.sideLeft.spriteOff.addChild(setText(switcherConfig.left.spriteOffText));

  if (switcherConfig.right.spriteOnText != undefined) this.sideRight.spriteOn.addChild(setText(switcherConfig.right.spriteOnText));
  if (switcherConfig.right.spriteOffText != undefined) this.sideRight.spriteOff.addChild(setText(switcherConfig.right.spriteOffText));



  if (switcher == "Thriller" || switcher == "Region") {
    this.addChild(this.bottomLeft.spriteOff);
    this.bottomLeft.spriteOff.x = this.bottomLeft.x;
    this.bottomLeft.spriteOff.y = this.bottomLeft.y;
    this.addChild(this.bottomLeft.spriteOn);
    this.bottomLeft.spriteOn.x = this.bottomLeft.x;
    this.bottomLeft.spriteOn.y = this.bottomLeft.y;

    this.addChild(this.bottomRight.spriteOff);
    this.bottomRight.spriteOff.x = this.bottomRight.x;
    this.bottomRight.spriteOff.y = this.bottomRight.y;
    this.addChild(this.bottomRight.spriteOn);
    this.bottomRight.spriteOn.x = this.bottomRight.x;
    this.bottomRight.spriteOn.y = this.bottomRight.y;

    this.addChild(this.bottomCenter.spriteOff);
    this.bottomCenter.spriteOff.x = this.bottomCenter.x;
    this.bottomCenter.spriteOff.y = this.bottomCenter.y;
    this.addChild(this.bottomCenter.spriteOn);
    this.bottomCenter.spriteOn.x = this.bottomCenter.x;
    this.bottomCenter.spriteOn.y = this.bottomCenter.y;

    if (switcher != "Region") {
      this.addChild(this.playAll.spriteOff);
      this.playAll.spriteOff.x = this.playAll.x;
      this.playAll.spriteOff.y = this.playAll.y;
      this.addChild(this.playAll.spriteOn);
      this.playAll.spriteOn.x = this.playAll.x;
      this.playAll.spriteOn.y = this.playAll.y;

      this.playAll.spriteOn.scale.x = this.playAll.spriteOff.scale.x = 0.45;
      this.playAll.spriteOn.scale.y = this.playAll.spriteOff.scale.y = 0.45;

      this.playAll.spriteOn.visible = false;
      this.playAll.spriteOff.visible = false;

      if (switcherConfig.playAll.spriteOnText != undefined) this.playAll.spriteOn.addChild(setText(switcherConfig.playAll.spriteOnText));
      if (switcherConfig.playAll.spriteOffText != undefined) this.playAll.spriteOff.addChild(setText(switcherConfig.playAll.spriteOffText));
    }

    this.bottomLeft.spriteOn.scale.x = this.bottomLeft.spriteOff.scale.x = this.bottomRight.spriteOn.scale.x = this.bottomRight.spriteOff.scale.x = this.bottomCenter.spriteOn.scale.x = this.bottomCenter.spriteOff.scale.x = 0.45;
    this.bottomLeft.spriteOn.scale.y = this.bottomLeft.spriteOff.scale.y = this.bottomRight.spriteOn.scale.y = this.bottomRight.spriteOff.scale.y = this.bottomCenter.spriteOn.scale.y = this.bottomCenter.spriteOff.scale.y = 0.45;

    this.bottomLeft.spriteOn.visible = this.bottomRight.spriteOn.visible = this.bottomCenter.spriteOn.visible = false;
    this.bottomLeft.spriteOff.visible = this.bottomRight.spriteOff.visible = this.bottomCenter.spriteOff.visible = false;

    if (switcherConfig.bottomLeft.spriteOnText != undefined) this.bottomLeft.spriteOn.addChild(setText(switcherConfig.bottomLeft.spriteOnText));
    if (switcherConfig.bottomLeft.spriteOffText != undefined) this.bottomLeft.spriteOff.addChild(setText(switcherConfig.bottomLeft.spriteOffText));

    if (switcherConfig.bottomRight.spriteOnText != undefined) this.bottomRight.spriteOn.addChild(setText(switcherConfig.bottomRight.spriteOnText));
    if (switcherConfig.bottomRight.spriteOffText != undefined) this.bottomRight.spriteOff.addChild(setText(switcherConfig.bottomRight.spriteOffText));

    if (switcherConfig.bottomCenter.spriteOnText != undefined) this.bottomCenter.spriteOn.addChild(setText(switcherConfig.bottomCenter.spriteOnText));
    if (switcherConfig.bottomCenter.spriteOffText != undefined) this.bottomCenter.spriteOff.addChild(setText(switcherConfig.bottomCenter.spriteOffText));


  }

  this.addChild(this.sideLeft.spriteOff);
  this.sideLeft.spriteOff.x = this.sideLeft.x;
  this.sideLeft.spriteOff.y = this.sideLeft.y;
  this.addChild(this.sideLeft.spriteOn);
  this.sideLeft.spriteOn.x = this.sideLeft.x;
  this.sideLeft.spriteOn.y = this.sideLeft.y;

  this.containerRight = new PIXI.Container();
  this.addChild(this.containerRight);
  this.containerRight.x = this.sideRight.x;
  this.containerRight.y = this.sideRight.y;
  this.containerRight.addChild(this.sideRight.spriteOff);
  this.containerRight.addChild(this.sideRight.spriteOn); // this.addChild(this.sideRight.spriteOff);
  // this.sideRight.spriteOff.x = this.sideRight.x;
  // this.sideRight.spriteOff.y = this.sideRight.y;
  // this.addChild(this.sideRight.spriteOn);
  // this.sideRight.spriteOn.x = this.sideRight.x;
  // this.sideRight.spriteOn.y = this.sideRight.y;

  this.sideLeft.spriteOn.visible = false;
  this.sideLeft.spriteOff.visible = false;
  this.sideRight.spriteOn.visible = false;
  this.sideRight.spriteOff.visible = false;

  if (this.isCenter) {
    this.addChild(this.sideCenter.spriteOff);
    this.sideCenter.spriteOff.x = this.sideCenter.x;
    this.sideCenter.spriteOff.y = this.sideCenter.y;
    this.addChild(this.sideCenter.spriteOn);
    this.sideCenter.spriteOn.x = this.sideCenter.x;
    this.sideCenter.spriteOn.y = this.sideCenter.y;
    this.sideCenter.spriteOn.visible = false;
    this.sideCenter.spriteOff.visible = false; // this.sideCenter.spriteOn.height = this.sideCenter.spriteOff.height = 50 * 0.79;
    // this.sideLeft.spriteOn.width = this.sideLeft.spriteOff.width = this.sideRight.spriteOn.width = this.sideRight.spriteOff.width = this.sideCenter.spriteOn.width = this.sideCenter.spriteOff.width = 110 * 0.79;
    // this.sideLeft.spriteOn.height = this.sideLeft.spriteOff.height = this.sideRight.spriteOn.height = this.sideRight.spriteOff.height = this.sideCenter.spriteOn.height = this.sideCenter.spriteOff.height = 50 * 0.79;

    this.sideLeft.spriteOn.scale.x = this.sideLeft.spriteOff.scale.x = this.sideRight.spriteOn.scale.x = this.sideRight.spriteOff.scale.x = this.sideCenter.spriteOn.scale.x = this.sideCenter.spriteOff.scale.x = 0.45;
    this.sideLeft.spriteOn.scale.y = this.sideLeft.spriteOff.scale.y = this.sideRight.spriteOn.scale.y = this.sideRight.spriteOff.scale.y = this.sideCenter.spriteOn.scale.y = this.sideCenter.spriteOff.scale.y = 0.45;
  } else {
    // this.sideLeft.spriteOn.width = this.sideLeft.spriteOff.width = this.sideRight.spriteOn.width = this.sideRight.spriteOff.width = 168 * 0.79;
    // this.sideLeft.spriteOn.height = this.sideLeft.spriteOff.height = this.sideRight.spriteOn.height = this.sideRight.spriteOff.height = 50 * 0.79;
    this.sideLeft.spriteOn.scale.x = this.sideLeft.spriteOff.scale.x = this.sideRight.spriteOn.scale.x = this.sideRight.spriteOff.scale.x = 0.45;
    this.sideLeft.spriteOn.scale.y = this.sideLeft.spriteOff.scale.y = this.sideRight.spriteOn.scale.y = this.sideRight.spriteOff.scale.y = 0.45;
  }

  this.switchingState = 'none';
  this.soundClick = NORD.game.soundClickSimple();

  var setSideInteractive = function setSideInteractive(side) {
    // const { spriteOn, spriteOff } = side;
    var spriteOn = side.spriteOn;
    var spriteOff = side.spriteOff;
    side.clickState = 'off';
    spriteOn.interactive = true;
    spriteOn.buttonMode = true;
    spriteOff.interactive = true;
    spriteOff.buttonMode = true;
    spriteOn.on('pointerdown', function() {
      if (side.clickState != 'off') return;

      _this2.setSelected(side.name); // side.clickState = 'on';
      // NORD.GUI.Button.tweenClickSimple({ target: spriteOn, time: 0.07, scaleNormal: 0.79, scale:  0.79 * 0.95, completeCallback: () => { side.clickState = 'off'; } });
      // this.soundClick.play();

    }, _this2);
    spriteOff.on('pointerdown', function() {
      if (side.clickState != 'off') return;

      _this2.setSelected(side.name); // side.clickState = 'on';
      // NORD.GUI.Button.tweenClickSimple({ target: spriteOff, time: 0.07, scaleNormal: 0.79, scale:  0.79 * 0.95, completeCallback: () => { side.clickState = 'off'; } });
      // this.soundClick.play();

    }, _this2);
  }; // function tweenT = (target) => {
  //   NORD.app.tweenClickSimple({ target });
  // }



  setSideInteractive(this.sideLeft);
  setSideInteractive(this.sideRight);

  if (this.isCenter) setSideInteractive(this.sideCenter);
  if (this.bottomLeft) setSideInteractive(this.bottomLeft);
  if (this.bottomRight) setSideInteractive(this.bottomRight);
  if (this.bottomCenter) setSideInteractive(this.bottomCenter);
  if (this.playAll) setSideInteractive(this.playAll);
  // this.spriteBg = Util.createSprite({ atlas: 'texture_atlas', texture: 'Controls/Slider/bg.png', parent: this, aX: 0.5, aY: 0.5 });
  // this.spriteBg.rotation = this.orientation === 'vertical'?0:Math.PI/2;
  //
  // this.spriteSlider = Util.createSprite({ atlas: 'texture_atlas', texture: 'Controls/Slider/thumb.png', parent: this, aX: 0.5, aY: 0.5 });
  // this.spriteSlider.interactive = true;
  //
  // this.spriteSlider.on('click', this.onClickListener, this);
  // this.spriteSlider.on('tap', this.onClickListener, this);
  // this.spriteSlider.on('pointerdown', this.onMouseDownListener, this);
  // this.spriteSlider.on('pointerup', this.onMouseUpListener, this);
  // this.spriteSlider.on('pointerupoutside', this.onMouseUpListener, this);
  // // this.spriteSlider.on('touchdown', this.onMouseDownListener, this);
  // this.spriteSlider.on('mouseover', this.onMouseOverListener, this);
  // this.spriteSlider.on('mouseout', this.onMouseOutListener, this);
  //
  // this.state = new Util.StateStore();
  // this.state.on('state_change', this.onStateChange, this);
  // this.state.setState({ phase: 'wait' });
  // this.state.setState({ value: 0.0 });
  // this.state.setState({ progress: 0.0 });

  this.setSide(switcherConfig.selected); // NORD.app.on('update', this.update, this);
};

NORD.MenuSwitcher.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.MenuSwitcher.prototype.constructor = NORD.MenuSwitcher;


NORD.MenuSwitcher.prototype.setSelected = function(side) {
  var _this3 = this;

  if ( /*this.selected == side ||*/ this.switchingState !== 'none') return;
  this.tween({
    name: 'switch',
    side: side
  }, function() {
    _this3.setSide(side);
  });
  this.emit('switch_start', side);
};

NORD.MenuSwitcher.prototype.setSide = function(side) {
  var _this4 = this;

  this.selected = side; // const onSide = this.sides[side];
  // const offSide = this.sides[(side == 'left'?'right':'left')];
  //
  // onSide.spriteOff.visible = false;
  // onSide.spriteOn.visible = true;
  // onSide.spriteOn.aplha = 1.0;
  //
  // offSide.spriteOn.visible = false;
  // offSide.spriteOff.visible = true;
  // offSide.spriteOff.aplha = 1.0;

  var offSides = [];
  Object.keys(this.sides).forEach(function(s) {
    var object = _this4.sides[s];
    if (!object) return;

    if (s == side) {
      object.spriteOff.visible = false;
      object.spriteOn.visible = true;
      object.spriteOn.aplha = 1.0;
    } else {
      object.spriteOn.visible = false;
      object.spriteOff.visible = true;
      object.spriteOff.aplha = 1.0;
    }
  });
  this.emit('side_change', side);
};

NORD.MenuSwitcher.prototype.tween = function(data, callback) {
  var _this5 = this;

  if (data.name == 'switch') {
    var side = data.side;
    this.switchingState = 'switching_' + side; // const onSide = this.sides[side];
    // const offSide = this.sides[(side == 'left'?'right':'left')];
    // onSide.spriteOn.visible = true;
    // offSide.spriteOff.visible = true;

    var offSides = [];
    Object.keys(this.sides).forEach(function(s) {
      var object = _this5.sides[s];
      if (!object) return;

      if (s == side) {
        object.spriteOn.visible = true;
        TweenMax.to(object.spriteOn, 12 / 30, {
          alpha: 1.0,
          ease: Power2.easeOut,
          onComplete: function onComplete() {
            _this5.switchingState = 'none';
            if (callback) callback();
          }
        });
        ttt(object.spriteOn);
        ttt(object.spriteOff);

        _this5.soundClick.play();
      } else {
        object.spriteOff.visible = true;
        TweenMax.to(object.spriteOn, 12 / 30, {
          alpha: 0.0,
          ease: Power2.easeOut,
          onComplete: function onComplete() {}
        });
      }
    });

    function ttt(target) {
      target.scale.x = target.scale.y = 0.35;
      TweenMax.to(target.scale, 0.07, {
        x: 0.45 * 0.95,
        y: 0.45 * 0.95,
        ease: Power2.easeOut,
        onComplete: function onComplete() {
          TweenMax.to(target.scale, 0.07, {
            x: 0.45,
            y: 0.45,
            ease: Power2.easeOut,
            onComplete: function onComplete() {}
          });
        }
      });
    }
  }
}; // ======================================================================================================================================== //
// ======================================================================================================================================== //
// ======================================================================================================================================== //


NORD.BoardsCarousel = function(config, carouselConfig) {
  var _this6 = this;

  NORD.GUI.BasePanel.call(this, config);
  this.positionsMap = {
    '-2': {
      x: -102,
      y: 0,
      scale: 0.6,
      alpha: 0.0
    },
    '-1': {
      x: -74,
      y: 0,
      scale: 0.85,
      alpha: 1.0
    },
    '0': {
      x: 0,
      y: 0,
      scale: 0.86,
      alpha: 1.0
    },
    '1': {
      x: 74,
      y: 0,
      scale: 0.85,
      alpha: 1.0
    },
    '2': {
      x: 102,
      y: 0,
      scale: 0.6,
      alpha: 0.0
    },
    'hide': {
      x: 0,
      y: 0,
      scale: 1.0,
      alpha: 0.0,
      visible: false
    }
  };
  this.centerIndex = 1;
  this.board = null;
  this.boards = [];
  carouselConfig.boards.forEach(function(boardData) {
    var boardName = boardData.name;
    var container = new PIXI.Container();

    _this6.addChild(container);

    var spriteOff = Util.createSprite({
      parent: container,
      atlas: 'texture_atlas',
      texture: boardName + '_off.png',
      aX: 0.5,
      aY: 0.5
    });
    var spriteOn = Util.createSprite({
      parent: container,
      atlas: 'texture_atlas',
      texture: boardName + '_on.png',
      aX: 0.5,
      aY: 0.5
    });
    spriteOn.alpha = 0; // container.visible = false;

    var board = {
      container: container,
      name: boardName,
      spriteOff: spriteOff,
      spriteOn: spriteOn
    };
    container.interactive = true;
    container.buttonMode = true;
    container.on('pointerdown', function() {
      _this6.switchBoard(board.name);
    }, _this6);

    board.setToPosition = function(position) {
      board.container.alpha = position.alpha;
      board.container.x = position.x;
      board.container.y = position.y;
      board.container.scale.x = board.container.scale.y = position.scale;
      if (position.visible !== undefined) board.container.visible = position.visible;
      else board.container.visible = true;
    };

    board.tweenToPosition = function(position, callback) {
      TweenMax.to(board.container.scale, 10 / 30, {
        x: position.scale,
        y: position.scale,
        ease: Power2.easeOut
      });
      TweenMax.to(board.container, 10 / 30, {
        x: position.x,
        y: position.y,
        alpha: position.alpha,
        ease: Power2.easeOut,
        onComplete: callback
      });
    };

    _this6.boards.push(board);
  });
  this.boards.forEach(function(board, i) {
    var prevN = i - 1;
    if (_this6.boards.length > 3 && prevN < 0) prevN = _this6.boards.length - 1;
    var nextN = i + 1;
    if (_this6.boards.length > 3 && nextN > _this6.boards.length - 1) nextN = 0;
    board.prev = _this6.boards[prevN] || null;
    board.next = _this6.boards[nextN] || null;
  });
  this.state = 'normal'; // console.log('Boards:', this.boards);

  this.setBoard(carouselConfig.selected);
};

NORD.BoardsCarousel.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.BoardsCarousel.prototype.constructor = NORD.BoardsCarousel;

NORD.BoardsCarousel.prototype.switchBoard = function(name) {
  var _this7 = this;

  if (this.board.name == name || this.state !== 'normal') return;
  var board = this.boards.find(function(b) {
    return b.name === name;
  }); // const shiftIndex = this.centerIndex - this.boards.indexOf(board);

  var turnSide = board.next == this.board ? 'right' : 'left';
  var positionPrev = this.positionsMap['-1'];
  var positionPrev2 = this.positionsMap['-2'];
  var positionNext = this.positionsMap['1'];
  var positionNext2 = this.positionsMap['2'];
  var position = this.positionsMap['0'];

  if (turnSide == 'right') {
    this.state = 'turning_' + turnSide;
    this.board.tweenToPosition(positionNext);
    TweenMax.to(this.board.spriteOn, 10 / 30, {
      alpha: 0,
      ease: Power2.easeOut
    });
    if (this.board.next) this.board.next.tweenToPosition(positionNext2);

    if (this.board.prev) {
      this.board.prev.tweenToPosition(position, function() {
        _this7.state = 'normal';

        _this7.setBoard(_this7.board.prev.name);
      });
      TweenMax.to(this.board.prev.spriteOn, 10 / 30, {
        alpha: 1,
        ease: Power2.easeOut
      });

      if (this.board.prev.prev) {
        this.board.prev.prev.setToPosition(positionPrev2);
        this.board.prev.prev.tweenToPosition(positionPrev);
      }
    }
  } else if (turnSide == 'left') {
    this.state = 'turning_' + turnSide;
    this.board.tweenToPosition(positionPrev);
    TweenMax.to(this.board.spriteOn, 10 / 30, {
      alpha: 0,
      ease: Power2.easeOut
    });
    if (this.board.prev) this.board.prev.tweenToPosition(positionPrev2);

    if (this.board.next) {
      this.board.next.tweenToPosition(position, function() {
        _this7.state = 'normal';

        _this7.setBoard(_this7.board.next.name);
      });
      TweenMax.to(this.board.next.spriteOn, 10 / 30, {
        alpha: 1,
        ease: Power2.easeOut
      });

      if (this.board.next.next) {
        this.board.next.next.setToPosition(positionNext2);
        this.board.next.next.tweenToPosition(positionNext);
      }
    }
  } // console.log('Switch board:', turnSide);

};

NORD.BoardsCarousel.prototype.setBoard = function(name) {
  var _this8 = this;

  var board = this.boards.find(function(b) {
    return b.name === name;
  });
  if (!board) return;
  var boardPrev = board.prev;
  var boardNext = board.next;
  var positionPrev = this.positionsMap['-1'];
  var positionNext = this.positionsMap['1'];
  var position = this.positionsMap['0'];
  if (boardPrev) boardPrev.setToPosition(positionPrev);
  if (boardNext) boardNext.setToPosition(positionNext);
  board.setToPosition(position);
  board.spriteOn.alpha = 1.0;
  this.boards.forEach(function(b) {
    if (b == board) return;
    b.spriteOn.alpha = 0;
    if (b == boardPrev || b == boardNext) return;
    b.setToPosition(_this8.positionsMap['hide']);
  });
  this.board = board; // console.log('Set board:', board);

  this.emit('board_change', board.name);
};

NORD.BoardsCarousel.prototype.tween = function(data, callback) {
  if (data.name == 'switch') {}
};

var drawBezier = function drawBezier(graphics, curve) {
  // console.log('Draw bezier:', curve);
  var LUT = curve.getLUT(16);
  graphics.lineStyle(1.0, 0xFFFFFF);
  graphics.moveTo(LUT[0].x, LUT[0].y);
  LUT.forEach(function(point, i) {
    if (i == 0) return;
    graphics.lineTo(point.x, point.y); // console.log('P:', point);
    // drawPoint(point.x, point.y);
  });
  graphics.lineTo(LUT[0].x, LUT[0].y);

  function drawPoint(x, y) {
    graphics.drawCircle(x, y, 5);
  }
};

var DragablePoint = function DragablePoint(color, radius, checkPosition) {
  PIXI.Graphics.call(this);
  this.checkPosition = checkPosition;
  this.color = color;
  this.radius = radius;
  this.lineStyle(0.0, this.color);
  this.beginFill(this.color, 1);
  this.drawCircle(0, 0, this.radius);
  this.interactive = true;
  this.on('pointerdown', this.onDragStart, this);
  this.on('pointerup', this.onDragEnd, this);
  this.on('pointerupoutside', this.onDragEnd, this);
  this.isDrag = false;
  NORD.app.on('update', this.update, this);
};

DragablePoint.prototype = Object.create(PIXI.Graphics.prototype);
DragablePoint.prototype.constructor = DragablePoint;

DragablePoint.prototype.onDragStart = function(e) {
  if (this.isDrag) return;
  this.isDrag = true;
};

DragablePoint.prototype.onDragEnd = function(e) {
  if (!this.isDrag) return;
  this.isDrag = false;
};

DragablePoint.prototype.update = function() {
  if (!this.isDrag) return;
  var p = this.parent.toLocal(NORD.app.mouseGlobal);
  p = this.checkPosition(p);
  this.x = p.x;
  this.y = p.y;
  this.emit('change', {
    x: this.x,
    y: this.y
  });
};

var PaddleView2 = function PaddleView2() {
  var _this9 = this;

  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0xFFFFFF;
  var isEditable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  PIXI.Container.call(this);
  this.isEditable = isEditable;

  var createDragablePoint = function createDragablePoint(name, color, radius, ddd) {
    var dragablePoint = new DragablePoint(color, radius, ddd ? ddd : function(p) {
      if (p.x > 0) p.x = 0; // if(p.y > 0) p.y = 0;

      return p;
    });

    _this9.addChild(dragablePoint); // this.dragablePoint1.x = this.pointStart.x + this.controlPoint.x;
    // this.dragablePoint1.y = this.pointStart.y + this.controlPoint.y;


    var controlPoint = _this9.controlPoints[name]; // dragablePoint.x = controlPoint.x;
    // dragablePoint.y = controlPoint.y;
    // this.controlPoints[name] = { x, y };

    dragablePoint.on('change', function(data) {
      data.x -= _this9.pointStart.x;
      data.y -= _this9.pointStart.y;
      _this9.controlPoints[name] = data;

      _this9.updatePaddle(); // const p = { x: data.x - this.pointStart.x, y: data.y - this.pointStart.y }
      // const p = data
      // this.updateShape(p);
      // this.emit('shape_change', { size: this.size, controlPoint: this.controlPoint });

    }, _this9);
    return dragablePoint;
  };

  this.color = color;
  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics);
  this.controlPoints = {
    point_1: {
      x: 0,
      y: 0
    },
    point_2: {
      x: -15,
      y: 0
    },
    point_3: {
      x: -15,
      y: 5
    },
    point_4: {
      x: 0,
      y: 5
    }
  };
  this.dragablePoints = {}; // this.updatePaddle();

  if (isEditable) {
    // createDragablePoint('point_1', 0xBDFF00, 3, (p) =>
    // {
    //   if(p.y !== 0) p.y = 0;
    //
    //   return p;
    // });
    this.dragablePoints['point_2'] = createDragablePoint('point_2', 0xFF7000, 3);
    this.dragablePoints['point_3'] = createDragablePoint('point_3', 0xFF7000, 3);
    this.dragablePoints['point_4'] = createDragablePoint('point_4', 0xBDFF00, 3, function(p) {
      if (p.x > 0) p.x = 0;
      if (p.y < 3) p.y = 3;
      return p;
    });
  }

  this.updateSize(20);
};

PaddleView2.prototype = Object.create(PIXI.Container.prototype);
PaddleView2.prototype.constructor = PaddleView2;

PaddleView2.prototype.updateSize = function(size) {
  this.size = size;
  this.updatePaddle();
};

PaddleView2.prototype.updateControlPoints = function(controlPoints) {
  this.controlPoints = controlPoints;
  this.updatePaddle();
};

PaddleView2.prototype.updatePaddle = function() {
  var _this10 = this;

  // this.size = size;
  this.pointStart = {
    x: -this.size / 2,
    y: 0
  };
  this.pointEnd = {
    x: this.size / 2,
    y: 0
  }; // console.log('S:', this.pointStart);
  // const { point_1, point_2, point_3, point_4 } = this.controlPoints;

  var point_1 = this.controlPoints.point_1;
  var point_2 = this.controlPoints.point_2;
  var point_3 = this.controlPoints.point_3;
  var point_4 = this.controlPoints.point_4;
  this.curveLeft = new Bezier(point_1.x + this.pointStart.x, point_1.y + this.pointStart.y, point_2.x + this.pointStart.x, point_2.y + this.pointStart.y, point_3.x + this.pointStart.x, point_3.y + this.pointStart.y, point_4.x + this.pointStart.x, point_4.y + this.pointStart.y);
  this.curveRight = new Bezier(-point_4.x + this.pointEnd.x, point_4.y + this.pointEnd.y, -point_3.x + this.pointEnd.x, point_3.y + this.pointEnd.y, -point_2.x + this.pointEnd.x, point_2.y + this.pointEnd.y, -point_1.x + this.pointEnd.x, point_1.y + this.pointEnd.y);
  this.points = [].concat(_toConsumableArray(this.curveLeft.getLUT(20)), _toConsumableArray(this.curveRight.getLUT(20)));
  var minX = null;
  var maxX = null;
  var minY = null;
  var maxY = null;
  this.points.forEach(function(p) {
    if (minX == null || p.x < minX) minX = p.x;
    if (maxX == null || p.x > maxX) maxX = p.x;
    if (minY == null || p.y < minY) minY = p.y;
    if (maxY == null || p.y > maxY) maxY = p.y;
  });
  this.paddleWidth = Math.abs(minX - maxX);
  this.paddleHeight = Math.abs(minY - maxY);
  this.graphics.clear();
  this.drawPaddle(this.graphics, this.color, this.points);

  if (this.isEditable) {
    this.graphics.lineStyle(0.34, 0xFF7000);
    this.graphics.moveTo(point_1.x + this.pointStart.x, point_1.y + this.pointStart.y);
    this.graphics.lineTo(point_2.x + this.pointStart.x, point_2.y + this.pointStart.y);
    this.graphics.moveTo(point_3.x + this.pointStart.x, point_3.y + this.pointStart.y);
    this.graphics.lineTo(point_4.x + this.pointStart.x, point_4.y + this.pointStart.y);
    Object.keys(this.dragablePoints).forEach(function(key) {
      var dragablePoint = _this10.dragablePoints[key];
      var point = _this10.controlPoints[key]; // console.log('K:', key, dragablePoint, point)

      dragablePoint.x = point.x + _this10.pointStart.x;
      dragablePoint.y = point.y + _this10.pointStart.y;
    });
  }

  this.emit('change', {
    size: this.size,
    controlPoints: this.controlPoints,
    paddleWidth: this.paddleWidth,
    paddleHeight: this.paddleHeight
  });
};

PaddleView2.prototype.getPoints = function() {
  var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return this.points.map(function(point) {
    return Util.rotatePointDeg(point.x, point.y, 0, 0, angle);
  });
};

PaddleView2.prototype.drawPaddle = function(graphics, color, vertices) {
  graphics.beginFill(color, 1);
  graphics.lineStyle(1, color, 1.0);
  var startVertice = vertices[0];
  graphics.moveTo(startVertice.x, startVertice.y);

  for (var i = 1; i < vertices.length; i++) {
    graphics.lineTo(vertices[i].x, vertices[i].y);
  }

  graphics.lineTo(startVertice.x, startVertice.y);
};

NORD.ScreenMainMenu.prototype.createSwitcher = function(x, y, labelName, switcherName, selected, onChange) {
  // const label = Util.createSprite({ parent: this, x: -112, y: y, atlas: 'texture_atlas', texture: labelName+'.png', aX: 1.0, aY: 0.5 });
  var config = null;

  if (switcherName == 'players') {
    config = {
      selected: selected,
      left: {
        spriteOn: {
          texture: 'SinglePlayerSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'SinglePlayer',
          aX: 0.5,
          aY: 0.5
        }
      },
      center: {
        spriteOn: {
          texture: 'LocalMultiplayerSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'LocalMultiplayer',
          aX: 0.5,
          aY: 0.5
        }
      },
      right: {
        spriteOn: {
          texture: 'OnlineMultiplayerSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'OnlineMultiplayer',
          aX: 0.5,
          aY: 0.5
        }
      }
    };
  } else {
    config = {
      selected: selected,
      left: {
        spriteOn: {
          texture: 'NormalModeSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'NormalMode',
          aX: 0.5,
          aY: 0.5
        }
      },
      right: {
        spriteOn: {
          texture: 'ThrillerModeSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'ThrillerMode',
          aX: 0.5,
          aY: 0.5
        }
      }
    };
  }

  var switcher = new NORD.MenuSwitcher({
    parentPanel: this,
    container: this.containerSwitchers,
    x: 0,
    y: y
  }, config, "Main");
  switcher.on('side_change', function(side) {
    // console.log('Side change:', side);
    onChange(side);
  });
  return switcher; // switcher.scale.x = switcher.scale.y = Util.randomRange(1.0, 1.1);
};

//Shunmugam Random Name Popup
NORD.randomNamePopup = function(config) {
  var l_playerName;
  var s_namePanel;
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 244;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false; // this.alpha = 0;
  // let Plane9 = new PIXI.NineSlicePlane(PIXI.Texture.from('BoxWithRoundedCorners.png'), 15, 15, 15, 15);

  this.backBG = Util.createSprite({
    parent: this,
    texture: 'BG',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.55
  });

  this.addChild(this.backBG);

  this.bg = Util.createSprite({
    parent: this,
    texture: 'PauseBg',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.45
  });

  this.addChild(this.bg);

  var textTitle = new PIXI.Text('TYPE YOUR NAME', {
    parent: this.bg,
    fontFamily: 'Russo One',
    fontSize: 64,
    fill: 'white',
    align: 'center'
  });
  textTitle.anchor.set(0.5);
  textTitle.position.set(0, -this.bg.height * 0.365);
  this.bg.addChild(textTitle);


  this.errorText = new PIXI.Text('Entered name contains\n profanity/special characters', {
    parent: this.bg,
    fontFamily: 'Russo One',
    fontSize: 30,
    fill: 'red',
    align: 'center'
  });
  this.errorText.anchor.set(0.5);
  this.errorText.position.set(0, this.bg.height * 0.5);
  this.bg.addChild(this.errorText);
  this.errorText.alpha = 0;

  this.s_namePanel = Util.createSprite({
    parent: this.bg,
    texture: 'TextBox',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.75
  });
  this.s_namePanel.anchor.set(0.5);
  this.s_namePanel.position.set(0, this.bg.height * 0.2);
  this.bg.addChild(this.s_namePanel);

  this.l_playerName = new PIXI.TextInput({
    input: {
      fontFamily: 'Russo One',
      fontSize: '50px',
      padding: '18px 24px',
      width: '450px',
      height: '40px',
      color: 'white',
      align: 'center'
    }

  })
  this.l_playerName.maxLength = 12;

  this.l_playerName.placeholder = 'eg. creedCrimson'
  if (NORD.App.playerController.getName() != null)
    this.l_playerName.text = NORD.App.playerController.getName();
  this.l_playerName.x = 0;
  this.l_playerName.y = 0;
  this.l_playerName.pivot.x = this.l_playerName.width / 2
  this.l_playerName.pivot.y = this.l_playerName.height / 2
  this.s_namePanel.addChild(this.l_playerName);

  this.closeButton = Util.createButton('btn', this, null, '', 169, -150, 50, 50, NORD.game.tweenClickSimple, NORD.assetsManager.getAsset('CloseBtn'), {
    texture: 'CloseButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.45
  });
  this.closeButton.soundClick = NORD.assetsManager.getAsset('play_button')
  this.closeButton.addListener('button_click', function(data) {
    var _this5 = this;
    MainMenuLocation.enableAllButtons();
    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this5.hide("", function() {
        NORD.mainMenu.randomNamePopup.hide();
      });
    });

  }, this);

  this.okButton = Util.createButton('btn', this, null, '', 0, this.bg.height * 0.45, 100, 40, NORD.game.tweenClickSimple, NORD.assetsManager.getAsset('EnterButton'), {
    parent: this.bg,
    texture: 'EnterButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.45
  });
  this.okButton.soundClick = NORD.assetsManager.getAsset('play_button')
  this.okButton.addListener('button_click', function(data) {
    var _this5 = this;
    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      if (!Util.compareProfanityWords(NORD.mainMenu.randomNamePopup.l_playerName.text)) {
        MainMenuLocation.enableAllButtons();
        NORD.App.playerController.setName(NORD.mainMenu.randomNamePopup.l_playerName.text);

        if (DemoLoadFunction != null)
          DemoLoadFunction.disconnect();
        DemoLoadFunction = undefined;
        NORD.mainMenu.multiplayerSelectionPopup.startPhotonSerer();
        NORD.game.screenMainMenu.subModeSelectionPopup.show();
        NORD.mainMenu.randomNamePopup.hide();
      } else {
        if (NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha != null)
          NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha.kill();
        NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha = TweenMax.to(NORD.mainMenu.randomNamePopup.errorText, 1, {
          alpha: 1,
          onComplete: function onComplete() {
            NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha = null;
            setTimeout(function() {
              decreaseerrorTextAlpha();
            }, 2000);
          }
        });

        function decreaseerrorTextAlpha() {
          if (NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha != null)
            NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha.kill();
          NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha = TweenMax.to(NORD.mainMenu.randomNamePopup.errorText, 1, {
            alpha: 0,
            onComplete: function onComplete() {
              NORD.mainMenu.randomNamePopup.errorText.tweenBodyAlpha = null;
            }
          });
        }
      }
    });
    // DemoLoadFunction.createRoom(name, k);
  }, this);
};

NORD.randomNamePopup.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.randomNamePopup.prototype.constructor = NORD.randomNamePopup;

NORD.randomNamePopup.prototype.show = function(data) {
  this.tween({
    name: 'show_anim'
  });
};

NORD.randomNamePopup.prototype.hide = function(data, callback) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    if (callback) callback();
  });
};

NORD.randomNamePopup.prototype.tween = function(data, callback) {
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

NORD.randomNamePopup.prototype.updateName = function() {
  // this.l_playerName.scale = 1;
  this.l_playerName.text = NORD.App.playerController.getName();
  this.updateNameSize();
};

NORD.randomNamePopup.prototype.updateNameSize = function() {
  if (this.l_playerName.width > this.s_namePanel.width) {
    var toScale = this.s_namePanel.width / this.l_playerName.width;
    this.l_playerName.scale.x = toScale;
    this.l_playerName.scale.y = toScale;
  }
}

NORD.randomNamePopup.prototype.updateRandomName = function() {
  // this.l_playerName.scale = 1;
  this.l_playerName.text = NORD.App.playerController.getRandomName();
  this.updateNameSize();
};
//Shunmugam Random Name Popup End


/***************************************************************************************Popup Sub Mode Selection*************************************************************************************/
NORD.subModeSelectionPopup = function(config) {
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 300;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false; // this.alpha = 0;
  this.board = "board_1";


  this.bg = Util.createSprite({
    parent: this,
    texture: 'BG',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.465
  });

  this.popupHeader = new PIXI.Text('SELECT A GAME BOARD', {
    fontFamily: 'Russo One',
    fontSize: 17,
    fill: 'white',
    align: 'center'
  });
  this.popupHeader.anchor.set(0.5);
  this.popupHeader.position.set(0, -195);
  this.addChild(this.popupHeader);

  this.backButton = Util.createButton('btn', this, null, '', -320, -185, 50, 50, NORD.game.tweenClickSimple, NORD.assetsManager.getAsset('BackButton'), {
    texture: 'BackButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });

  this.backButton.soundClick = NORD.assetsManager.getAsset('play_button')
  this.backButton.addListener('button_click', function(data) {
    var _this5 = this;
    MainMenuLocation.enableAllButtons();
    if (this.state !== 'show') return;
    TweenMax.delayedCall(0.07 * 2, function() {
      _this5.hide("", function() {
        NORD.mainMenu.randomNamePopup.hide();
      });
    });

  }, this);

  this.switchThrillerMode = this.createSwitcher(0, -150, 'label_Thriller', 'Thriller', 'left', function(side) {
    var dataMap = {
      left: 'STUN_PLAYER',
      right: 'TELEPORT_MODE',
      center: 'KITTY_SHRINK_PADDLE',
      bottomLeft: 'SHADOW_MODE',
      bottomRight: 'BLACK_HOLE_MODE',
      bottomCenter: 'INVERSE_MODE',
      playAll: 'ALL'
    };
    NORD.game.panelSettings.actionMode = dataMap[side];
  });

  this.separatorText = new PIXI.Text('OR', {
    fontFamily: 'Russo One',
    fontSize: 20,
    fill: 'green',
    align: 'center',
  });
  this.separatorText.anchor.set(0.5);
  this.separatorText.position.set(0, -65);
  this.addChild(this.separatorText);

  this.switchNormalMode = this.createSwitcher(0, -75, 'label_Normal', 'Normal', 'left', function(side) {
    var dataMap = {
      left: 'board_2',
      right: 'board_1',
      center: 'board_3'
    };
    var config = NORD.game.config;
    config.board = dataMap[side];
    NORD.game.setConfig(config); // console.log('SSS:', config)
  });

  var dividerLine = Util.createSprite({
    parent: this,
    x: 0,
    y: 20,
    texture: 'Separator',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5
  });

  this.difficultyHeader = new PIXI.Text('CHOOSE DIFFICULTY', {
    fontFamily: 'Russo One',
    fontSize: 17,
    fill: 'white',
    align: 'center'
  });
  this.difficultyHeader.anchor.set(0.5);
  this.difficultyHeader.position.set(0, 50);
  this.addChild(this.difficultyHeader);

  this.switchDificulty = this.createSwitcher(0, 100, 'label_difficulty', 'Difficulty', 'left', function(side) {
    var dataMap = {
      left: 'easy',
      right: 'hard',
      center: 'medium'
    };
    var config = NORD.game.config;
    config.dificulty = dataMap[side];
    NORD.game.setConfig(config); // console.log('SSS:', config)
  });

  this.switchRegion = this.createSwitcher(0, 100, 'label_Region', 'Region', 'left', function(side) {
    var dataMap = {
      left: 'asia',
      right: 'eu',
      center: 'in',
      bottomLeft: 'us',
      bottomRight: 'cae',
      bottomCenter: 'ru'
    };
    var config = NORD.game.config;
    config.region = dataMap[side];
    NORD.game.setConfig(config); // console.log('SSS:', config)
  });

  this.playButton = Util.createButton('btn', this, null, '', 0, 200, 147, 68, NORD.game.tweenClickSimple, NORD.assetsManager.getAsset('play_button'), {
    texture: 'PlayButton',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5,
  });

  this.playButton.addListener('button_click', function(data) {
    MultiplayerStarted = false;
    this.hide();

    var config = NORD.game.config;
    if (config.players == 'three') {
      if (NORD.mainMenu.isAllButtonEnabled == true) {

        NORD.MultiplayerPopupSowed = true;
        var _this2 = MainMenuLocation;

        NORD.gameState = NORD.GAME_STATE.SERARCHING;

        MainMenuLocation.disableAllButtons();
        TweenMax.delayedCall(0.07 * 2, function() {

          var currentTime = Date.now();

          var connectedReg = NORD.game.config.region;
          localStorage.setItem('savedServerRegion', connectedReg);
          console.log("connected region " + connectedReg);
          DemoLoadFunction.connectToRegionMaster(connectedReg);
          // _this2.multilayerPanel.show();
        });
      }
    } else {
      MainMenuLocation.boardSelected = config.board;

      TweenMax.delayedCall(0.07 * 2, function() {
        if (NORD.game.config.mode !== 'action') MainMenuLocation.toGame(MainMenuLocation.boardSelected);
        else MainMenuLocation.toGame('board_2');
      });
    }

  }, this);


  this.transparentLayer = Util.createSprite({
    parent: this,
    texture: 'TransparentLayer',
    aX: 0.5,
    aY: 0.5,
    scaleX: 100,
    scaleY: 100,
  });
  this.transparentLayer.alpha = 0.85;

  this.loadingIndicator = Util.createSprite({
    parent: this,
    texture: 'loadIcon',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5
  });
  this.loadingIndicator.position.y = -50;
  this.currentAngle = 0;

  this.loaderTextData = new PIXI.Text('GETTING OPTIMAL SERVER', {
    fontFamily: 'Russo One',
    fontSize: 35,
    fill: 'white',
    align: 'center',
  });
  this.loaderTextData.anchor.set(0.5);
  this.loaderTextData.position.x = 0;
  this.loaderTextData.position.y = 100;
  this.loaderTextData.alpha = 0.85;
  this.addChild(this.loaderTextData);


  rotateAction();

  function rotateAction() {
    requestAnimationFrame(rotateAction);
    self.loadingIndicator.rotation += 0.01;
  }

};

NORD.subModeSelectionPopup.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.subModeSelectionPopup.prototype.constructor = NORD.subModeSelectionPopup;

NORD.subModeSelectionPopup.prototype.stopLoading = function() {
  this.transparentLayer.visible = false;
  this.loadingIndicator.visible = false;
  this.loaderTextData.visible = false;
  this.enableAllButtons();

};

NORD.subModeSelectionPopup.prototype.enableAllButtons = function() {
  //disable Switch Board
  this.switchNormalMode.interactive = true;
  this.switchNormalMode.interactiveChildren = true;

  //disable Switch Mode
  this.switchThrillerMode.interactive = true;
  this.switchThrillerMode.interactiveChildren = true;

  //disable switch Dificulty
  this.switchDificulty.interactive = true;
  this.switchDificulty.interactiveChildren = true;

  //disable switch Region
  this.switchRegion.interactive = true;
  this.switchRegion.interactiveChildren = true;

  this.backButton.interactive = true;
  this.playButton.interactive = true;
};

NORD.subModeSelectionPopup.prototype.disableAllButtons = function() {
  //disable Switch Board
  this.switchNormalMode.interactive = false;
  this.switchNormalMode.interactiveChildren = false;

  //disable Switch Mode
  this.switchThrillerMode.interactive = false;
  this.switchThrillerMode.interactiveChildren = false;

  //disable switch Dificulty
  this.switchDificulty.interactive = false;
  this.switchDificulty.interactiveChildren = false;

  //disable switch Region
  this.switchRegion.interactive = false;
  this.switchRegion.interactiveChildren = false;

  this.backButton.interactive = false;
  this.playButton.interactive = false;


};

NORD.subModeSelectionPopup.prototype.show = function(data) {
  var config = NORD.game.config;

  var NormalPlay = PIXI.Texture.fromFrame('PlayButton');
  var RandomPlay = PIXI.Texture.fromFrame('RandomPlayButton');
  this.playButton.regularSkin.texture = NormalPlay;

  this.switchNormalMode.visible = true;
  this.switchThrillerMode.visible = true;
  this.switchRegion.visible = false;
  this.difficultyHeader.text = 'CHOOSE DIFFICULTY';
  this.loadingIndicator.visible = false;
  this.transparentLayer.visible = false;
  this.loaderTextData.visible = false;

  if (config.players == 'three') {
    this.difficultyHeader.text = 'SELECT REGION';
    this.switchDificulty.visible = false;
    this.switchRegion.visible = true;
    this.loadingIndicator.visible = true;
    this.transparentLayer.visible = true;
    this.loaderTextData.visible = true;
    this.playButton.regularSkin.texture = RandomPlay;

    this.disableAllButtons();
  } else
    this.switchDificulty.visible = true;

  if (config.mode == 'action') {
    this.switchNormalMode.visible = false;
    this.separatorText.visible = true;

    this.popupHeader.text = "CHOOSE A MODE";
  } else {
    this.switchThrillerMode.visible = false;
    this.separatorText.visible = false;
    this.popupHeader.text = "SELECT A GAME BOARD";
  }

  if (!MultiplayerStarted) {
    NORD.game.field.setPause(true);
    TweenMax.pauseAll();
  }
  this.tween({
    name: 'show_anim'
  });
};

NORD.subModeSelectionPopup.prototype.hide = function(data, callback) {
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

NORD.subModeSelectionPopup.prototype.createSwitcher = function(x, y, labelName, switcherName, selected, onChange) {
  // const label = Util.createSprite({ parent: this, x: -112, y: y, atlas: 'texture_atlas', texture: labelName+'.png', aX: 1.0, aY: 0.5 });
  var config = null;

  if (switcherName == 'Normal') {
    config = {
      selected: selected,
      left: {
        spriteOn: {
          texture: 'NormalBoardSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'NormalBoard',
          aX: 0.5,
          aY: 0.5
        }
      },
      center: {
        spriteOn: {
          texture: 'DiamondBoardSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'DiamondBoard',
          aX: 0.5,
          aY: 0.5
        }
      },
      right: {
        spriteOn: {
          texture: 'ParallelBoardSelected',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'ParallelBoard',
          aX: 0.5,
          aY: 0.5
        }
      }
    };
  } else if (switcherName == 'Difficulty') {
    config = {
      selected: selected,
      left: {
        spriteOn: {
          texture: 'Easy',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'EASY',
        spriteOffText: 'EASY'
      },
      center: {
        spriteOn: {
          texture: 'Medium',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'MEDIUM',
        spriteOffText: 'MEDIUM'
      },
      right: {
        spriteOn: {
          texture: 'Hard',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'HARD',
        spriteOffText: 'HARD'
      }
    };

  } else if (switcherName == 'Region') {
    config = {
      selected: selected,
      left: {
        spriteOn: {
          texture: 'SelectedPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'Asia',
        spriteOffText: 'Asia',
      },
      center: {
        spriteOn: {
          texture: 'SelectedPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'India',
        spriteOffText: 'India',
      },
      right: {
        spriteOn: {
          texture: 'SelectedPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'Europe',
        spriteOffText: 'Europe',
      },
      bottomLeft: {
        spriteOn: {
          texture: 'SelectedPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'USA - East',
        spriteOffText: 'USA - East',
      },
      bottomRight: {
        spriteOn: {
          texture: 'SelectedPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'Canada',
        spriteOffText: 'Canada',
      },
      bottomCenter: {
        spriteOn: {
          texture: 'SelectedPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel3',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'Russia',
        spriteOffText: 'Russia ',
      }
    };

  } else if (switcherName == 'Thriller') {
    config = {
      selected: selected,
      left: {
        spriteOn: {
          texture: 'SelectedPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'STUN GUN',
        spriteOffText: 'STUN GUN',
      },
      center: {
        spriteOn: {
          texture: 'SelectedPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'SHRINK THE PADDLE',
        spriteOffText: 'SHRINK THE PADDLE',
      },
      right: {
        spriteOn: {
          texture: 'SelectedPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'THROUGH THE PORTAL',
        spriteOffText: 'THROUGH THE PORTAL',
      },
      bottomLeft: {
        spriteOn: {
          texture: 'SelectedPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'SHADOW MODE',
        spriteOffText: 'SHADOW MODE',
      },
      bottomRight: {
        spriteOn: {
          texture: 'SelectedPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'BLACK HOLE',
        spriteOffText: 'BLACK HOLE',
      },
      bottomCenter: {
        spriteOn: {
          texture: 'SelectedPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'REVERSE MODE',
        spriteOffText: 'REVERSE MODE',
      },
      playAll: {
        spriteOn: {
          texture: 'SelectedPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOff: {
          texture: 'BlankPanel2',
          aX: 0.5,
          aY: 0.5
        },
        spriteOnText: 'PLAY ALL',
        spriteOffText: 'PLAY ALL',
      }
    };

  }

  var switcher = new NORD.MenuSwitcher({
    parentPanel: this,
    container: this.containerSwitchers,
    x: 0,
    y: y
  }, config, switcherName);
  switcher.on('side_change', function(side) {
    // console.log('Side change:', side);
    onChange(side);
  });
  return switcher; // switcher.scale.x = switcher.scale.y = Util.randomRange(1.0, 1.1);
};

NORD.subModeSelectionPopup.prototype.tween = function(data, callback) {
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
