"use strict";

// require("core-js/modules/es6.object.assign");

// require("core-js/modules/es6.function.name");


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

NORD.events = new EventEmitter()
NORD.demo = null;

NORD.SHARE_URL = {
  FB : "https://www.facebook.com/sharer/sharer.php?u=hai;src=sdkpreparse",
  TWITTER : "https://twitter.com/intent/tweet?ui_metrics=",
}

NORD.MULTIPLAYER_GAME_MODE = {
  CLASSIC: "classic",
  ACTION: "action",
}

NORD.MULTIPLAYER_GAME_MODE_TYPE = {
  NONE: "",
  MULTIBALL: "DOUBLE_BALL",
  STUNGUN: "STUN_GUN",
  KITTY: "KITTY",
  GRAVITY_WELL: "GRAVITY_WELL",
  INVISIBLE_AREA: "INVISIBLE_AREA",
  BUMPER: "BUMPER",
  FIRE_ZONE: "FIRE_ZONE",
  INVISIBLE_WALL: "INVISIBLE_WALL",
  BIG_BALL_LITTLE_PADDLES: "BIG_BALL_LITTLE_PADDLES",
  STUNPLAYER: "STUN_PLAYER",
  KITTY_SHRINK_PADDLE: "KITTY_SHRINK_PADDLE",
  SHADOW_MODE: "SHADOW_MODE",
  INVERSE_MODE: "INVERSE_MODE",
  TELEPORT_MODE: "TELEPORT_MODE",
  BLACK_HOLE_MODE: "BLACK_HOLE_MODE",
}

NORD.MULTIPLAYER_GAME_TYPE = {
  RANDOM: "random",
  CUSTOM: "custom"
}
NORD.MULTIPLAYER_BOARD_TYPE = {
  DIAMOND_MODE: "board_3",
  PARALLEL_MODE: "board_1",
  NORMAL_MODE: "board_2",
}
NORD.MULTIPLAYER_GAME_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard"
}

NORD.RANK_TYPE = {
  EASY: "Rookie",
  MEDIUM: "Veteran",
  HARD: "Ace"
}

NORD.GAME_STATE = {
  SERARCHING: 1,
  IN_GAME: 2,
  ENDED: 3
}


NORD.initGameDefinitions = function() {
  NORD.definitionsManager.appSize = {
    widthMin: 720,
    widthMax: 720,
    heightMin: 500,
    heightMax: 500
  };
  NORD.definitionsManager.stageColor = 0x00003A;
  NORD.definitionsManager.appName = 'Retro-Ping-Pong';
  NORD.definitionsManager.appVersion = '1.0'; // NORD.definitionsManager.colorYellow = 0xC2C200;

  NORD.definitionsManager.colorYellow = 0xded704;
  NORD.definitionsManager.avaiableDomains = ['localhost', 'z-var.ru', "coolmath-games.com", "coolmath-games.com", "edit.coolmath-games.com", "stage.coolmath-games.com", "edit-stage.coolmath-games.com", "dev.coolmath-games.com", "m.coolmath-games.com", "coolmathgames.com", "coolmathgames.com", "edit.coolmathgames.com", "stage.coolmathgames.com", "edit-stage.coolmathgames.com", "dev.coolmathgames.com", "m.coolmathgames.com"];
  NORD.definitionsManager.assetsGroupBoot = new AssetsGroup('boot', [{
    name: 'preloader_bar_border',
    url: 'assets/preloader/preloader_bar_border.png'
  }, {
    name: 'preloader_bar',
    url: 'assets/preloader/preloader_bar.png'
  }]);
  var audioFormats = ['.ogg', '.m4a'];
  NORD.definitionsManager.assetsGroupMain = new AssetsGroup('main', [{
    name: 'texture_atlas',
    url: 'assets/texture_atlas.json'
  }, {
    name: 'data',
    url: 'assets/data.json'
  }, {
    name: 'randomNames',
    url: 'assets/RandomNames.json'
  }, {
    name: 'profanityNames',
    url: 'assets/ProfanityNames.json'
  }, {
    type: 'AUDIO',
    name: 'BGM',
    url: 'assets/sound/BGM',
    formats: audioFormats,
    autoplay: false,
    loop: true,
  }, {
    type: 'AUDIO',
    name: 'sound_click',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'wall_hit_big_ball',
    url: 'assets/sound/BallHit1',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'wall_hit_ball',
    url: 'assets/sound/BallHit2',
    formats: audioFormats,
    volume: 0.6
  }, {
    type: 'AUDIO',
    name: 'ready',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'player2_hit_big_ball',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'player1_hit_big_ball',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'player2_hit_ball',
    url: 'assets/sound/BallHitPaddle',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'player1_hit_ball',
    url: 'assets/sound/BallHitPaddle',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'BallHitPaddle',
    url: 'assets/sound/BallHitPaddle',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'player_win',
    url: 'assets/sound/MatchWon',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'player_goal',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'play_button',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'kitty_hit_1',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'kitty_hit_2',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'go',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'computer_win',
    url: 'assets/sound/MatchLost',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'computer_goal',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'ball_start',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'ball_hit_bumper',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'BlackHole',
    url: 'assets/sound/BlackHole',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'BlackHole',
    url: 'assets/sound/BlackHole',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'Shrinking',
    url: 'assets/sound/Shrinking',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'shoot_hit',
    url: 'assets/sound/StunShot',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'gravity_well',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    type: 'AUDIO',
    name: 'ball_fire_ring',
    url: 'assets/sound/ButtonTap',
    formats: audioFormats
  }, {
    name: 'PopupSub',
    url: 'assets/images/popup/PopupSub.png'
  }, {
    name: 'PopupSmall',
    url: 'assets/images/popup/PopupSmall.png'
  }, {
    name: 'SubPanel01',
    url: 'assets/images/popup/SubPanel01.png'
  }, {
    name: 'RefreshIcon',
    url: 'assets/images/popup/RefreshIcon.png'
  }, {
    name: 'loadingIcon',
    url: 'assets/images/popup/loadingIcon.png'
  }, {
    name: 'loadIcon',
    url: 'assets/images/popup/LoadingBar.png'
  }, {
    name: 'teleport1',
    url: 'assets/images/popup/load.png'
  }, {
    name: 'portalDotImage',
    url: 'assets/images/popup/gameplayPopup/Mode/Dot-Image.png'
  }, {
    name: 'Through-the-portal copy',
    url: 'assets/images/popup/gameplayPopup/Mode/Through-the-portal copy.png'
  }, {
    name: 'spiral',
    url: 'assets/images/popup/gameplayPopup/Mode/spiral.png'
  }, {
    name: 'portal1',
    url: 'assets/images/popup/gameplayPopup/Mode/Through-the-portal.png'
  }, {
    name: 'Separator-Line',
    url: 'assets/images/popup/gameplayPopup/Separator-Line.png'
  }, {
    name: 'Game-Board',
    url: 'assets/images/popup/gameplayPopup/Game-Board.png'
  }, {
    name: 'rightPaddle',
    url: 'assets/images/popup/gameplayPopup/Paddle-2.png'
  }, {
    name: 'leftPaddle',
    url: 'assets/images/popup/gameplayPopup/Paddle-1.png'
  }, {
    name: 'rightPaddleShort',
    url: 'assets/images/popup/gameplayPopup/Paddle-2Short.png'
  }, {
    name: 'leftPaddleShort',
    url: 'assets/images/popup/gameplayPopup/Paddle-1Short.png'
  }, {
    name: 'Ball',
    url: 'assets/images/popup/gameplayPopup/Ball.png'
  }, {
    name: 'PauseButton',
    url: 'assets/images/popup/gameplayPopup/Pause-Button.png'
  }, {
    name: 'GameBackGround',
    url: 'assets/images/popup/gameplayPopup/Background.png'
  }, {
    name: 'DiamondMode',
    url: 'assets/images/popup/gameplayPopup/Mode/Diamond.png'
  }, {
    name: 'ParallelLine',
    url: 'assets/images/popup/gameplayPopup/Mode/Parallel-Line.png'
  }, {
    name: 'BG',
    url: 'assets/images/main/BG.png'
  }, {
    name: 'SinglePlayer',
    url: 'assets/images/main/SinglePlayer.png'
  }, {
    name: 'SinglePlayerSelected',
    url: 'assets/images/main/SinglePlayerSelected.png'
  }, {
    name: 'LocalMultiplayer',
    url: 'assets/images/main/LocalMultiplayer.png'
  }, {
    name: 'LocalMultiplayerSelected',
    url: 'assets/images/main/LocalMultiplayerSelected.png'
  }, {
    name: 'OnlineMultiplayer',
    url: 'assets/images/main/OnlineMultiplayer.png'
  }, {
    name: 'OnlineMultiplayerSelected',
    url: 'assets/images/main/OnlineMultiplayerSelected.png'
  }, {
    name: 'SoundOnButton',
    url: 'assets/images/common/SoundOnButton.png'
  }, {
    name: 'SoundOffButton',
    url: 'assets/images/common/SoundOffButton.png'
  }, {
    name: 'NormalMode',
    url: 'assets/images/main/NormalMode.png'
  }, {
    name: 'NormalModeSelected',
    url: 'assets/images/main/NormalModeSelected.png'
  }, {
    name: 'ThrillerMode',
    url: 'assets/images/main/ThrillerMode.png'
  }, {
    name: 'ThrillerModeSelected',
    url: 'assets/images/main/ThrillerModeSelected.png'
  }, {
    name: 'PlayButton',
    url: 'assets/images/main/PlayButton.png'
  }, {
    name: 'Stun-GUn',
    url: 'assets/images/popup/gameplayPopup/Mode/Stun-GUn.png'
  }, {
    name: 'Bullet',
    url: 'assets/images/popup/gameplayPopup/Mode/Bullet.png'
  }, {
    name: 'Bullet-tip',
    url: 'assets/images/popup/gameplayPopup/Mode/Bullet-tip.png'
  }, {
    name: 'Shrink-the-paddle',
    url: 'assets/images/popup/gameplayPopup/Mode/Shrink-the-paddle.png'
  }, {
    name: 'Shadow-bubble',
    url: 'assets/images/popup/gameplayPopup/Mode/Shadow-bubble.png'
  }, {
    name: 'Blackhole',
    url: 'assets/images/popup/gameplayPopup/Mode/Blackhole.png'
  }, {
    name: 'BackButton',
    url: 'assets/images/common/BackButton.png'
  }, {
    name: 'NormalBoard',
    url: 'assets/images/submode/NormalBoard.png'
  }, {
    name: 'NormalBoardSelected',
    url: 'assets/images/submode/NormalBoardSelected.png'
  }, {
    name: 'DiamondBoard',
    url: 'assets/images/submode/DiamondBoard.png'
  }, {
    name: 'DiamondBoardSelected',
    url: 'assets/images/submode/DiamondBoardSelected.png'
  }, {
    name: 'ParallelBoard',
    url: 'assets/images/submode/ParallelBoard.png'
  }, {
    name: 'ParallelBoardSelected',
    url: 'assets/images/submode/ParallelBoardSelected.png'
  }, {
    name: 'BlankPanel',
    url: 'assets/images/submode/BlankPanel.png'
  }, {
    name: 'BlankPanel2',
    url: 'assets/images/submode/BlankPanel2.png'
  }, {
    name: 'BlankPanel3',
    url: 'assets/images/submode/BlankPanel3.png'
  }, {
    name: 'SelectedPanel',
    url: 'assets/images/submode/SelectedPanel.png'
  }, {
    name: 'SelectedPanel2',
    url: 'assets/images/submode/SelectedPanel2.png'
  }, {
    name: 'SelectedPanel3',
    url: 'assets/images/submode/SelectedPanel3.png'
  }, {
    name: 'Easy',
    url: 'assets/images/submode/Easy.png'
  }, {
    name: 'Medium',
    url: 'assets/images/submode/Medium.png'
  }, {
    name: 'Hard',
    url: 'assets/images/submode/Hard.png'
  }, {
    name: 'Separator',
    url: 'assets/images/common/Separator.png'
  }, {
    name: 'Ping-panel',
    url: 'assets/images/popup/gameplayPopup/Ping-panel.png'
  }, {
    name: 'Region-Icon',
    url: 'assets/images/popup/gameplayPopup/Region-Icon.png'
  }, {
    name: 'Wifi-Icon',
    url: 'assets/images/popup/gameplayPopup/Wifi-Icon.png'
  }, {
    name: 'PauseBg',
    url: 'assets/images/popup/pause/PauseBg.png'
  }, {
    name: 'CloseButton',
    url: 'assets/images/common/CloseButton.png'
  }, {
    name: 'HomeButton',
    url: 'assets/images/common/HomeButton.png'
  }, {
    name: 'Highlights',
    url: 'assets/images/popup/pause/Highlights.png'
  }, {
    name: 'TransparentLayer',
    url: 'assets/images/common/TransparentLayer.png'
  }, {
    name: 'GreenRibbon',
    url: 'assets/images/common/GreenRibbon.png'
  }, {
    name: 'EnterButton',
    url: 'assets/images/common/EnterButton.png'
  }, {
    name: 'TextBox',
    url: 'assets/images/common/TextboxPlaceHolder.png'
  }, {
    name: 'CancelButton',
    url: 'assets/images/common/CancelButton.png'
  }, {
    name: 'PlayerLeft',
    url: 'assets/images/popup/PlayerLeft.png'
  }, {
    name: 'PlayerRight',
    url: 'assets/images/popup/PlayerRight.png'
  }, {
    name: 'RandomPlayButton',
    url: 'assets/images/submode/RandomPlayButton.png'
  }, {
    name: 'YesButton',
    url: 'assets/images/common/YesButton.png'
  }, {
    name: 'BluePanel',
    url: 'assets/images/result/BluePanel.png'
  }, {
    name: 'RedPanel',
    url: 'assets/images/result/RedPanel.png'
  }, {
    name: 'UpperBluePanel',
    url: 'assets/images/result/UpperBluePanel.png'
  }, {
    name: 'UpperRedPanel',
    url: 'assets/images/result/UpperRedPanel.png'
  }, {
    name: 'Stars',
    url: 'assets/images/result/Stars.png'
  }, {
    name: 'Stars2',
    url: 'assets/images/result/Stars2.png'
  }, {
    name: 'RedDots',
    url: 'assets/images/result/RedDots.png'
  }, {
    name: 'RedDots2',
    url: 'assets/images/result/RedDots2.png'
  }, {
    name: 'Rays',
    url: 'assets/images/result/Rays.png'
  }, {
    name: 'ContinueButton',
    url: 'assets/images/result/ContinueButton.png'
  }, {
    name: 'ShareButton',
    url: 'assets/images/result/ShareButton.png'
  }, {
    name: 'DarkLayer',
    url: 'assets/images/result/DarkLayer.png'
  }]);
}; //=========================================================================================================================================================================//
//=========================================================================================================================================================================//
//=========================================================================================================================================================================//

NORD.App = function() {
  EventEmitter.call(this);
  NORD.App.instance = this;
  this.name = 'NoName';
  this.version = '1.0';
  this.platform = 'none';
  this.dt = 0;
  this.et = 0;
  this.etTime = new Date().getTime();
  this.fps = 60;
  this.windowFocus = true;
  this.forUpdate = [];
  this.mouse = {
    x: 0,
    y: 0
  };
  this.touches = []; // this.resizeCounter = 0;
};

NORD.App.prototype = Object.create(EventEmitter.prototype);
NORD.App.prototype.constructor = NORD.App;

NORD.App.prototype.init = function() {
  var self = this;
  NORD.initGameDefinitions();
  this.platform = Util.isMobile() ? 'mobile' : 'computer';
  this.name = NORD.definitionsManager.appName;
  this.version = NORD.definitionsManager.appVersion;
  NORD.interaction.addListener('mousemove', function(data) {
    NORD.app.mouseGlobal = Object.assign({}, data.data.global);
    NORD.app.mouse = NORD.GUIManager.stage.toLocal(data.data.global);
    NORD.app.touches[data.data.identifier] = Object.assign({}, NORD.app.mouseGlobal);
    self.emit('pointer_move', {
      mouse: NORD.app.mouse
    });
  });
  NORD.interaction.addListener('touchmove', function(data) {
    NORD.app.mouseGlobal = Object.assign({}, data.data.global);
    NORD.app.mouse = NORD.GUIManager.stage.toLocal(data.data.global);
    NORD.app.touches[data.data.identifier] = Object.assign({}, NORD.app.mouseGlobal); // console.log(data.data.identifier);

    self.emit('pointer_move', {
      mouse: NORD.app.mouse
    });
  });
  NORD.interaction.addListener('pointerdown', function(data) {
    NORD.app.mouseGlobal = Object.assign({}, data.data.global);
    NORD.app.mouse = NORD.GUIManager.stage.toLocal(data.data.global); // console.log("F", data);

    NORD.app.touches[data.data.identifier] = Object.assign({}, NORD.app.mouseGlobal);
    self.emit('pointer_down', {
      mouse: NORD.app.mouse
    }); // if(NORD.app.mouse.x > 0 && NORD.app.mouse.x < 200) self.emit('tap_right')
    // else if(NORD.app.mouse.x < 0 && NORD.app.mouse.x > -200) self.emit('tap_left');

    if (NORD.app.mouse.x > 0) self.emit('tap_right');
    else if (NORD.app.mouse.x < 0) self.emit('tap_left');
  });
  NORD.interaction.addListener('pointerup', function(data) {
    NORD.app.mouseGlobal = Object.assign({}, data.data.global);
    NORD.app.mouse = NORD.GUIManager.stage.toLocal(data.data.global);
    NORD.app.touches[data.data.identifier] = Object.assign({}, NORD.app.mouseGlobal);
    self.emit('pointer_up', {
      mouse: NORD.app.mouse
    });
  });
  NORD.GUIManager.on('app_resize', this.onAppResize, this);
  NORD.GUIManager.setAppSize(NORD.definitionsManager.appSize.widthMin, NORD.definitionsManager.appSize.widthMax, NORD.definitionsManager.appSize.heightMin, NORD.definitionsManager.appSize.heightMax);
  console.log('App[' + this.name + '], version: ' + this.version + ', platform: ' + this.platform);
};

NORD.App.prototype.boot = function() {
  // if (NORD.definitionsManager.avaiableDomains.length && !Util.isDomainAvaiable(NORD.definitionsManager.avaiableDomains)) return;
  var self = this;
  NORD.definitionsManager.assetsGroupBoot.once('loading_complete', function() {
    self.emit('boot_loaded');
  });
  NORD.definitionsManager.assetsGroupBoot.load();
};

NORD.App.prototype.onAppResize = function(data) {};

NORD.App.prototype.windowFocusChange = function(focus) {
  if (this.windowFocus == focus) return;
  this.windowFocus = focus;

  if (this.windowFocus) {} else {}
}; // NORD.App.prototype.addForUpdate = function(f, context)
// {
// 	if(context == undefined) context = null;
// 	this.forUpdate.push({f: f, context: context});
// }
// NORD.App.prototype.removeForUpdate = function(f)
// {
// 	var n = this.forUpdate.indexOf(f);
// 	if(n == -1) return;
// 	this.forUpdate.splice(n, 1);
// }
// NORD.App.prototype.update = function()
// {
// 	for(var i = 0; i < this.forUpdate.length; i++)
// 	{
// 		if(this.forUpdate[i].context != null) this.forUpdate[i].f.call(this.forUpdate[i].context);
// 		else this.forUpdate[i].f();
// 	}
//   // console.log(interaction.mouse.global);
// };


NORD.App.prototype.update = function() {
  this.emit('update_before');
  this.emit('update');
  this.emit('update_after');
};

NORD.App.prototype.loop = function(time) {
  requestAnimationFrame(NORD.app.loop);
  NORD.app.et = (time - NORD.app.etTime) * 0.001;
  NORD.app.etTime = time; // console.log(this);

  NORD.app.update();
  NORD.renderer.render(NORD.GUIManager.rootContainer);
};

NORD.App.prototype.apiCallback = function(name, data) {
  // console.log('Api:', name, data);
  if (name == 'statistics') {
    var statistics = '';
    if (NORD.game.config.mode == 'classic') statistics += '1';
    else statistics += '2';
    if (NORD.game.config.players != 'one') statistics += '0';
    else if (NORD.game.config.dificulty == 'easy') statistics += '1';
    else if (NORD.game.config.dificulty == 'medium') statistics += '2';
    else if (NORD.game.config.dificulty == 'hard') statistics += '3';
    if (NORD.game.config.players != 'one') statistics += '0';
    else if (data == 'player') statistics += '1';
    else if (data == 'computer') statistics += '2';
    else if (data == 'exit') statistics += '3';
    statistics += NORD.game.config.gamesCount; // console.log('Statistics: ', statistics);

    if (parent && parent.cmgGameEvent) {
      parent.cmgDataEvent("data", statistics);
    }

    return;
  }

  if (name == 'statistics_point') {
    var _modesMap;

    var _statistics = '9';
    var modesMap = (_modesMap = {}, _defineProperty(_modesMap, 'KITTY', '1'), _defineProperty(_modesMap, 'INVISIBLE_WALL', '4'), _defineProperty(_modesMap, 'INVISIBLE_AREA', '3'), _defineProperty(_modesMap, 'GRAVITY_WELL', '2'), _defineProperty(_modesMap, 'DOUBLE_BALL', '5'), _defineProperty(_modesMap, 'BIG_BALL_LITTLE_PADDLES', '6'), _defineProperty(_modesMap, 'SMALL_GRAVITY_WELL', '2'), _defineProperty(_modesMap, 'FIRE_ZONE', '8'), _defineProperty(_modesMap, 'BUMPER', '9'), _defineProperty(_modesMap, 'STUN_GUN', '7'), _modesMap);
    if (NORD.game.config.dificulty == 'easy') _statistics += '1';
    else if (NORD.game.config.dificulty == 'medium') _statistics += '2';
    else if (NORD.game.config.dificulty == 'hard') _statistics += '3';
    _statistics += modesMap[data.roundMode];
    if (data.win == 'computer') _statistics += '2';
    else _statistics += '1'; // console.log('StatisticsPoint: ', data, statistics);

    if (parent && parent.cmgGameEvent) {
      parent.cmgDataEvent("data", _statistics);
    }

    return;
  }

  if (parent && parent.cmgGameEvent) {
    // console.log('cmgEvent: ' + name + ',', data);
    if (data != null && data != undefined) parent.cmgGameEvent(name, data);
    else parent.cmgGameEvent(name);
  }
}; // var fixedTimeStep = 1 / 60, maxSubSteps = 10, lastTimeMilliseconds;
// requestAnimationFrame(function animloop(timeMilliseconds){
//     requestAnimationFrame(animloop);
//     var timeSinceLastCall = 0;
//     if(timeMilliseconds !== undefined && lastTimeMilliseconds !== undefined){
//         timeSinceLastCall = (timeMilliseconds - lastTimeMilliseconds) / 1000;
//     }
//     // world.step(fixedTimeStep, timeSinceLastCall, maxSubSteps);
//     lastTimeMilliseconds = timeMilliseconds;
//     console.log(timeMilliseconds);
// }


NORD.App.instance = null;
NORD.App.playerController = null;

NORD.App.getInstance = function() {
  return NORD.App.instance;
}; //=========================================================================================================================================================================//
//=========================================================================================================================================================================//
//=========================================================================================================================================================================//


NORD.Game = function() {
  EventEmitter.call(this);
  var self = this;
  this.screenPreloader = null;
  this.currentPlayer = 'one';
  this.config = {
    players: 'one',
    dificulty: 'easy',
    mode: 'classic',
    gamesCount: 0,
    actionHintShows: 0,
    isActionPlayed: false,
    isControlVSCompTutorial: false,
    board: 'board_2',
    region: 'asia'
  };



  //sushant
  this.ballImpulse = {
    msg: "",
    x: 0,
    y: 0,
    x1: 0,
    y1: 0,
    currentTime: 0,
    paddleYPosition: 0,
    currentPing: 0,
  };

  this.isShootTutorial = false;
  this.isControlTutorial = false;
  this.loadConfig();
  NORD.app.once('boot_loaded', function() {
    self.screenPreloader = new NORD.ScreenPreloader({
      name: 'screen_preloader',
      parentPanel: NORD.GUIManager.stage,
      container: NORD.GUIManager.containerCenter
    });
    self.screenPreloader.load(function() {
      self.screenPreloader.tween({
        name: 'hide_anim'
      }, function() {
        self.init();
      });
    });
  });
};

NORD.Game.prototype = Object.create(EventEmitter.prototype);
NORD.Game.prototype.constructor = NORD.Game;

NORD.Game.prototype.init = function() {
  // this.physics = new p2.World({ gravity: [0, 0] });
  // this.bgGradient = NORD.assetsManager.getSprite('texture_atlas', 'bg_gradient.png');
  // NORD.GUIManager.containerBack.addChild(this.bgGradient);
  // this.bgGradient.anchor.set(0.5, 0.5);
  this.config.actionHintShows++;
  this.saveConfig();
  NORD.App.playerController = new NORD.PlayerController();
  NORD.sfsController = new NORD.SFSController();
  NORD.gameEventHandler = new NORD.GameEventHandler();


  this.field = new NORD.Field();
  this.screenMainMenu = new NORD.ScreenMainMenu({
    name: 'screen_main_menu',
    parentPanel: NORD.GUIManager.stage,
    container: NORD.GUIManager.containerCenter
  });
  this.screenGame = new NORD.ScreenGame({
    name: 'screen_game',
    parentPanel: NORD.GUIManager.stage,
    container: NORD.GUIManager.containerCenter
  }); // this.panelEndGame = new NORD.PanelEndGame({ name: 'panel_end_game', parentPanel: NORD.GUIManager.stage, container: NORD.GUIManager.containerCenter });

  this.panelSettings = new NORD.PanelSettings({
    name: 'panel_settings',
    parentPanel: NORD.GUIManager.stage,
    container: NORD.GUIManager.containerCenter
  });
  this.screenMainMenu.tween({
    name: 'show_anim_from_preloader'
  }); // this.panelSettings.tween({ name: 'show_anim' });

  NORD.GUIManager.on('app_resize', this.onAppResize, this);
  NORD.GUIManager.autoresize();
  NORD.app.on('update', this.update, this);
  NORD.app.on('update_after', this.updateAfter, this);

};

NORD.Game.prototype.setConfig = function(config) {
  this.config = config;
  console.log('Set config:', config);
  this.saveConfig();
};

NORD.Game.prototype.saveConfig = function() {
  var data = this.config;
  var jsonString = JSON.stringify(data);
  localStorage.setItem('pong_save', jsonString);
};

NORD.Game.prototype.loadConfig = function() {
  var jsonString = localStorage.getItem('pong_save');
  var data = JSON.parse(jsonString);
  if (!data) return;
  this.config = data;

  this.config.players = 'one';
  this.config.dificulty = 'easy',
    this.config.mode = 'classic',
    this.config.board = 'board_2'
};

NORD.Game.prototype.update = function() {};

NORD.Game.prototype.updateAfter = function() { // const fixedTimeStep = 1/60;
  // const maxSubSteps = 10;
  // this.physics.step(fixedTimeStep, NORD.app.et, maxSubSteps);
};

NORD.Game.prototype.onAppResize = function(data) {
  // this.bgGradient.width = data.appWidth;
  // this.bgGradient.height = data.appHeight;
  // console.log('RR')
  window.scrollTo(0, 0);
};

NORD.Game.prototype.soundClickSimple = function() {
  return NORD.assetsManager.getAsset('sound_click');
};

NORD.Game.prototype.tweenClickSimple = function(data) {
  data.scale = 0.95;
  data.time = 0.07; // data.time = 0.0;

  NORD.GUI.Button.tweenClickSimple(data);
};

NORD.Game.prototype.tweenClickSimpleB = function(data) {
  data.scale = 0.5 * 0.95;
  data.time = 0.07; // data.time = 0.0;

  NORD.GUI.Button.tweenClickSimple(data);
};

var createPaddle = function createPaddle() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 80;
  var shape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  var backSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
  var angle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  angle = angle * Util.TO_RADIANS;
  var radius = (0.5 + shape) * size;
  var shift = Math.sqrt(radius * radius - size / 2 * (size / 2));
  var pX = 0;
  pX = radius - (radius - shift);
  var startAngle = Util.angle(0, 0, pX, -size / 2);
  var endAngle = Util.angle(0, 0, pX, size / 2);
  var vertices = [];
  vertices.push({
    x: -backSize + shift,
    y: -size / 2
  });
  var arc = createArc(radius, startAngle, endAngle, 30); // const pUp = createP(arc[0], Math.PI/4, backSize, 1);
  // const pDown = createP(arc[arc.length-1], -Math.PI/4, backSize, -1);
  // vertices.push(...pUp);

  vertices.push(Object.assign({}, arc)); // vertices.push(...pDown);

  vertices.push({
    x: -backSize + shift,
    y: size / 2
  }); // let startWVert = null;
  // let endWVert = null;
  // vertices.forEach(vert => {
  //  if(!startWVert || vert.x < startWVert.x) startWVert = vert;
  //  if(!endWVert || vert.x > endWVert.x) endWVert = vert;
  // });
  // const width = Math.abs(startWVert.x - endWVert.x);

  vertices.forEach(function(vert) {
    var vX = vert.x;
    var vY = vert.y;
    vert.x = vX * Math.cos(angle) - vY * Math.sin(angle);
    vert.y = vX * Math.sin(angle) + vY * Math.cos(angle);
  });
  return vertices;
};

function createP(startPoint, endAngle, size, side) {
  console.log('CCC:', startPoint, endAngle, size, side);
  size = 20;
  var vertices = [];
  var p = {
    x: startPoint.x - size,
    y: startPoint.y + 10 * side
  };
  var angle = Util.angle(p.x, p.y, startPoint.x, startPoint.y);
  var sign = Util.sign(endAngle - angle);
  var step = (endAngle - angle) / 10;

  for (var i = 0; i < 10; i++) {
    angle += step;
    if (i < 3) continue; // console.log('angle:', angle * Util.TO_DEGREES);
    // const ppp = Util.rotatePointDeg(startPoint.x, startPoint.y, p.x, p.y, Util.normalizeDegAngle(angle*Util.TO_DEGREES)*Util.TO_RADIANS);

    var ppp = Util.rotatePointDeg(startPoint.x, startPoint.y, p.x, p.y, angle); // vertices.unshift(ppp);

    if (step > 0) vertices.unshift(ppp);
    else vertices.push(ppp);
  }

  console.log('F:', sign, step, step < 0, vertices);
  return vertices;
}

function rotatePoint(p, angle) {
  var vX = p.x;
  var vY = p.y;
  p.x = vX * Math.cos(angle) - vY * Math.sin(angle);
  p.y = vX * Math.sin(angle) + vY * Math.cos(angle);
  return p;
}

function createArc(radius) {
  var startAngle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var endAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var steps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
  var vertices = [];
  var arcAngle = endAngle - startAngle;
  addVertice(startAngle);

  while (Math.abs(endAngle - startAngle) > arcAngle / (steps - 1) * 0.999999) {
    startAngle += arcAngle / (steps - 1);
    addVertice(startAngle);
  }

  return vertices;

  function addVertice(angle) {
    var vert = {
      x: 0,
      y: 0
    };
    var vX = radius;
    var vY = 0;
    vert.x = vX * Math.cos(angle) - vY * Math.sin(angle);
    vert.y = vX * Math.sin(angle) + vY * Math.cos(angle); // console.log('AAA:', angle*Util.TO_DEGREES, vert)

    vertices.push(vert);
  }
}

function createPaddleSide() {
  var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  // const h = 10;
  var radius = h / 2; // const w = 40;

  var vertices = createArc(radius, Util.angle(0, 0, radius, -h / 2), Util.angle(0, 0, radius, h / 2), 10);
  return vertices;
}

var drawVertices = function drawVertices(vertices) {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0x0000000, 0.2);
  graphics.lineStyle(1, 0xFFFFFF, 1.0);
  var startVertice = vertices[0];
  graphics.moveTo(startVertice.x, startVertice.y);

  for (var i = 1; i < vertices.length; i++) {
    graphics.lineTo(vertices[i].x, vertices[i].y);
  }

  graphics.lineTo(startVertice.x, startVertice.y);
  return graphics;
};
