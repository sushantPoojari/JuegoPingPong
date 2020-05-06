"use strict";

var LeftPaddle;
var RightPaddle;
var Ball;
var Ball1;
var ControlAreaGlobal;
var RoundVariable;
var ScoreHolder;
var LeftPlayer;
var RightPlayer;


// require("core-js/modules/es6.object.assign");

// require("core-js/modules/es6.function.name");

// require("core-js/modules/web.dom.iterable");

// require("core-js/modules/es6.array.iterator");

// require("core-js/modules/es6.object.to-string");

// require("core-js/modules/es6.object.keys");

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

NORD.Field = function() {
  var _this = this;



  PIXI.Container.call(this);
  var self = this;
  this.config = {
    FIELD_WIDTH: 640,
    FIELD_HEIGHT: 500 - 40 * 2,
    WALLS_HEIGHT: 20,
    PADDLE_SHIFT: 640 / 2 - 20,
    actionMode: new Util.ObservableValue(2),
    scoresForWin: new Util.ObservableValue(2),
    fingerSense: new Util.ObservableValue(1.0),
    aiTest: new Util.ObservableValue(0.0),
    aiEasy: new Util.ObservableValue(4.0),
    aiHard: new Util.ObservableValue(8.0),
    aiEasyMissK: new Util.ObservableValue(0.0),
    aiMediumMissK: new Util.ObservableValue(0.0),
    aiHardMissK: new Util.ObservableValue(0.0),
    aiActionMul: new Util.ObservableValue(0.0),
    speedDificultyK: new Util.ObservableValue(0),
    endGamePanelDelay: new Util.ObservableValue(1.5),
    bonusMinDelay: new Util.ObservableValue(7.0),
    bonusMaxDelay: new Util.ObservableValue(10.0),
    boardDiamonSize: new Util.ObservableValue(80.0),
    boardPlanksWidth: new Util.ObservableValue(300.0),
    boardPlanksHeight: new Util.ObservableValue(20.0),
    boardPlanksShift: new Util.ObservableValue(120.0),
    // paddleShape: new Util.ObservableValue(0.5),
    paddleShape: new Util.ObservableValue({
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
      },
      rankNumber: -1
    }),
    paddleSize: new Util.ObservableValue(80),
    paddlePlatformSize: new Util.ObservableValue(10),
    paddleSpeed: new Util.ObservableValue(5),
    paddleAcceleration: new Util.ObservableValue(0.5),
    paddleDeceleration: new Util.ObservableValue(0.25),
    ballSize: new Util.ObservableValue(10),
    ballMinSpeed: new Util.ObservableValue(4),
    ballMaxSpeed: new Util.ObservableValue(10),
    ballMinSpeedAction: new Util.ObservableValue(4),
    ballMaxSpeedAction: new Util.ObservableValue(10),
    ballSpeedUpFirstHits: new Util.ObservableValue(2),
    ballSpeedUpHits: new Util.ObservableValue(2),
    ballSpeedUpK: new Util.ObservableValue(1.2),
    bonusPaddleSizeContainerDuration: new Util.ObservableValue(0),
    bonusPaddleSizeBonusDuration: new Util.ObservableValue(0),
    bonusPaddleSizeBonusSize: new Util.ObservableValue(0),
    bonusPaddleSpeedContainerDuration: new Util.ObservableValue(0),
    bonusPaddleSpeedBonusDuration: new Util.ObservableValue(0),
    bonusPaddleSpeedBonusSpeed: new Util.ObservableValue(0),
    bonusSpeedLimitContainerDuration: new Util.ObservableValue(0),
    bonusSpeedLimitDuration: new Util.ObservableValue(0),
    bonusSpeedLimitMaxSpeed: new Util.ObservableValue(0),
    bonusSpeedLimitBallSpeedUp: new Util.ObservableValue(0),
    bonusNewBallContainerDuration: new Util.ObservableValue(0),
    bonusKittyDuration: new Util.ObservableValue(0),
    bonusKittySpeed: new Util.ObservableValue(0),
    bonusGravityWellDuration: new Util.ObservableValue(0),
    bonusGravityWellRadius: new Util.ObservableValue(0),
    bonusGravityWellPower: new Util.ObservableValue(0),
    bonusInvisibleAreaDuration: new Util.ObservableValue(0),
    bonusInvisibleAreaWidth: new Util.ObservableValue(0),
    bonusShootCount: new Util.ObservableValue(0),
    bonusShootContainerDuration: new Util.ObservableValue(0),
    bonusShootBulletSpeed: new Util.ObservableValue(0),
    bonusShootStunDuration: new Util.ObservableValue(0),
    obstacleInvisibleWallWidth: new Util.ObservableValue(0),
    obstacleInvisibleWallHeight: new Util.ObservableValue(0),
    obstacleInvisibleWallBlinkDuration: new Util.ObservableValue(0),
    obstacleInvisibleWallSpeedUpK: new Util.ObservableValue(0),
    multiballModeBallMaxSpeed: new Util.ObservableValue(0),
    multiballModeNewBallDelay: new Util.ObservableValue(0),
    bblpModeBallSize: new Util.ObservableValue(0),
    bblpModeBallMinSpeed: new Util.ObservableValue(0),
    bblpModeBallMaxSpeed: new Util.ObservableValue(0),
    smallGravityWellPower: new Util.ObservableValue(0),
    smallGravityWellRadius: new Util.ObservableValue(0),
    fireZoneModeRadius: new Util.ObservableValue(0),
    fireZoneModeSpeedUp: new Util.ObservableValue(0),
    fireZoneModeCounter: new Util.ObservableValue(0),
    fireZoneModeBallMinSpeed: new Util.ObservableValue(0),
    fireZoneModeBallMaxSpeed: new Util.ObservableValue(0),
    bumperModeRadius: new Util.ObservableValue(0),
    bumperModeSpeedUp: new Util.ObservableValue(0),
    bumperModeCount: new Util.ObservableValue(0),
    bumperModeFiveShift: new Util.ObservableValue(0),
    gunModeReload: new Util.ObservableValue(0),
    gunModeStun: new Util.ObservableValue(0) // easyBallSlowK: new Util.ObservableValue(0)

  };
  var settingsData = NORD.assetsManager.getJson('data').settings;
  Object.keys(settingsData).forEach(function(key) {
    if (_this.config[key]) _this.config[key].value = settingsData[key];
  });
  this.smallPaddleData = {
    size: 4,
    shape: {
      point_1: {
        x: 0,
        y: 0
      },
      point_2: {
        x: -22.336956521739125,
        y: 0.8695652173913118
      },
      point_3: {
        x: -23.260869565217376,
        y: 8.369565217391312
      },
      point_4: {
        x: -17.77173913043478,
        y: 9.673913043478251
      }
    }
  };
  this.players = {
    LEFT: {
      side: 'LEFT',
      roundScore: 0,
      type: 'AI',
      bodyY: 0,
    },
    RIGHT: {
      side: 'RIGHT',
      roundScore: 0,
      type: 'HUMAN',
      bodyY: 0
    }
  };
  this.playerLeft = this.players.LEFT;
  this.playerRight = this.players.RIGHT;
  this.phyEngine = Matter.Engine.create();
  this.phyEngine.positionIterations = 50;
  this.phyEngine.velocityIterations = 50;
  this.phyEngine.constrainIterations = 50;
  this.physics = this.phyEngine.world;
  this.physics.gravity.x = 0.0;
  this.physics.gravity.y = 0.0;
  this.physics.gravity.scale = 0.0;
  this.collisionDefaultCategory = 0x0001;
  this.collisionBulletCategory = 0x0003;
  this.collisionBallCategory = 0x0002;
  Matter.Resolver._restingThresh = 0.001;
  Matter.Events.on(this.phyEngine, "collisionEnd", function(data) {
    // console.log(pairs, pairs.length);
    handleCollision(data.pairs, 'end');
  });
  Matter.Events.on(this.phyEngine, "collisionStart", function(data) {
    // console.log(pairs, pairs.length);
    handleCollision(data.pairs, 'start');
  });

  function handleCollision(pairs, type) {
    pairs.forEach(function(pair) {
      var bodyA = pair.bodyA;
      var bodyB = pair.bodyB;

      while (bodyA && !bodyA.fieldObject) {
        if (!bodyA.parent || bodyA.parent.id == bodyA.id) {
          bodyA = null;
          break;
        }

        bodyA = bodyA.parent;
      }

      while (bodyB && !bodyB.fieldObject) {
        if (!bodyB.parent || bodyB.parent.id == bodyB.id) {
          bodyB = null;
          break;
        }

        bodyB = bodyB.parent;
      } // console.log('C:', bodyA, bodyB, pair);


      if (bodyA && bodyA.fieldObject && bodyB && bodyB.fieldObject) {
        if (type === 'start') self.collisionStart(bodyA.fieldObject, bodyB.fieldObject, type);
        else self.collision(bodyA.fieldObject, bodyB.fieldObject, type);
      } // self.collision(objectA, objectB);

    });
  } // var keyUp = Util.keyboard({
  //   code: 'P'.charCodeAt(0),
  //   keyDownHandler: function () {
  //     const v = !self.isDebugDraw;
  //     self.isDebugDraw = v;
  //     self.debugDraw.visible = v;
  //   },
  //   keyUpHandler: function () {
  //   }
  // });
  // var keyC = Util.keyboard({
  //   code: 'C'.charCodeAt(0),
  //   keyDownHandler: function () {
  //     // self.clear();
  //     // self.placeNewBall();
  //     // self.gameComplete();
  //     // createBonus(self, { type: 'GRAVITY_WELL' });
  //     // createBonus(self, { type: 'PADDLE_SIZE' });
  //     // createBonus(self, { type: 'PADDLE_SPEED' });
  //     // createBonus(self, { type: 'KITTY' });
  //     // createBonus(self, { type: 'NEW_BALL' });
  //   },
  //   keyUpHandler: function () {
  //   }
  // });


  function createBonusKey(c, type) {
    var key = Util.keyboard({
      code: c.charCodeAt(0),
      keyDownHandler: function keyDownHandler() {
        createBonus(self, {
          type: type
        });
      },
      keyUpHandler: function keyUpHandler() {}
    });
  } // createBonusKey('Z', 'PADDLE_SIZE');
  // createBonusKey('X', 'SHOOT');
  // createBonusKey('C', 'NEW_BALL');
  // createBonusKey('V', 'KITTY');
  // createBonusKey('B', 'GRAVITY_WELL');
  // createBonusKey('N', 'BALL_MAX_SPEED');
  // createBonusKey('M', 'INVISIBLE_AREA');
  // createBonusKey('1', 'INVISIBLE_WALL');


  this.containerBack = new PIXI.Container();
  this.addChild(this.containerBack); // this.containerBack.interactive = true;
  // this.containerBack.interactiveChildren = true;
  // this.containerBack.alpha = 0.2;
  // this.interactive = true;
  // this.interactiveChildren = true;

  this.bakGroundImage = Util.createSprite({
    parent: this,
    texture: 'GameBackGround',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.375,
    scaleY: 0.475
  });

  this.centerLine = Util.createSprite({
    parent: this,
    texture: 'Separator-Line',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.5,
    scaleY: 0.5
  });

  this.containerGravityHole = new PIXI.Container();
  this.addChild(this.containerGravityHole);
  this.containerScore = new PIXI.Container();
  this.addChild(this.containerScore);
  this.contaierObstacles = new PIXI.Container();
  this.addChild(this.contaierObstacles);
  this.contaierObjects = new PIXI.Container();
  this.addChild(this.contaierObjects);
  this.gameStartText = new GameStartText();
  this.addChild(this.gameStartText); // this.containerGravityHole.alpha = this.contaierObstacles.alpha = this.containerBack.alpha = 0.3;

  this.controlAreaLeft = new ControlArea(this, -this.config.FIELD_WIDTH / 2, 0, 600, this.config.FIELD_HEIGHT + 100);
  this.controlAreaRight = new ControlArea(this, this.config.FIELD_WIDTH / 2, 0, 600, this.config.FIELD_HEIGHT + 100);
  this.objects = [];
  this.debugDraw = new Util.MatterDebugDraw(this.physics, this);
  this.debugDraw.visible = this.isDebugDraw = false;
  this.debugDraw.interactive = false;
  this.wallTop = new NORD.Field.Wall(this, {
    type: 'BORDER',
    x: 0,
    y: -this.config.FIELD_HEIGHT / 2 - this.config.WALLS_HEIGHT / 2,
    width: this.config.FIELD_WIDTH,
    height: this.config.WALLS_HEIGHT
  });
  this.wallBot = new NORD.Field.Wall(this, {
    type: 'BORDER',
    x: 0,
    y: this.config.FIELD_HEIGHT / 2 + this.config.WALLS_HEIGHT / 2,
    width: this.config.FIELD_WIDTH,
    height: this.config.WALLS_HEIGHT
  });
  this.paddleLeft = new NORD.Field.Paddle(this, 'LEFT');
  this.paddleRight = new NORD.Field.Paddle(this, 'RIGHT');
  this.paddles = {
    'LEFT': this.paddleLeft,
    'RIGHT': this.paddleRight
  };
  this.ball = new NORD.Field.Ball(this, 0, 0);
  this.ball1 = new NORD.Field.Ball(this, 0, 0);
  this.ball2 = new NORD.Field.Ball(this, 0, 0);
  this.ball3 = new NORD.Field.Ball(this, 0, 0);
  this.balls = [this.ball, this.ball1, this.ball2, this.ball3];
  this.ballMaxSpeed = this.config.ballMaxSpeed.value;
  this.ballMaxSpeedBoostTimer = 0;
  this.ballSize = this.config.ballSize.value;
  this.ballSpeedUpDisable = false;

  this.sideImage = Util.createSprite({
    parent: this,
    texture: 'Game-Board',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.375,
    scaleY: 0.475
  });

  this.state = new Util.StateStore();
  this.state.setState({
    gamePhase: 'NONE'
  });
  this.state.setState({
    pause: 'FALSE'
  });
  this.state.on('pause_change', function(data) {}, this);
  this.roundGenerator = new RoundGenerator(this);
  NORD.app.on('update_before', this.updateBefore, this);
  NORD.app.on('update', this.update, this);
  NORD.app.on('update_after', this.updateAfter, this);


};

NORD.Field.prototype = Object.create(PIXI.Container.prototype);
NORD.Field.prototype.constructor = NORD.Field;

NORD.Field.prototype.getBallSpeedUpK = function(name) {
  var slowDown = 1.0; // if (NORD.game.config.dificulty == 'easy') {
  //   slowDown = this.config.easyBallSlowK.value;
  // }
  // console.log(NORD.game.config.dificulty, slowDown);

  if (name == 'BUMPER') {
    return this.config.bumperModeSpeedUp.value * slowDown;
  } else if (name == 'INVISIBLE_WALL') {
    return this.config.obstacleInvisibleWallSpeedUpK.value * slowDown;
  } else if (name == 'PADDLE') {
    return this.config.ballSpeedUpK.value * slowDown;
  } else if (name == 'FIRE_ZONE') {
    return this.config.fireZoneModeSpeedUp.value * slowDown;
  }

  return 1.0;
};

NORD.Field.prototype.setGameGraphicsAlpha = function(alpha) {
  var isTween = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var containers = [this.containerBack, this.contaierObstacles, this.containerGravityHole, this.roundGenerator.containerGraphics];
  var time = 10 / 30;
  containers.forEach(function(c) {
    if (!isTween) {
      c.alpha = alpha;
    } else {
      TweenMax.to(c, time, {
        alpha: alpha,
        ease: Power1.easeOut
      });
    }
  });

  if (isTween && callback) {
    TweenMax.delayedCall(time, callback);
  }
};

NORD.Field.prototype.addObject = function(obj) {
  this.objects.push(obj);
};

NORD.Field.prototype.removeObject = function(obj) {
  var n = this.objects.indexOf(obj);
  if (n !== -1) this.objects.splice(n, 1); // console.log('Remove ob:', obj, [...this.objects]);
};

NORD.Field.prototype.setPause = function(isPause) {
  this.state.setState({
    pause: isPause ? 'TRUE' : 'FALSE'
  });
};

NORD.Field.prototype.getActiveBalls = function() {
  var balls = this.balls.filter(function(ball) {
    return ball.state === 'IN_GAME';
  });
  return balls;
};

NORD.Field.prototype.getFreeBall = function() {
  var balls = this.balls.filter(function(ball) {
    return ball.state === 'WAIT';
  });
  return balls[0] || null;
};

NORD.Field.prototype.placeNewBall = function(dir) {
  if (MultiplayerStarted)
    if (!IsHost)
      return;

  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ball = this.getFreeBall();
  if (ball === null) return;
  var ballPosition = data.x == null && data.y == null ? this.board.getBallStartPosition() : {
    x: x,
    y: y
  };
  ball.init(ballPosition.x, ballPosition.y);

  if (MultiplayerStarted) {
    if (Ball == null) Ball = ball;
    else Ball1 = ball;
  }

  //sushant
  if (MultiplayerStarted) {
    if (IsHost) {
      ball.multiBallImpulse(dir, data.speed);
    }
  } else {
    if (data.delayBlinkTime) ball.delayImpulse(data.delayBlinkTime, dir, data.speed);
    else ball.startImpulse(dir, data.speed);
  }

  return ball;
};

NORD.Field.prototype.isGame = function() {
  if (this.state.getState().gamePhase !== 'GAME' || this.state.getState().pause !== 'FALSE' || this.isGoalState) return false;
  return true;
};

NORD.Field.prototype.clear = function() {
  this.board.clear(); // this.ball.clear();

  this.gameStartText.clear();

  if (this.bonusGenerator) {
    this.bonusGenerator.destroy();
    this.bonusGenerator = null;
  }

  if (this.obstacleGenerator) {
    this.obstacleGenerator.destroy();
    this.obstacleGenerator = null;
  }

  if (this.roundGenerator) {
    this.roundGenerator.clear(); // this.roundGenerator = null;
  }

  this.balls.forEach(function(ball) {
    ball.clear();
  });
  this.paddleLeft.clear();
  this.paddleRight.clear();
  this.isGoalState = false;
  this.clearOthersObjects();
  this.ballMaxSpeed = this.config.ballMaxSpeed.value;
  this.ballMinSpeed = this.config.ballMinSpeed.value;
  this.ballMaxSpeedBoostTimer = 0;
  this.paddleLeft.setTut(false);
  this.paddleRight.setTut(false);
  this.setGameGraphicsAlpha(1.0);
  this.state.setState({
    gamePhase: 'NONE'
  });
}; // NORD.Field.prototype.clearFull = function()
// {
//   this.clearFull();
// }


NORD.Field.prototype.clearOthersObjects = function() {
  var _this2 = this;

  var isHard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var objectsForRemove = [];
  this.objects.forEach(function(object) {
    if (object === _this2.paddleLeft || object === _this2.paddleRight || object.wallType === 'BORDER' || object.type === 'BALL' || !isHard && object.ignoreClear) return;
    objectsForRemove.push(object);
  });

  while (objectsForRemove.length) {
    objectsForRemove[0].destroy();
    objectsForRemove.splice(0, 1);
  }
};

NORD.Field.prototype.initGame = function(createBoard) {
  this.gameStartText.clear();
  this.playerLeft.roundScore = 0;
  this.playerRight.roundScore = 0;
  this.playerLeft.type = NORD.game.config.players == 'two' ? 'HUMAN' : 'AI';
  var dificultyMap = {
    easy: 2,
    medium: 4,
    hard: 6
  };
  this.dificulty = dificultyMap[NORD.game.config.dificulty];
  if (NORD.game.config.mode === 'action' && NORD.game.config.dificulty !== 'hard') this.dificulty -= 1;
  this.dificulty = Math.max(this.dificulty, 1); // console.log('Dificulty:', this.dificulty);

  this.roundN = 0;
  this.createBoard = createBoard;
  this.board = this.createBoard();
  this.board.initGame(this); // if(NORD.game.config.mode === 'action')
  // {

  this.roundGenerator.clear();
  this.roundGenerator.initGame(NORD.game.config.mode); // }

  this.setGameGraphicsAlpha(1.0);
  this.state.setState({
    gamePhase: 'INIT'
  });
  this.emit('init_game');
  this.initRound();
};

NORD.Field.prototype.startGame = function() {
  var _this3 = this;

  // if(NORD.game.config.players !== 'one' && !NORD.game.isControlTutorial)
  if (NORD.game.config.players !== 'one' && NORD.app.platform !== 'mobile') {
    this.paddleLeft.setTut(true);
    this.paddleRight.setTut(true); // NORD.game.isControlTutorial = true;
  }

  if (NORD.game.config.players == 'one' && NORD.app.platform !== 'mobile' && !NORD.game.config.isControlVSCompTutorial) {
    // this.paddleLeft.setTut(true);
    this.paddleRight.setTut(true);
    NORD.game.config.isControlVSCompTutorial = true;
    NORD.game.saveConfig();
  }

  if (NORD.game.config.mode !== 'classic') {
    if (!NORD.game.config.isActionPlayed) {
      NORD.game.config.isActionPlayed = true;
      NORD.game.saveConfig();
    }
  } // console.log('Start game!');


  RoundVariable = _this3;
  this.gameStartText.play(function() {
    TweenMax.delayedCall(0.3, function() {
      // this.roundGenerator.showActionModeName(()=>
      // {
      //
      // });
      _this3.emit('game_start');

      _this3.board.startGame();

      _this3.startRound();
    });
    TweenMax.delayedCall(2.3, function() {
      _this3.paddleLeft.setTut(false);

      _this3.paddleRight.setTut(false);
    });
  }); // this.board.startGame();
  // this.startRound();
};

NORD.Field.prototype.goal = function(player) {
  var _this4 = this;

  var ball = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var isEndRound = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!this.isGame()) {
    return;
  } // console.log('Goal:', player);


  if (!config.muteGoal) {
    if (player.type === 'HUMAN') NORD.audioManager.playAudio('player_goal');
    else if (player.type === 'AI') NORD.audioManager.playAudio('computer_goal');
  }

  player.roundScore++;

  if (NORD.game.config.players == 'one' && NORD.game.config.mode !== 'classic') {
    NORD.app.apiCallback('statistics_point', {
      roundMode: this.roundMode,
      win: player.type === 'AI' ? 'computer' : 'player'
    });
  }

  this.isGoalState = true;
  this.emit('goal', {
    player: player,
    ball: ball
  });

  if (ball) {
    ball.clear();
  }

  this.setGameGraphicsAlpha(0.0, true, function() {
    _this4.isGoalState = false;

    if (player.roundScore >= _this4.config.scoresForWin.value) {
      _this4.gameComplete(player);
    } else {
      _this4.roundComplete();
    }
  }); // if(player.roundScore >= this.config.scoresForWin.value)
  // {
  //   this.gameComplete(player);
  // }
  // else
  // {
  //   this.roundComplete();
  // }
};

NORD.Field.prototype.getRankType = function() {};


NORD.Field.prototype.getRankNumber = function() {

  if (this.rankNumber == -1) {

  }
};


NORD.Field.prototype.roundComplete = function() {
  var _this5 = this;

  // console.log('Round complete!');
  this.roundN++;

  var end = function end() {
    TweenMax.killAll(false, false, true);

    _this5.board.roundComplete();

    _this5.state.setState({
      gamePhase: 'ROUND_COMPLETE'
    });

    _this5.emit('round_complete');

    _this5.paddleLeft.setTut(false);

    _this5.paddleRight.setTut(false);
  };

  if (this.bonusGenerator) {
    this.bonusGenerator.destroy();
    this.bonusGenerator = null;
  }

  if (this.roundGenerator) {
    this.roundGenerator.roundComplete();
  } // this.setGameGraphicsAlpha(0.0, true, () =>
  // {
  //   end();
  // });


  end();
};

NORD.Field.prototype.initRound = function() {
  if (!(this.state.getState().gamePhase === 'INIT' || this.state.getState().gamePhase === 'ROUND_COMPLETE')) return; // console.log('Round ready!');

  this.isGoalState = false;
  TweenMax.killAll(true, true, true);
  this.balls.forEach(function(ball) {
    ball.clear();
  });
  this.clearOthersObjects(false);
  this.board.initRound();
  this.paddleLeft.clear();
  this.paddleLeft.init(this.playerLeft);
  this.paddleRight.clear();
  this.paddleRight.init(this.playerRight);

  if (NORD.game.config.mode === 'action') {
    this.ballMinSpeed = this.config.ballMinSpeedAction.value;
    this.ballMaxSpeed = this.config.ballMaxSpeedAction.value;
  } else {
    this.ballMinSpeed = this.config.ballMinSpeed.value;
    this.ballMaxSpeed = this.config.ballMaxSpeed.value;
  }

  this.ballMaxSpeedBoostTimer = 0;
  this.ballSize = 18; //this.config.ballSize.value;
  this.ballSpeedUpDisable = false;

  if (this.roundGenerator) {
    this.roundGenerator.initRound();
  }

  var ballPosition = this.board.getBallStartPosition();
  this.ball.init(ballPosition.x, ballPosition.y);
  this.setGameGraphicsAlpha(1.0);

  LeftPaddle = this.paddleLeft;
  RightPaddle = this.paddleRight;
  if (MultiplayerStarted) {
    LeftPaddle.paddleGettingTeleported = false;
    LeftPlayer = this.playerLeft;
    RightPlayer = this.playerRight;
    Ball = this.ball;

    // TweenMax.to(LeftPaddle.body, 1, {
    //   pixi: {
    //     x: 300,
    //   },
    //   // repeat: -1
    // });

    // if (LeftPaddle.tweenSpeed != null)
    //       LeftPaddle.tweenSpeed.kill();
    //     LeftPaddle.tweenSpeed = TweenMax.to(LeftPaddle.body.position, 2, {
    //       x: LeftPaddle.body.position.x,
    //       y: serverObj.paddlePositionY
    //     });



  }
  RightPaddle = this.paddleRight;


  this.state.setState({
    gamePhase: 'ROUND_READY'
  });
  this.emit('round_ready');
};

NORD.Field.prototype.startRound = function() {
  var _this6 = this;
  if (this.state.getState().gamePhase !== 'ROUND_READY') return; // console.log('Round start!');

  if (this.roundGenerator) {
    // this.roundGenerator.startRound();
    this.roundGenerator.showActionModeName(function() {
      _this6.board.startRound();

      var ballDir = Util.randomElement(['LEFT', 'RIGHT']);

      _this6.ball.startImpulse(ballDir);

      NORD.audioManager.playAudio('ball_start');

      _this6.roundGenerator.startRound();

      _this6.state.setState({
        gamePhase: 'GAME'
      });

      _this6.emit('round_start');
    });
    return;
  }

  this.board.startRound();
  var ballDir = Util.randomElement(['LEFT', 'RIGHT']);
  this.ball.startImpulse(ballDir);
  NORD.audioManager.playAudio('ball_start');

  if (this.roundGenerator) {
    this.roundGenerator.startRound();
    this.roundGenerator.showActionModeName(function() {});
  }

  this.state.setState({
    gamePhase: 'GAME'
  });
  this.emit('round_start');
};

NORD.Field.prototype.gameComplete = function(playerWin) {
  var _this7 = this;

  // console.log('Game complete!, Win:', playerWin);
  if (this.bonusGenerator) {
    this.bonusGenerator.destroy();
    this.bonusGenerator = null;
  }

  if (this.obstacleGenerator) {
    this.obstacleGenerator.destroy();
    this.obstacleGenerator = null;
  }

  if (this.roundGenerator) {
    this.roundGenerator.roundComplete(); // this.roundGenerator.clear();
    // this.roundGenerator = null;
  }

  this.board.gameComplete();
  this.state.setState({
    gamePhase: 'GAME_COMPLETE'
  });
  NORD.game.config.gamesCount = Math.min(999, NORD.game.config.gamesCount + 1);
  NORD.game.saveConfig();
  var winner = 'NONE';
  var playerLeftScore = this.playerLeft.roundScore;
  var playerRightScore = this.playerRight.roundScore;

  if (this.playerLeft.type === 'AI') {
    if (playerLeftScore > playerRightScore) {
      winner = 'AI';
      NORD.app.apiCallback('statistics', 'computer');
    } else {
      winner = 'PLAYER';
      NORD.app.apiCallback('statistics', 'player');
    }
  } else if (playerLeftScore > playerRightScore) {
    winner = 'PLAYER_LEFT';
    NORD.app.apiCallback('statistics', 'player_left');
  } else {
    winner = 'PLAYER_RIGHT';
    NORD.app.apiCallback('statistics', 'player_right');
  }

  //sushant
  // if (MultiplayerStarted) {
  //   if (playerRightScore > playerLeftScore)
  //     winner = DemoLoadFunction._myActor.name;
  //   else {
  //     var actorNum = DemoLoadFunction._myActor.actorNr;
  //     for (var i = 1; i <= 2; i++) {
  //       if (DemoLoadFunction.actors[i] != undefined)
  //         if (DemoLoadFunction.actors[i].actorNr != actorNum)
  //           winner = DemoLoadFunction.actors[i].name;
  //     }
  //   }
  // }
  //sushant

  /**Shun--> */
  if (MultiplayerStarted) {
    if (playerRightScore > playerLeftScore) {
      winner = NORD.playersName.playerName;
      NORD.App.playerController.increasePlayerRank();
    } else
      winner = NORD.playersName.opponentName;
  }

  TweenMax.delayedCall(this.config.endGamePanelDelay.value, function() {
    if (playerWin.type === 'HUMAN') NORD.audioManager.playAudio('player_win');
    else if (playerWin.type === 'AI') NORD.audioManager.playAudio('computer_win');

    _this7.emit('game_complete', {
      winner: winner,
      playerLeftScore: playerLeftScore,
      playerRightScore: playerRightScore
    });
  });
};

NORD.Field.prototype.collision = function(objectA, objectB) {
  if (objectA.type === 'BALL' && objectB.type === 'WALL') this.ballHitWall(objectA, objectB);
  if (objectB.type === 'BALL' && objectA.type === 'WALL') this.ballHitWall(objectB, objectA);
  if (objectA.type === 'BALL' && objectB.type === 'PADDLE') this.ballHitPaddle(objectA, objectB);
  if (objectB.type === 'BALL' && objectA.type === 'PADDLE') this.ballHitPaddle(objectB, objectA);

  if (objectA.type === 'BALL' && objectB.type === 'BALL') {
    objectA.ballHitBall(objectB);
    objectB.ballHitBall(objectA);
    NORD.audioManager.playAudio('wall_hit_ball');
  } // if(objectA.type === 'PADDLE_BULLET' && objectB.type === 'PADDLE') this.bulletHitPaddle(objectA, objectB);
  // if(objectB.type === 'PADDLE_BULLET' && objectA.type === 'PADDLE') this.bulletHitPaddle(objectB, objectA);

};

NORD.Field.prototype.collisionStart = function(objectA, objectB) {
  if (objectA.type === 'PADDLE_BULLET' && objectB.type === 'PADDLE') this.bulletHitPaddle(objectA, objectB);
  if (objectB.type === 'PADDLE_BULLET' && objectA.type === 'PADDLE') this.bulletHitPaddle(objectB, objectA);
};

NORD.Field.prototype.ballHitWall = function(ball, wall) {
  // console.log('Ball hit wall', ball, wall);
  ball.hitWall(wall);
};

NORD.Field.prototype.ballHitPaddle = function(ball, paddle) {
  // console.log('Ball hit paddle', ball, paddle);
  //sushant
  if (MultiplayerStarted) {
    if (paddle.side == "RIGHT") {
      ball.hitPaddle(paddle);
    } else {
      console.log("---------------------------------------------------");
    }
  } else {
    ball.hitPaddle(paddle);
  }
  //sushant
};

NORD.Field.prototype.bulletHitPaddle = function(bullet, paddle) {
  bullet.hitPaddle(paddle);
};

NORD.Field.prototype.updateBefore = function() {
  if (!this.isGame()) return;
  var fixedTimeStep = 1 / 60;
  Matter.Engine.update(this.phyEngine, fixedTimeStep * 1000, 1.0);

  if (this.ballMaxSpeedBoostTimer > 0) {
    this.ballMaxSpeedBoostTimer--;

    if (this.ballMaxSpeedBoostTimer === 0) {
      this.ballMaxSpeed = this.config.ballMaxSpeed.value;
    }
  }
};

NORD.Field.prototype.update = function() {};

NORD.Field.prototype.ballMaxSpeedBoost = function(time, ballMaxSpeed) {
  this.ballMaxSpeedBoostTimer = Math.max(this.ballMaxSpeedBoostTimer, time * 60);

  if (this.ballMaxSpeedBoostTimer > 0) {
    this.ballMaxSpeed = ballMaxSpeed;
  }
};

NORD.Field.prototype.updateAfter = function() {
  if (this.debugDraw && this.isDebugDraw) this.debugDraw.draw();
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.FieldObject = function(field) {
  PIXI.Container.call(this);
  this.field = field;
  this.type = 'NONE';
  this.body = null;
  this.isExist = true;
  if (!this.container) this.container = this.field.contaierObjects;
  this.container.addChild(this);
  this.field.addObject(this);
  NORD.app.on('update', this.update, this);
};

NORD.Field.FieldObject.prototype = Object.create(PIXI.Container.prototype);
NORD.Field.FieldObject.prototype.constructor = NORD.Field.FieldObject;

NORD.Field.FieldObject.prototype.update = function() {
  if (!this.isExist) return;
  this.updatePosition();
};

NORD.Field.FieldObject.prototype.updatePosition = function() {
  if (this.body !== null) {
    this.x = this.body.position.x;
    this.y = this.body.position.y;
  }
};

NORD.Field.FieldObject.prototype.destroy = function() {
  if (!this.isExist) return;
  this.isExist = false;
  this.field.removeObject(this);
  if (this.parent) this.parent.removeChild(this);
  this.field = null;
  NORD.app.removeListener('update', this.update, this);
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.Board = function(config) {
  this.name = config.name; // console.log('Board:', config);
};

NORD.Field.Board.prototype.initGame = function(field) {
  this.field = field;
};

NORD.Field.Board.prototype.startGame = function() { // console.log('BBB: Start Game')
};

NORD.Field.Board.prototype.gameComplete = function() { // console.log('BBB: Game Complete')
};

NORD.Field.Board.prototype.initRound = function() { // console.log('BBB: Init Round')
};

NORD.Field.Board.prototype.startRound = function() { // console.log('BBB: Start Round')
};

NORD.Field.Board.prototype.roundComplete = function() { // console.log('BBB: Round Complete')
};

NORD.Field.Board.prototype.clear = function() { // console.log('BBB: Clear')
};

NORD.Field.Board.prototype.getBallStartPosition = function() {
  return {
    x: 0,
    y: 0
  };
}; //==========================================================================================================================================//


NORD.Field.BoardClassic = function(config) {
  NORD.Field.Board.call(this, config);
};

NORD.Field.BoardClassic.prototype = Object.create(NORD.Field.Board.prototype);
NORD.Field.BoardClassic.prototype.constructor = NORD.Field.BoardClassic;

NORD.Field.BoardClassic.prototype.getFreeAreasData = function() {
  var startX = -200;
  var startY = -200;
  var width = Math.abs(startX) * 2;
  var height = Math.abs(startY) * 2;
  var area = {
    x: startX,
    y: startY,
    width: width,
    height: height
  };
  var blockAreaLine = {
    x: -25,
    y: -300,
    width: 50,
    height: 600
  };
  var areasData = {
    area: area,
    blockAreas: [blockAreaLine]
  };
  return areasData;
}; //==========================================================================================================================================//


NORD.Field.BoardDiamond = function(config) {
  NORD.Field.Board.call(this, config);
};

NORD.Field.BoardDiamond.prototype = Object.create(NORD.Field.Board.prototype);
NORD.Field.BoardDiamond.prototype.constructor = NORD.Field.BoardDiamond;

NORD.Field.BoardDiamond.prototype.initRound = function() {
  NORD.Field.Board.prototype.initRound.call(this);

  if (!this.wallDiamond) {
    this.diamondSize = this.field.config.boardDiamonSize.value;
    this.wallDiamond = new NORD.Field.Wall(this.field, {
      type: 'DIAMOND',
      ballNoCorrectVelocity: true,
      x: 0,
      y: 0,
      width: this.diamondSize,
      height: this.diamondSize
    });
    this.wallDiamond.ignoreClear = true;
    this.field.config.boardDiamonSize.on('change', this.updateSize, this); // console.log('Wall created!')
  }
};

NORD.Field.BoardDiamond.prototype.updateSize = function() {
  this.wallDiamond.setSize({
    size: this.field.config.boardDiamonSize.value
  });
};

NORD.Field.BoardDiamond.prototype.getFreeAreasData = function() {
  // this.wallDiamond.
  var startX = -200;
  var startY = -200;
  var width = Math.abs(startX) * 2;
  var height = Math.abs(startY) * 2;
  var diamondWH = Math.sqrt(this.diamondSize * this.diamondSize + this.diamondSize * this.diamondSize) + 50;
  var area = {
    x: startX,
    y: startY,
    width: width,
    height: height
  };
  var blockArea = {
    x: -diamondWH / 2,
    y: -diamondWH / 2,
    width: diamondWH,
    height: diamondWH
  };
  var blockAreaLine = {
    x: -25,
    y: -300,
    width: 50,
    height: 600
  };
  var areasData = {
    area: area,
    blockAreas: [blockArea, blockAreaLine]
  };
  return areasData;
};

NORD.Field.BoardDiamond.prototype.getBallStartPosition = function() {
  //sushant

  if (MultiplayerStarted) {
    return {
      x: 0,
      y: MainMenuLocation.ballDiamondGeneratedPos
    };
  } else {
    return {
      x: 0,
      y: 140 * (Util.randomRangeInt(0, 1) == 0 ? 1 : -1)
    };
  }
};

NORD.Field.BoardDiamond.prototype.clear = function() {
  NORD.Field.Board.prototype.clear.call(this);
  this.field.config.boardDiamonSize.removeListener('change', this.updateSize, this);
}; //==========================================================================================================================================//


NORD.Field.BoardPlanks = function(config) {
  NORD.Field.Board.call(this, config);
};

NORD.Field.BoardPlanks.prototype = Object.create(NORD.Field.Board.prototype);
NORD.Field.BoardPlanks.prototype.constructor = NORD.Field.BoardPlanks;

NORD.Field.BoardPlanks.prototype.initGame = function(field) {
  NORD.Field.Board.prototype.initGame.call(this, field);
};

NORD.Field.BoardPlanks.prototype.initRound = function() {
  NORD.Field.Board.prototype.initRound.call(this);

  if (!this.wallUp) {
    this.plankWidth = this.field.config.boardPlanksWidth.value;
    this.plankHeight = this.field.config.boardPlanksHeight.value;
    this.plankShift = this.field.config.boardPlanksShift.value;
    this.wallUp = new NORD.Field.Wall(this.field, {
      type: 'RECT',
      x: 0,
      y: -this.plankShift,
      width: this.plankWidth,
      height: this.plankHeight
    });
    this.wallUp.ignoreClear = true;
    this.wallDown = new NORD.Field.Wall(this.field, {
      type: 'RECT',
      x: 0,
      y: this.plankShift,
      width: this.plankWidth,
      height: this.plankHeight
    });
    this.wallDown.ignoreClear = true;
    this.field.config.boardPlanksWidth.on('change', this.updateSize, this);
    this.field.config.boardPlanksHeight.on('change', this.updateSize, this);
    this.field.config.boardPlanksShift.on('change', this.updateSize, this);
  }
};

NORD.Field.BoardPlanks.prototype.updateSize = function() {
  this.wallUp.setSize({
    width: this.field.config.boardPlanksWidth.value,
    height: this.field.config.boardPlanksHeight.value,
    y: -this.field.config.boardPlanksShift.value
  });
  this.wallDown.setSize({
    width: this.field.config.boardPlanksWidth.value,
    height: this.field.config.boardPlanksHeight.value,
    y: this.field.config.boardPlanksShift.value
  });
};

NORD.Field.BoardPlanks.prototype.startRound = function() {
  NORD.Field.Board.prototype.startRound.call(this);
};

NORD.Field.BoardPlanks.prototype.getFreeAreasData = function() {
  var startX = -200;
  var startY = -200;
  var width = Math.abs(startX) * 2;
  var height = Math.abs(startY) * 2;
  var plankWidth = this.plankWidth + 50;
  var plankHeight = this.plankHeight + 50;
  var area = {
    x: startX,
    y: startY,
    width: width,
    height: height
  };
  var blockArea1 = {
    x: -plankWidth / 2,
    y: -this.plankShift - plankHeight / 2,
    width: plankWidth,
    height: plankHeight
  };
  var blockArea2 = {
    x: -plankWidth / 2,
    y: this.plankShift - plankHeight / 2,
    width: plankWidth,
    height: plankHeight
  };
  var blockAreaLine = {
    x: -25,
    y: -300,
    width: 50,
    height: 600
  };
  var areasData = {
    area: area,
    blockAreas: [blockArea1, blockArea2, blockAreaLine]
  };
  return areasData;
};

NORD.Field.BoardPlanks.prototype.clear = function() {
  NORD.Field.Board.prototype.clear.call(this);
  this.field.config.boardPlanksWidth.removeListener('change', this.updateSize, this);
  this.field.config.boardPlanksHeight.removeListener('change', this.updateSize, this);
  this.field.config.boardPlanksShift.removeListener('change', this.updateSize, this);
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.PaddleController = function(field, paddle) {
  this.isExist = true;
  this.field = field;
  this.paddle = paddle;
  NORD.app.on('update', this.update, this);
};

NORD.Field.PaddleController.prototype.update = function() {
  if (!this.isExist) return;
  if (!this.field.isGame()) return;
  this.updatePosition();
};

NORD.Field.PaddleController.prototype.updatePosition = function() {};

NORD.Field.PaddleController.prototype.destroy = function() {
  if (!this.isExist) return;
  this.isExist = false;
  this.field = null;
  this.paddle = null;
  NORD.app.removeListener('update', this.update, this);
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.PaddleControllerAI = function(field, paddle) {
  NORD.Field.PaddleController.call(this, field, paddle); // this.dir = 'up';

  var self = this;
  this.opponentPaddle = this.paddle.side === 'LEFT' ? field.paddleRight : field.paddleLeft;
  this.strategy = null;
  this.defendCount = 0;
  this.shootDelay = 0;

  this.createStrategyIdle = function() {
    var strategy = {
      type: 'IDLE'
    };
    strategy.targetY = self.paddle.body.position.y;
    strategy.timer = new Util.FrameTimer(40);
    strategy.timer.on('tick', function() {
      // const ball = self.field.ball;
      // const ballInfo = self.getBallInfo(ball);
      //
      // // strategy.targetY = ball.position.y;
      // strategy.targetY = ballInfo.predictForward[2].y;
      //
      // console.log('FFF:', strategy.targetY);
      var tY = Util.randomRange(-200, 200);
      strategy.targetY = tY;
    }, self);

    strategy.update = function() {
      // const ball = self.field.ball;
      // const ballInfo = self.getBallInfo(ball);
      // strategy.targetY = ball.position.y;
      if (self.shootDelay > 0) self.shootDelay--;

      if (self.paddle.shootsCount > 0 && self.shootDelay === 0) {
        var distanceToOpponent = Math.abs(self.paddle.body.position.y - self.opponentPaddle.body.position.y);

        if (distanceToOpponent < self.opponentPaddle.size * 0.55) {
          self.paddle.shoot();
          self.shootDelay = 40;
        }
      } // console.log('FFF:', ballInfo.predictForward, ballInfo.predictBackward);
      // if(ballInfo.distanceY > self.paddle.size * 1.2) strategy.targetY = ballInfo.predictForward[1].y;


      self.paddle.moveToSoft(strategy.targetY);
    };

    strategy.destroy = function() {
      strategy.timer.destroy();
      strategy.timer = null;
    };

    return strategy;
  };

  this.createStrategyDefend = function(ball, isMiss) {
    var strategy = {
      ball: ball,
      type: 'DEFEND'
    }; // const missType = Util.randomRange(0, 1) > 0.75?'D':'U';

    var missType = 'D';
    var isGoD = false;
    var centerY = Util.randomRange(-50, 50);
    strategy.targetY = self.paddle.body.position.y;
    strategy.timer = new Util.FrameTimer(20);
    strategy.timer.on('tick', function() { // const ball = self.field.ball;
      // const ballInfo = self.getBallInfo(ball);
    }, self);

    strategy.update = function() {
      // const ball = strategy.;
      var ballInfo = self.getBallInfo(ball); // strategy.targetY = ballInfo.goalY;

      var distance = Math.abs(self.paddle.body.position.y - ballInfo.goalY);
      var framesToDefend = distance / self.field.config.paddleSpeed.value;
      var dir = ballInfo.goalY < self.paddle.body.position.y ? 'UP' : 'DOWN';
      var overY = ballInfo.goalY + self.paddle.size * 1.2 * (dir == 'UP' ? -1 : 1);
      var isMissD = isMiss && missType == 'D' && overY >= -self.field.config.FIELD_HEIGHT / 2 && overY <= self.field.config.FIELD_HEIGHT / 2;

      var getTP = function getTP(startY, shift) {
        var y1 = startY + shift;
        var y2 = startY - shift;
        var isY1 = y1 >= -self.field.config.FIELD_HEIGHT / 2 && y1 <= self.field.config.FIELD_HEIGHT / 2;
        var isY2 = y2 >= -self.field.config.FIELD_HEIGHT / 2 && y2 <= self.field.config.FIELD_HEIGHT / 2;

        if (isY1 && isY2) {
          return Util.randomRangeInt(0, 1) == 0 ? y1 : y2;
        } else if (isY1) {
          return y1;
        } else if (isY2) {
          return y2;
        }

        return 0;
      }; // console.log('D:', ballInfo)


      if (isGoD) return;

      if (isMiss && isMissD) {
        if (framesToDefend >= ballInfo.goalFramesDelay * 0.6 && !isGoD) {
          isGoD = true;
          strategy.targetY = overY;
        }
      } else if (isMiss && distance > self.paddle.size * 0.2) {
        if (framesToDefend >= ballInfo.goalFramesDelay * 1.1) {
          strategy.targetY = ballInfo.goalY;
        } // else strategy.targetY = getTP(ballInfo.goalY, 100);

      } // else if(framesToDefend >= ballInfo.goalFramesDelay * 0.55 && (ballInfo.distanceX < self.field.config.FIELD_HEIGHT*0.7 ||
      //                                                              ballInfo.goalY >= -self.field.config.FIELD_HEIGHT/2 && ballInfo.goalY <= self.field.config.FIELD_HEIGHT/2))
      else if (framesToDefend >= ballInfo.goalFramesDelay * 0.5) {
        strategy.targetY = ballInfo.goalY;
      } else if (ballInfo.distanceX > self.field.config.FIELD_HEIGHT * 0.5) {
        strategy.targetY = centerY;
      } // let defendY = ball.body.position.y;
      // if(isMiss)
      // {
      //   defendY = ballInfo.predictBackward[1].y;
      // }
      // else
      // {
      //   defendY = ballInfo.predictForward[2].y;
      // }
      //
      // if(Math.abs(defendY - self.paddle.body.position.y) > self.paddle.size/4) strategy.targetY = defendY;


      self.paddle.moveToSoft(strategy.targetY);
    };

    strategy.destroy = function() {
      strategy.timer.destroy();
      strategy.timer = null;
    };

    return strategy;
  };

  this.getBallInfo = function(ball) {
    var distanceY = Math.abs(self.paddle.body.position.y - ball.body.position.y);
    var distanceX = Math.abs(self.paddle.body.position.x - ball.body.position.x);
    var predict = [];
    var predictForward = [];
    var predictBackward = [];
    var goalX = ball.body.position.x;
    var goalY = ball.body.position.y;
    var goalFrames = 0;
    var goalFramesDelay = -1;

    if (ball.attackSide === self.paddle.side) {
      for (var i = 0; i < 1000; i++) {
        goalX += ball.body.velocity.x;
        goalY += ball.body.velocity.y;

        if (goalX < self.paddle.body.position.x) {
          goalFramesDelay = i + 1;
          break;
        }

        if (goalY < -self.field.config.FIELD_HEIGHT / 2 || goalY > self.field.config.FIELD_HEIGHT / 2) {
          goalFramesDelay = i + 1;
          break;
        }
      }
    }

    for (var _i = 0; _i < 10; _i++) {
      var predictK = -15 + 30 * (_i / 9);
      var predictY = ball.body.position.y + ball.body.velocity.y * predictK;
      predict.push({
        y: predictY
      });
      if (predictK >= 0) predictForward.push({
        y: predictY
      });
      if (predictK < 0) predictBackward.push({
        y: predictY
      });
    }

    return {
      ball: ball,
      distanceX: distanceX,
      distanceY: distanceY,
      predict: predict,
      predictForward: predictForward,
      predictBackward: predictBackward,
      goalX: goalX,
      goalY: goalY,
      goalFramesDelay: goalFramesDelay
    };
  };
};

NORD.Field.PaddleControllerAI.prototype = Object.create(NORD.Field.PaddleController.prototype);
NORD.Field.PaddleControllerAI.prototype.constructor = NORD.Field.PaddleControllerAI;

NORD.Field.PaddleControllerAI.prototype.destroy = function() {
  if (!this.isExist) return;

  if (this.strategy) {
    this.strategy.destroy();
    this.strategy = null;
  }

  NORD.Field.PaddleController.prototype.destroy.call(this);
};

NORD.Field.PaddleControllerAI.prototype.getMissK = function(ball) {
  var missK = 0;
  var dificultyName = NORD.game.config.dificulty;
  var dificulties = {
    easy: this.field.config.aiEasyMissK.value,
    medium: this.field.config.aiMediumMissK.value,
    hard: this.field.config.aiHardMissK.value
  };
  var baseK = dificulties[dificultyName];
  var ballSpeedK = 1.0 + (ball.body.speed - this.field.ballMinSpeed) / (this.field.ballMaxSpeed - this.field.ballMinSpeed) * this.field.config.speedDificultyK.value; // const dificultyN = this.field.config.aiTest.value > 0 ? this.field.config.aiTest.value - 1 : this.field.dificulty - 1;
  // const dificulty = dificulties[dificultyN];
  // const ballSpeedK = 1.0 + ((ball.body.speed - this.field.ballMinSpeed) / (this.field.ballMaxSpeed - this.field.ballMinSpeed)) * this.field.config.speedDificultyK.value;
  // // console.log(dificultyN, this.field.config.aiTest.value, this.field.dificulty);
  // let missK = dificulty.missK * ballSpeedK;
  // return missK;

  missK = baseK * ballSpeedK;

  if (NORD.game.config.mode != 'classic') {
    missK *= this.field.config.aiActionMul.value;
  }

  missK = Math.min(missK, 1.0); // console.log('MissK:', missK, baseK, ballSpeedK);

  return missK;
};

NORD.Field.PaddleControllerAI.prototype.updatePosition = function() {
  //sushant
  if (MultiplayerStarted)
    return;
  //sushant
  var _this8 = this;

  NORD.Field.PaddleController.prototype.updatePosition.call(this); // const ball = this.field.ball;

  var ball = null;
  var isAttack = false;
  var activeBalls = this.field.getActiveBalls();
  var attackBalls = activeBalls.filter(function(ball) {
    return ball.invisibleState !== 'INVISIBLE' && ball.attackSide === _this8.paddle.side;
  });
  var dToBall = -1;
  attackBalls.forEach(function(b) {
    var d = Math.abs(_this8.paddle.body.position.x - b.body.position.x);

    if (ball === null || d < dToBall) {
      dToBall = d;
      ball = b;
    }
  });
  if (ball) isAttack = true;
  else {} // if(ball === null) return;

  if (!this.strategy) this.strategy = this.createStrategyIdle();

  if (isAttack && (this.strategy.type === 'IDLE' || this.strategy.type === 'DEFEND' && this.strategy.ball !== ball)) {
    this.strategy.destroy();
    this.defendCount++;
    var missK = this.getMissK(ball);
    var startImmortal = NORD.game.config.dificulty == 'hard' ? 2 : 1;
    var rnd = Util.randomRange(0, 1.0);
    var isMiss = this.defendCount > startImmortal && rnd <= missK; // console.log('IsMiss:', isMiss);
    // console.log('MissK:', missK, 'IsMiss:', isMiss, rnd, dificulty);

    this.strategy = this.createStrategyDefend(ball, isMiss);
  } else if (!isAttack && this.strategy.type === 'DEFEND') {
    this.strategy.destroy();
    this.strategy = this.createStrategyIdle();
  } // console.log('S:', this.strategy.type)

  if (!this.paddle.isStunned)
    this.strategy.update(); // const ball = this.field.ball;
  //
  // const predictK = -15 + 30 * (this.field.config.aiEasy.value/10);
  // console.log('P:', predictK);
  // const ballPY = ball.body.position.y + ball.body.velocity.y * predictK;
  //
  // const distanceY = Math.abs(this.paddle.body.position.y - ball.body.position.y);
  // const distanceX = Math.abs(this.paddle.body.position.x - ball.body.position.x);
  //
  // if(distanceX > this.field.config.FIELD_WIDTH*0.65 && distanceY > this.paddle.size*2) this.paddle.moveToSoft(ball.body.position.y);
  // // else if(distanceX <= this.field.config.FIELD_WIDTH*0.6 && distanceY > this.paddle.size/2 * 0.3 && ball.attackSide === this.paddle.side) this.paddle.moveToSoft(ball.body.position.y);
  // else if(distanceX <= this.field.config.FIELD_WIDTH*0.6 && distanceY > this.paddle.size/2 * 0.3 && ball.attackSide === this.paddle.side) this.paddle.moveToSoft(ballPY);
  // else this.paddle.stopMove();
  // this.paddle.moveToSoft(ball.body.position.y);
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.PaddleControllerHuman = function(field, paddle) {
  NORD.Field.PaddleController.call(this, field, paddle);
  var self = this;
  this.side = this.paddle.side;
  var keyCodeUp = this.side === 'RIGHT' ? 38 : 'W'.charCodeAt(0);
  var keyCodeDown = this.side === 'RIGHT' ? 40 : 'S'.charCodeAt(0);
  var keyCodeShoot = this.paddle.side === 'LEFT' ? 16 : 32;
  this.keyUp = Util.keyboard({
    code: keyCodeUp,
    keyDownHandler: function keyDownHandler() {
      self.isUp = true;
    },
    keyUpHandler: function keyUpHandler() {
      self.isUp = false;
    }
  });
  this.keyDown = Util.keyboard({
    code: keyCodeDown,
    keyDownHandler: function keyDownHandler() {
      self.isDown = true;
    },
    keyUpHandler: function keyUpHandler() {
      self.isDown = false;
    }
  });
  this.keyShoot = Util.keyboard({
    code: keyCodeShoot,
    keyDownHandler: function keyDownHandler(event) {
      if (!self.field.isGame()) return;
      self.paddle.shoot();
    },
    keyUpHandler: function keyUpHandler() {}
  });

  if (NORD.app.platform == 'mobile') {
    var tapEvent = this.side === 'LEFT' ? 'tap_left' : 'tap_right';
    NORD.app.addListener(tapEvent, this.shoot, this);
  }

  this.controlArea = this.side === 'LEFT' ? this.field.controlAreaLeft : this.field.controlAreaRight;

  this.controlArea.init(this.paddle); // this.touchId = -1;
  ControlAreaGlobal = this.controlArea;
  // this.isDrag = false;
  // this.startDragPoint = null;
  // this.startDragPaddlePoint = null;
  // this.paddle.touchArea.on('pointerdown', this.onInputDown, this);
  // this.paddle.touchArea.on('pointerup', this.onInputUp, this);
  // this.paddle.touchArea.on('pointerupoutside', this.onInputUp, this);
};

NORD.Field.PaddleControllerHuman.prototype = Object.create(NORD.Field.PaddleController.prototype);
NORD.Field.PaddleControllerHuman.prototype.constructor = NORD.Field.PaddleControllerHuman;

NORD.Field.PaddleControllerHuman.prototype.shoot = function() {
  if (!this.field.isGame()) return;
  this.paddle.shoot();
};

NORD.Field.PaddleControllerHuman.prototype.destroy = function() {
  if (!this.isExist) return; // this.paddle.touchArea.removeListener('pointerdown', this.onInputDown, this);
  // this.paddle.touchArea.removeListener('pointerup', this.onInputUp, this);
  // this.paddle.touchArea.removeListener('pointerupoutside', this.onInputUp, this);

  this.keyDown.destroy();
  this.keyUp.destroy();
  this.keyShoot.destroy();
  this.controlArea.destroy();

  if (NORD.app.platform == 'mobile') {
    var tapEvent = this.side === 'LEFT' ? 'tap_left' : 'tap_right';
    NORD.app.removeListener(tapEvent, this.shoot);
  }

  NORD.Field.PaddleController.prototype.destroy.call(this);
}; // NORD.Field.PaddleControllerHuman.prototype.onInputDown = function(data)
// {
//   if(NORD.app.platform !== 'mobile') return;
//
//   this.touchId = data.data.identifier;
//   this.isDrag = true;
//   this.startDragPoint = this.paddle.parent.toLocal({ ...data.data.global });
//   this.startDragPaddlePoint = { x: this.paddle.body.position.x, y: this.paddle.body.position.y };
// }
//
// NORD.Field.PaddleControllerHuman.prototype.onInputUp = function(data)
// {
//   if(NORD.app.platform !== 'mobile') return;
//
//   this.touchId = -1;
//   this.isDrag = false;
//   this.startDragPoint = null;
//   this.startDragPaddlePoint = null;
// }


NORD.Field.PaddleControllerHuman.prototype.updatePosition = function() {
  if (this.paddle.isStunned)
    return;
  NORD.Field.PaddleController.prototype.updatePosition.call(this);

  if (this.controlArea.isDrag && this.controlArea.touchId !== -1 && this.controlArea.startDragPoint) {
    // const globalPos = NORD.app.touches[this.touchId] || NORD.app.mouseGlobal;
    // if(!globalPos) return;
    //
    // const pos = this.paddle.parent.toLocal(globalPos);
    // const delta = pos.y - this.startDragPoint.y;
    // const paddleDelta = delta * this.field.config.fingerSense.value;
    // const targetY = this.startDragPaddlePoint.y + paddleDelta;
    this.paddle.moveToSoft(this.controlArea.getPositionY());
  } else if (this.isUp) {
    // this.paddle.moveTo(-1200);
    if (NORD.game.config.mode == 'action' && NORD.game.panelSettings.actionMode == NORD.MULTIPLAYER_GAME_MODE_TYPE.INVERSE_MODE)
      this.paddle.moveTo('DOWN');
    else
      this.paddle.moveTo('UP');
  } else if (this.isDown) {
    // this.paddle.moveTo(1200);
    if (NORD.game.config.mode == 'action' && NORD.game.panelSettings.actionMode == NORD.MULTIPLAYER_GAME_MODE_TYPE.INVERSE_MODE)
      this.paddle.moveTo('UP');
    else
      this.paddle.moveTo('DOWN');
  } else if (!this.isDrag && !this.isUp && !this.isDown) {
    this.paddle.stopMove();
  }
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


var ControlArea = function ControlArea(field, x, y, width, height) {
  this.field = field;
  this.touchArea = Util.createSprite({
    atlas: 'texture_atlas',
    texture: 'paddle.png',
    parent: this.field,
    aX: 0.5,
    aY: 0.5
  });
  this.touchArea.interactive = true;
  this.touchArea.width = width;
  this.touchArea.height = height;
  this.touchArea.x = x;
  this.touchArea.y = y;
  this.touchArea.alpha = 0;
  this.touchArea.on('pointerdown', this.onInputDown, this);
  this.touchArea.on('pointerup', this.onInputUp, this);
  this.touchArea.on('pointerupoutside', this.onInputUp, this);
};

ControlArea.prototype.init = function(paddle) {
  this.paddle = paddle;
};

ControlArea.prototype.onInputDown = function(data) {
  if (NORD.app.platform !== 'mobile' || this.paddle == null) return; // console.log(this.paddle);

  this.touchId = data.data.identifier;
  this.isDrag = true;
  this.startDragPoint = this.touchArea.parent.toLocal(Object.assign({}, data.data.global));
  this.startDragPaddlePoint = {
    x: this.paddle.body.position.x,
    y: this.paddle.body.position.y
  };
};

ControlArea.prototype.onInputUp = function(data) {
  if (NORD.app.platform !== 'mobile' || this.paddle == null) return;
  this.touchId = -1;
  this.isDrag = false;
  this.startDragPoint = null;
  this.startDragPaddlePoint = null;
};

ControlArea.prototype.getPositionY = function() {
  var globalPos = NORD.app.touches[this.touchId] || NORD.app.mouseGlobal;
  if (!globalPos) return 0;
  var pos = this.touchArea.parent.toLocal(globalPos);
  var delta = pos.y - this.startDragPoint.y;
  var paddleDelta = delta * this.field.config.fingerSense.value;
  var targetY = this.startDragPaddlePoint.y + paddleDelta;
  return targetY;
};

ControlArea.prototype.destroy = function() {
  this.paddle = null;
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


var RoundGenerator = function RoundGenerator(field) {
  var _this$roundModeLabels,
    _this12 = this;

  var self = this;
  ScoreHolder = this;

  this.field = field;
  this.isExist = true;
  this.playMode = 'none';
  this.roundMode = 'none';
  this.container = new PIXI.Container();
  this.field.containerScore.addChild(this.container);
  this.containerScores = new PIXI.Container();
  this.container.addChild(this.containerScores);
  this.containerGraphics = new PIXI.Container();
  this.container.addChild(this.containerGraphics); // this.containerGraphics.alpha = 0.3;

  //Score Left
  this.scoreLeft = new NORD.ScreenGame.ScoreText();
  this.scoreLeft.x = -300;
  this.scoreLeft.y = -180;
  this.containerScores.addChild(this.scoreLeft);

  //Score Right
  this.scoreRight = new NORD.ScreenGame.ScoreText();
  this.scoreRight.x = 300;
  this.scoreRight.y = -180;
  this.containerScores.addChild(this.scoreRight);

  this.roundModeLabelBg = new PIXI.Graphics();
  this.roundModeLabels = (_this$roundModeLabels = {}, _defineProperty(_this$roundModeLabels, 'KITTY', 'label_round_mode_kitty.png'), _defineProperty(_this$roundModeLabels, 'INVISIBLE_WALL', 'label_round_mode_invisible_wall.png'), _defineProperty(_this$roundModeLabels, 'INVISIBLE_AREA', 'label_round_mode_invisible_area.png'), _defineProperty(_this$roundModeLabels, 'GRAVITY_WELL', 'label_round_mode_gravity_well.png'), _defineProperty(_this$roundModeLabels, 'DOUBLE_BALL', 'label_round_mode_double_ball.png'), _defineProperty(_this$roundModeLabels, 'BIG_BALL_LITTLE_PADDLES', 'label_round_mode_b_b_l_p.png'), _defineProperty(_this$roundModeLabels, 'SMALL_GRAVITY_WELL', 'label_round_mode_small_gravity_well.png'), _defineProperty(_this$roundModeLabels, 'FIRE_ZONE', 'label_round_mode_fire_zone.png'), _defineProperty(_this$roundModeLabels, 'BUMPER', 'label_round_mode_bumper.png'), _defineProperty(_this$roundModeLabels, 'STUN_GUN', 'label_round_mode_stun_gun.png'), _defineProperty(_this$roundModeLabels, 'STUN_PLAYER', 'label_round_mode_stun_gun.png'), _defineProperty(_this$roundModeLabels, 'KITTY_SHRINK_PADDLE', 'label_round_mode_stun_gun.png'), _this$roundModeLabels);
  this.containerScores.addChild(this.roundModeLabelBg);
  this.roundModeLabelBg.y = -100;
  this.gravityModeK = Util.randomRangeInt(0, 1);
  this.roundModeLabel = Util.createSprite({
    atlas: 'texture_atlas',
    texture: 'label_round_mode_kitty.png',
    aX: 0.5,
    aY: 0.5
  });
  this.containerScores.addChild(this.roundModeLabel);
  this.roundModeLabel.x = 0;
  this.roundModeLabel.y = -100;
  this.pressSpace = Util.createSprite({
    atlas: 'texture_atlas',
    texture: NORD.app.platform === 'mobile' ? 'tap_to_shoot.png' : NORD.game.config.players == 'one' ? 'press_space.png' : 'press_both.png',
    aX: 0.5,
    aY: 0.5
  });
  this.containerScores.addChild(this.pressSpace);
  this.pressSpace.x = 0;
  this.pressSpace.y = 200;
  this.pressSpace.visible = false; // this.kittyPointLeft = Util.createSprite({ parent: this.container, atlas: 'texture_atlas', texture: 'kitty_point.png', aX: 0.5, aY: 0.5, x: -90, y: -160 });
  // this.kittyPointRight = Util.createSprite({ parent: this.container, atlas: 'texture_atlas', texture: 'kitty_point.png', aX: 0.5, aY: 0.5, x: 90, y: -160 });
  // this.kittyPointLeft.visible = false;
  // this.kittyPointRight.visible = false;

  this.kittyPointLeft = new KittyPoint(this.containerGraphics, -50, -200);
  this.kittyPointRight = new KittyPoint(this.containerGraphics, 50, -200);
  this.multiballPointLeft = new MultiballPoint(this.containerGraphics, -50, -200);
  this.multiballPointRight = new MultiballPoint(this.containerGraphics, 50, -200);
  this.shootPointLeft = new ShootPoint(this.containerGraphics, -50, -200);
  this.shootPointRight = new ShootPoint(this.containerGraphics, 50, -200);

  function KittyPoint(parent, x, y) {
    var _this9 = this;

    this.point1 = Util.createSprite({
      parent: parent,
      atlas: 'texture_atlas',
      texture: 'kitty_hit_no.png',
      aX: 0.5,
      aY: 0.5,
      x: x - 12,
      y: y
    });
    this.point2 = Util.createSprite({
      parent: parent,
      atlas: 'texture_atlas',
      texture: 'kitty_hit_no.png',
      aX: 0.5,
      aY: 0.5,
      x: x + 12,
      y: y
    });
    this.points = 0;

    this.clear = function() {
      _this9.point1.texture = NORD.assetsManager.getTexture('texture_atlas', 'kitty_hit_no.png');
      _this9.point2.texture = NORD.assetsManager.getTexture('texture_atlas', 'kitty_hit_no.png');
      _this9.point1.scale.x = _this9.point1.scale.y = 0.5;
      _this9.point2.scale.x = _this9.point2.scale.y = 0.5; // this.point1.visible = this.point2.visible = true;

      _this9.points = 0;
      _this9.point1.visible = _this9.point2.visible = false;
    };

    this.hit = function(side) {
      _this9.points++;
      if (_this9.points === 1)(side === 'LEFT' ? _this9.point1 : _this9.point2).visible = false;
      if (_this9.points === 2)(side === 'LEFT' ? _this9.point2 : _this9.point1).visible = false; // console.log('Kitty hit!', this, this.point, this.point1, this.point2);
      // console.log('Kitty hit!');
    };

    this.show = function() {
      _this9.point1.visible = _this9.point2.visible = true;
    };
  }

  function MultiballPoint(parent, x, y) {
    var _this10 = this;

    this.point1 = Util.createSprite({
      parent: parent,
      atlas: 'texture_atlas',
      texture: 'multiball_goal_no.png',
      aX: 0.5,
      aY: 0.5,
      x: x - 12,
      y: y
    });
    this.point2 = Util.createSprite({
      parent: parent,
      atlas: 'texture_atlas',
      texture: 'multiball_goal_no.png',
      aX: 0.5,
      aY: 0.5,
      x: x + 12,
      y: y
    });
    this.points = 0;

    this.clear = function() {
      _this10.point1.texture = NORD.assetsManager.getTexture('texture_atlas', 'multiball_goal_yes.png');
      _this10.point2.texture = NORD.assetsManager.getTexture('texture_atlas', 'multiball_goal_yes.png');
      _this10.points = 0;
      _this10.point1.visible = _this10.point2.visible = false;
    };

    this.goal = function(side) {
      _this10.points++; // if(this.points === 1) this.point1.texture = NORD.assetsManager.getTexture('texture_atlas', 'multiball_goal_yes.png');
      // if(this.points === 2) this.point2.texture = NORD.assetsManager.getTexture('texture_atlas', 'multiball_goal_yes.png');

      if (_this10.points === 1)(side === 'LEFT' ? _this10.point1 : _this10.point2).visible = false;
      if (_this10.points === 2)(side === 'LEFT' ? _this10.point2 : _this10.point1).visible = false;
    };

    this.show = function() {
      _this10.point1.visible = _this10.point2.visible = true;
    };
  }

  function ShootPoint(parent, x, y) {
    var _this11 = this;

    this.point1 = Util.createSprite({
      parent: parent,
      atlas: 'texture_atlas',
      texture: 'shoot_point.png',
      aX: 0.5,
      aY: 0.5,
      x: x - 12,
      y: y
    });
    this.point2 = Util.createSprite({
      parent: parent,
      atlas: 'texture_atlas',
      texture: 'shoot_point.png',
      aX: 0.5,
      aY: 0.5,
      x: x + 12,
      y: y
    });
    this.points = 0;

    this.clear = function() {
      _this11.point1.texture = NORD.assetsManager.getTexture('texture_atlas', 'shoot_point.png');
      _this11.point2.texture = NORD.assetsManager.getTexture('texture_atlas', 'shoot_point.png');
      _this11.point1.scale.x = _this11.point1.scale.y = 0.5;
      _this11.point2.scale.x = _this11.point2.scale.y = 0.5; // this.point1.visible = this.point2.visible = true;

      _this11.points = 0;
      _this11.point1.visible = _this11.point2.visible = false;
    };

    this.hit = function(side) {
      _this11.points++;
      if (_this11.points === 1)(side === 'LEFT' ? _this11.point1 : _this11.point2).visible = false;
      if (_this11.points === 2)(side === 'LEFT' ? _this11.point2 : _this11.point1).visible = false;
    };

    this.show = function() {
      _this11.point1.visible = _this11.point2.visible = true;
    };
  }

  this.field.on('gun_ready', function(paddle) {
    if (paddle.side === 'RIGHT' && !NORD.game.isShootTutorial) {
      _this12.pressSpace.texture = NORD.assetsManager.getTexture('texture_atlas', NORD.app.platform === 'mobile' ? 'tap_to_shoot.png' : NORD.game.config.players == 'one' ? 'press_space.png' : 'press_both.png');
      _this12.pressSpace.visible = true;
    }
  });
  this.field.on('gun_shoot', function(paddle) {
    if ((NORD.game.config.players != 'one' || paddle.side === 'RIGHT') && _this12.pressSpace.visible) {
      NORD.game.isShootTutorial = true;
      _this12.pressSpace.visible = false;
    }
  });
  this.field.on('init_game', function() {
    self.updateScore();
  });
  this.field.on('goal', function(data) {
    self.updateScore();
  }, this);
  this.field.on('multiball_goal', function(data) {
    if (MultiplayerStarted) {
      if (Ball == data.ball) Ball = null;
      else Ball1 = null;
    }
    data.ball.clear(); // console.log('QQQQQQQQQQQQQ:', data.player.side);

    if (MultiplayerStarted) {
      if (data.player.side === 'LEFT') {
        this.multiballPointRight.goal(data.player.side);

        var seObj = new PP.ServerObject();
        if (Ball == null)
          seObj.eventType = NORD.PP_EVENT.EVENT_GAME_DEFEATED_ONE;
        else
          seObj.eventType = NORD.PP_EVENT.EVENT_GAME_DEFEATED_TWO;

        NORD.gameEventHandler.sendEvent(seObj);
      }

    } else {
      if (data.player.side === 'LEFT') this.multiballPointRight.goal(data.player.side);
      else if (data.player.side === 'RIGHT') this.multiballPointLeft.goal(data.player.side);
    }

    if (this.multiballPointRight.points >= 2) {
      this.field.goal(data.player);

      if (MultiplayerStarted) {
        Ball = null;
        Ball1 = null;
        var seObj = new PP.ServerObject();
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_DEFEATED;

        NORD.gameEventHandler.sendEvent(seObj);
        NORD.game.screenGame.panelPause.hide();
      }

      this.field.getActiveBalls().forEach(function(ball) {
        TweenMax.to(ball, 0.6, {
          alpha: 0.0
        });
      });
    } else if (this.multiballPointLeft.points >= 2) {
      if (MultiplayerStarted)
        return;

      this.field.goal(data.player);
      this.field.getActiveBalls().forEach(function(ball) {
        TweenMax.to(ball, 0.6, {
          alpha: 0.0
        });
      });
    } else {
      if (data.player.type === 'HUMAN') NORD.audioManager.playAudio('player_goal');
      else if (data.player.type === 'AI') NORD.audioManager.playAudio('computer_goal');

      if (!this.field.getActiveBalls().length) {
        this.field.placeNewBall('LEFT', 0, 0);
        this.field.placeNewBall('RIGHT', 0, 0);
      }
    }
  }, this);

  this.field.on('shadow_hit_disappear', function(ball) {
    if (ball.body.velocity.x > 0) {
      if (LeftPaddle.tweenBodyAlpha != null)
        LeftPaddle.tweenBodyAlpha.kill();
      LeftPaddle.tweenBodyAlpha = TweenMax.to(LeftPaddle, 2, {
        alpha: 0,
        onComplete: function onComplete() {
          LeftPaddle.tweenBodyAlpha = null;
          setTimeout(function() {
            increaseLeftPaddleAlpha();
          }, 1000);
        }
      });
      increaseRightPaddleAlpha();
    } else {
      if (RightPaddle.tweenBodyAlpha != null)
        RightPaddle.tweenBodyAlpha.kill();
      RightPaddle.tweenBodyAlpha = TweenMax.to(RightPaddle, 2, {
        alpha: 0,
        onComplete: function onComplete() {
          RightPaddle.tweenBodyAlpha = null;
          setTimeout(function() {
            increaseRightPaddleAlpha();
          }, 1000);
        }
      });
      increaseLeftPaddleAlpha();
    }

    function increaseLeftPaddleAlpha() {
      if (LeftPaddle.tweenBodyAlpha != null)
        LeftPaddle.tweenBodyAlpha.kill();
      LeftPaddle.tweenBodyAlpha = TweenMax.to(LeftPaddle, 1, {
        alpha: 1,
        onComplete: function onComplete() {
          LeftPaddle.tweenBodyAlpha = null;
        }
      });
    }

    function increaseRightPaddleAlpha() {
      if (RightPaddle.tweenBodyAlpha != null)
        RightPaddle.tweenBodyAlpha.kill();
      RightPaddle.tweenBodyAlpha = TweenMax.to(RightPaddle, 1, {
        alpha: 1,
        onComplete: function onComplete() {
          RightPaddle.tweenBodyAlpha = null;
        }
      });
    }
  });

  this.field.on('black_hole_mode_hit', function(ball) {
    var side = 'LEFT';
    if (ball.body.velocity.x < 0)
      side = 'RIGHT'

    var goalPlayer = this.players[side === 'LEFT' ? 'RIGHT' : 'LEFT'];
    this.goal(goalPlayer, this);
  });

  this.field.on('kitty_hit_shrink', function(ball) {
    if (ball.body.velocity.x < 0) {
      LeftPaddle.setSize(NORD.game.field.roundGenerator.field.smallPaddleData.size, NORD.game.field.roundGenerator.field.smallPaddleData.shape);
      LeftPaddle.paddleViewImage.scale.y = 0.2;
      RightPaddle.setSize(NORD.game.field.config.paddleSize.value, NORD.game.field.config.paddleShape.value);
      RightPaddle.paddleViewImage.scale.y = 0.5;
    } else {
      RightPaddle.setSize(NORD.game.field.roundGenerator.field.smallPaddleData.size, NORD.game.field.roundGenerator.field.smallPaddleData.shape);
      RightPaddle.paddleViewImage.scale.y = 0.2;
      LeftPaddle.setSize(NORD.game.field.config.paddleSize.value, NORD.game.field.config.paddleShape.value);
      LeftPaddle.paddleViewImage.scale.y = 0.5;
    }
  });

  this.field.on('kitty_hit', function(player) {
    var point = null;
    if (player.side === 'LEFT') point = _this12.kittyPointLeft;
    else if (player.side === 'RIGHT') point = _this12.kittyPointRight; //
    // point.visible = true;

    point.hit(player.side);

    if (MultiplayerStarted) {
      var seObj = new PP.ServerObject();
      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_KITTY_HIT;
      NORD.gameEventHandler.sendEvent(seObj);
    }
  });
  this.field.on('bullet_hit_paddle', function(paddle) {
    var player = paddle.player;
    if (ScoreHolder.roundMode == NORD.MULTIPLAYER_GAME_MODE_TYPE.STUNGUN) {
      var point = null;
      if (player.side === 'LEFT') point = _this12.shootPointLeft;
      else if (player.side === 'RIGHT') point = _this12.shootPointRight; //
      // point.visible = true;

      point.hit(player.side);
      if (point.points >= 2) paddleKill(player.side === 'LEFT' ? _this12.field.playerRight : _this12.field.playerLeft, paddle);
    } else {
      // if (player.side === 'RIGHT') {
      paddle.isStunned = true;
      setTimeout(function() {
        paddle.isStunned = false;
      }, 2000);
      // }
    }
  });

  function paddleKill(player, paddle) {
    self.field.getActiveBalls().forEach(function(ball) {
      TweenMax.to(ball, 0.6, {
        alpha: 0.0
      });
    });
    var bullets = self.field.objects.filter(function(obj) {
      return obj.type === 'PADDLE_BULLET';
    });
    bullets.forEach(function(bullet) {
      bullet.isStop = true;
      TweenMax.to(bullet, 0.6, {
        alpha: 0.0
      });
    });
    TweenMax.delayedCall(0.8, function() {
      paddle.visible = false;
      self.field.state.setState({
        gamePhase: 'GAME'
      });
      self.field.goal(player);
    });
    self.field.state.setState({
      gamePhase: 'ROUND_COMPLETE'
    }); // if(player.type === 'HUMAN') NORD.audioManager.playAudio('player_goal');
    // else if(player.type === 'AI') NORD.audioManager.playAudio('computer_goal');
  } // console.log('Round generator create!');


  this.avaiableModes = [];
  this.nextDelayCall = null; // this.nextObstacle();
}; // RoundGenerator.prototype.hide = function()
// {
//
// }
// RoundGenerator.prototype.multiballComplete = function(player)
// {
//   player.roundScore ++;
//
//   if(player.roundScore >= this.field.config.scoresForWin.value)
//   {
//     this.field.gameComplete(player);
//   }
//   else
//   {
//     this.field.roundComplete();
//   }
// }


RoundGenerator.prototype.initGame = function(mode) {
  this.playMode = mode; // console.log('AAAA:', mode);

  this.resetAvaiableModes(); // if(this.playMode == 'classic')
  // {

  this.roundModeLabel.visible = false;
  this.roundModeLabelBg.visible = false; // }
};

RoundGenerator.prototype.updateScore = function() {
  this.scoreLeft.setScore(this.field.playerLeft.roundScore);
  this.scoreRight.setScore(this.field.playerRight.roundScore);
};

RoundGenerator.prototype.resetAvaiableModes = function() {
  // this.avaiableModes = ['KITTY', 'GRAVITY_WELL', 'INVISIBLE_AREA', 'INVISIBLE_WALL', 'DOUBLE_BALL', 'BIG_BALL_LITTLE_PADDLES', // 'SMALL_GRAVITY_WELL',
  //   'STUN_GUN', 'FIRE_ZONE', 'BUMPER'
  // ];

  this.avaiableModes = ['STUN_PLAYER', 'KITTY_SHRINK_PADDLE', 'SHADOW_MODE', 'INVERSE_MODE', 'TELEPORT_MODE', 'BLACK_HOLE_MODE'];
};

RoundGenerator.prototype.getAvaiablesModes = function() {
  if (this.avaiableModes.length === 0 || this.avaiableModes.length === 1 && this.avaiableModes[0] === this.prevRoundMode) this.resetAvaiableModes();
  var avaiableModes = this.avaiableModes.slice();
  var n = avaiableModes.indexOf(this.prevRoundMode);

  if (n !== -1) {
    avaiableModes.splice(n, 1);
  }

  return avaiableModes;
};

RoundGenerator.prototype.initRound = function() {
  if (this.playMode === 'classic') {
    return;
  }

  this.clear();
  if (this.playMode !== 'action') return; // this.roundModeLabel.visible = true;
  // this.roundModeLabelBg.visible = true;
  // console.log(NORD.game.panelSettings.actionMode);
  //


  if (MultiplayerStarted) {
    this.roundMode = DemoLoadFunction.myRoom()._customProperties.modeType;
  } else {
    if (NORD.game.panelSettings.actionMode === 'ALL') {
      // console.log('CCCC:', this.roundMode, this.prevRoundMode);
      var avaiableModes = this.getAvaiablesModes();
      this.roundMode = Util.randomElement(avaiableModes);
      this.avaiableModes.splice(this.avaiableModes.indexOf(this.roundMode), 1);
    } else this.roundMode = NORD.game.panelSettings.actionMode;
  }
  this.field.roundMode = this.roundMode;
  console.log("mode selected", this.roundMode);
  this.initRoundMode();

  this.ballSize = 80;

  if (this.roundMode === 'BIG_BALL_LITTLE_PADDLES') {
    this.field.ballSize = this.field.config.bblpModeBallSize.value;
    this.field.paddleLeft.setSize(this.field.smallPaddleData.size, this.field.smallPaddleData.shape);
    this.field.paddleRight.setSize(this.field.smallPaddleData.size, this.field.smallPaddleData.shape);
    this.field.ballMaxSpeed = this.field.config.bblpModeBallMaxSpeed.value;
    this.field.ballMinSpeed = this.field.config.bblpModeBallMinSpeed.value;
  } else if (this.roundMode === 'FIRE_ZONE') {
    this.field.ballSpeedUpDisable = true;
    this.field.ballMaxSpeed = this.field.config.fireZoneModeBallMaxSpeed.value;
    this.field.ballMinSpeed = this.field.config.fireZoneModeBallMinSpeed.value;
  } else if (this.roundMode === 'BUMPER') {
    this.field.ballSpeedUpDisable = true;
  } else if (this.roundMode === 'DOUBLE_BALL') {
    this.field.ballMaxSpeed = this.field.config.multiballModeBallMaxSpeed.value; // this.multiballPointLeft.show();
    // this.multiballPointRight.show();
  } else if (this.roundMode === 'KITTY') { // this.kittyPointLeft.show();
    // this.kittyPointRight.show();
  } else if (this.roundMode === 'STUN_GUN') {} // this.shootPointLeft.show();
  // this.shootPointRight.show();
  // console.log('Round init: mode:', this.roundMode);
  // this.field.paddleLeft.setTut(true);
  // this.field.paddleRight.setTut(true);

};

RoundGenerator.prototype.initRoundMode = function() {
  this.roundModeLabel.texture = NORD.assetsManager.getTexture('texture_atlas', this.roundModeLabels[this.roundMode]);
  this.roundModeLabel.scale.x = this.roundModeLabel.scale.y = 0.7;
  var padding = 10;
  this.roundModeLabelBg.clear();
  this.roundModeLabelBg.beginFill(0x2F2F64, 1.0);
  this.roundModeLabelBg.drawRect(-this.roundModeLabel.width / 2 - padding, -this.roundModeLabel.height / 2 - padding, this.roundModeLabel.width + padding * 2, this.roundModeLabel.height + padding * 2);
};

RoundGenerator.prototype.createObstacle = function(mode) {

  if (mode === 'SHADOW_MODE') {

    var bonusData = {
      type: mode,
      time: -1,
      x: 0,
      y: 0
    };
    var bonus = createBonus(this.field, bonusData);
    //sushant
    NORD.game.field.roundGenerator.bonus = bonus;
  }
  if (mode === 'TELEPORT_MODE' || mode === 'BLACK_HOLE_MODE') {
    if (MultiplayerStarted) {
      var bonusData = {
        type: mode,
        time: -1,
        x: 0,
        y: 0,
        data: "teleport1",
        setup: "host"
      };
      var bonusData1 = {
        type: mode,
        time: -1,
        x: 0,
        y: 0,
        data: "teleport2",
        setup: "host"
      };

      if (IsHost) {
        bonusData.setup = "host";
        bonusData1.setup = "host";
      } else {
        bonusData.setup = "client";
        bonusData1.setup = "client";
      }
      var bonus = createBonus(this.field, bonusData);

      var bonus1 = createBonus(this.field, bonusData1);

    } else {
      var bonusData = {
        type: mode,
        time: -1,
        x: 0,
        y: 0,
        data: "teleport1",
        setup: "normal"
      };
      var bonus = createBonus(this.field, bonusData);

      var bonusData1 = {
        type: mode,
        time: -1,
        x: 0,
        y: 0,
        data: "teleport2",
        setup: "normal"
      };
      var bonus = createBonus(this.field, bonusData1);
      //sushant
      // NORD.game.field.roundGenerator.bonus = bonus;
    }


  }
  if (mode === 'KITTY' || mode === 'KITTY_SHRINK_PADDLE') {
    var bonusData = {
      type: mode,
      time: -1,
      x: 0,
      y: 0
    };
    var bonus = createBonus(this.field, bonusData);
    //sushant
    NORD.game.field.roundGenerator.bonus = bonus;
  }

  if (mode === 'INVISIBLE_WALL') {

    if (MultiplayerStarted) {
      if (IsHost) {
        var _bonusData = {
          type: mode,
          time: -1,
          x: 0,
          y: Util.randomRange(-150, 150)
        };

        var _bonus = createBonus(this.field, _bonusData);

        var seObj = new PP.ServerObject();
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_INVISIBLE_WALL_POSITION;
        seObj.wallPositionY = _bonusData.y;
        NORD.gameEventHandler.sendEvent(seObj);
      }
    } else {
      var _bonusData = {
        type: mode,
        time: -1,
        x: 0,
        y: Util.randomRange(-150, 150)
      };

      var _bonus = createBonus(this.field, _bonusData);
    }
  }

  if (mode === 'INVISIBLE_AREA') {
    var _bonusData2 = {
      type: mode,
      time: -1,
      x: 0,
      y: 0
    };

    var _bonus2 = createBonus(this.field, _bonusData2);
  }

  if (mode === 'GRAVITY_WELL') {
    if (MultiplayerStarted) {
      if (IsHost) {
        var radius = this.field.config.bonusGravityWellRadius.value;
        var _bonusData3 = {
          type: mode,
          time: -1,
          x: 0,
          y: Util.randomRange(-190 + radius, 190 - radius)
        };

        var _bonus3 = createBonus(this.field, _bonusData3);


        var seObj = new PP.ServerObject();
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_GRAVITY_WELL_OBSTACLE;
        seObj.gravityX = _bonusData3.x;
        seObj.gravityY = _bonusData3.y;
        seObj.radius = 0;
        seObj.power = 0;
        NORD.gameEventHandler.sendEvent(seObj);

      }
    } else {
      if (this.gravityModeK % 2 === 0) {
        var radius = this.field.config.bonusGravityWellRadius.value;
        var _bonusData3 = {
          type: mode,
          time: -1,
          x: 0,
          y: Util.randomRange(-190 + radius, 190 - radius)
        };

        var _bonus3 = createBonus(this.field, _bonusData3);
      } else {
        var shiftX = 140;
        var shiftY = Util.randomRange(-150, 150);
        var _radius = this.field.config.smallGravityWellRadius.value;
        var power = this.field.config.smallGravityWellPower.value;
        var _bonusData4 = {
          type: 'GRAVITY_WELL',
          power: power,
          radius: _radius,
          time: -1,
          x: shiftX,
          y: -shiftY
        };

        var _bonus4 = createBonus(this.field, _bonusData4);

        _bonus4.gravityCenter.scale.x = _bonus4.gravityCenter.scale.y = 0.6;
        var bonusData2 = {
          type: 'GRAVITY_WELL',
          power: power,
          radius: _radius,
          time: -1,
          x: -shiftX,
          y: shiftY
        };
        var bonus2 = createBonus(this.field, bonusData2);
        bonus2.gravityCenter.scale.x = bonus2.gravityCenter.scale.y = 0.6;
      }

      this.gravityModeK++;
    }
  } // if(mode === 'SMALL_GRAVITY_WELL')
  // {
  //
  // }


  if (mode === 'FIRE_ZONE') {
    var _radius2 = this.field.config.fireZoneModeRadius.value;
    var _bonusData5 = {
      type: 'FIRE_ZONE',
      radius: _radius2,
      time: -1,
      x: 0,
      y: 0,
      speedUp: this.field.config.fireZoneModeSpeedUp.value
    };

    var _bonus5 = createFireZone(this.field, _bonusData5);
  }

  if (mode === 'BUMPER') {
    var _shiftX = this.field.config.bumperModeFiveShift.value;
    var _shiftY = this.field.config.bumperModeFiveShift.value;
    var wall = new NORD.Field.Wall(this.field, {
      type: 'BUMPER',
      x: 0,
      y: 0,
      radius: this.field.config.bumperModeRadius.value
    });

    if (this.field.config.bumperModeCount.value === 2) {
      var wall1 = new NORD.Field.Wall(this.field, {
        type: 'BUMPER',
        x: -_shiftX,
        y: -_shiftY,
        radius: this.field.config.bumperModeRadius.value
      });
      var wall2 = new NORD.Field.Wall(this.field, {
        type: 'BUMPER',
        x: -_shiftX,
        y: _shiftY,
        radius: this.field.config.bumperModeRadius.value
      });
      var wall3 = new NORD.Field.Wall(this.field, {
        type: 'BUMPER',
        x: _shiftX,
        y: -_shiftY,
        radius: this.field.config.bumperModeRadius.value
      });
      var wall4 = new NORD.Field.Wall(this.field, {
        type: 'BUMPER',
        x: _shiftX,
        y: _shiftY,
        radius: this.field.config.bumperModeRadius.value
      });
    }
  }

  if (mode === 'STUN_GUN') {
    this.field.paddleLeft.addShoots(1);
    this.field.paddleRight.addShoots(1);
  }

  if (mode === 'STUN_PLAYER') {
    this.field.paddleLeft.addShoots(1);
    this.field.paddleRight.addShoots(1);
  }

  // this.field.paddleLeft.setTut(false);
  // this.field.paddleRight.setTut(false);

};

RoundGenerator.prototype.showActionModeName = function() {
  var _this13 = this;

  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (this.playMode !== 'classic') {
    this.roundModeLabel.visible = true;
    this.roundModeLabelBg.visible = true;
    this.delayRoundModeLable = TweenMax.delayedCall(1.0, function() {
      _this13.delayRoundModeLable = null;
      _this13.roundModeLabel.visible = false;
      _this13.roundModeLabelBg.visible = false;
      if (callback) callback();
    });
  } else if (callback) callback();
};

RoundGenerator.prototype.startRound = function() {
  var _this14 = this;

  if (this.playMode !== 'action') return;
  this.field.setGameGraphicsAlpha(0.0);
  this.nextDelayCall = TweenMax.delayedCall(0.5, function() {
    _this14.nextDelayCall = null;

    _this14.createObstacle(_this14.roundMode);

    if (_this14.roundMode === 'DOUBLE_BALL') {
      _this14.multiballPointLeft.show();

      _this14.multiballPointRight.show();
    } else if (_this14.roundMode === 'KITTY') {
      _this14.kittyPointLeft.show();

      _this14.kittyPointRight.show();
    } else if (_this14.roundMode === 'STUN_GUN') {
      _this14.shootPointLeft.show();

      _this14.shootPointRight.show();
    } else if (_this14.roundMode === 'STUN_PLAYER') {
      // _this14.shootPointLeft.show();
      //
      // _this14.shootPointRight.show();
    }

    _this14.field.setGameGraphicsAlpha(1.0, true);
  });

  if (this.roundMode === 'DOUBLE_BALL') {
    var dir = this.field.ball.attackSide === 'LEFT' ? 'RIGHT' : 'LEFT';
    this.field.placeNewBall(dir);
  } // this.roundModeLabel.visible = false;
  // this.roundModeLabelBg.visible = false;
  // if(this.playMode !== 'classic')
  // {
  //   this.roundModeLabel.visible = true;
  //   this.roundModeLabelBg.visible = true;
  //
  //   this.delayRoundModeLable = TweenMax.delayedCall(1.5, ()=>{
  //     this.delayRoundModeLable = null;
  //
  //     this.roundModeLabel.visible = false;
  //     this.roundModeLabelBg.visible = false;
  //   })
  // }

};

RoundGenerator.prototype.roundComplete = function() {
  if (this.playMode !== 'action') return;
  this.prevRoundMode = this.roundMode;
};

RoundGenerator.prototype.clear = function() {
  this.roundMode = 'none'; // this.kittyPointLeft.visible = false;
  // this.kittyPointRight.visible = false;

  this.kittyPointLeft.clear();
  this.kittyPointRight.clear();
  this.multiballPointLeft.clear();
  this.multiballPointRight.clear();
  this.shootPointLeft.clear();
  this.shootPointRight.clear();
  this.pressSpace.visible = false;
  this.roundModeLabel.visible = false;
  this.roundModeLabelBg.visible = false;

  if (this.nextDelayCall) {
    this.nextDelayCall.kill();
    this.nextDelayCall = null;
  }
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


var ObstacleGenerator = function ObstacleGenerator(field) {
  this.field = field;
  this.isExist = true;
  this.avaiableObstacles = [];
  this.resetAvaiableObstacles();
  this.nextObstacleDelayedCall = null; // this.nextObstacle();
};

ObstacleGenerator.prototype.resetAvaiableObstacles = function() {
  this.avaiableObstacles = ['KITTY', 'GRAVITY_WELL', 'INVISIBLE_AREA', 'INVISIBLE_WALL'];
};

ObstacleGenerator.prototype.nextObstacle = function() {
  var _this15 = this;

  this.nextObstacleDelayedCall = TweenMax.delayedCall(0.5, function() {
    _this15.nextObstacleDelayedCall = null;

    _this15.generateObstacle();
  });
};

ObstacleGenerator.prototype.generateObstacle = function() {
  var bonusType = Util.randomElement(this.avaiableObstacles);
  this.avaiableObstacles.splice(this.avaiableObstacles.indexOf(bonusType), 1);
  if (this.avaiableObstacles.length === 0) this.resetAvaiableObstacles();
  var bonusData = {
    type: bonusType,
    time: -1
  };
  var bonusPosition = {
    x: 0,
    y: Util.randomRange(-200, 200)
  };
  bonusData.x = bonusPosition.x;
  bonusData.y = bonusPosition.y;
  var bonus = createBonus(this.field, bonusData);
  return bonus;
};

ObstacleGenerator.prototype.destroy = function() {
  if (!this.isExist) return;
  this.isExist = false;
  if (this.nextObstacleDelayedCall) this.nextObstacleDelayedCall.kill();
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


var BonusGenerator = function BonusGenerator(field) {
  this.field = field;
  this.isExist = true;
  this.avaiableBonuses = [];
  this.resetAvaiableBonuses();
  this.nextBonusDelayedCall = null;
  this.nextBonus();
};

BonusGenerator.prototype.resetAvaiableBonuses = function() {
  this.avaiableBonuses = ['PADDLE_SIZE', 'NEW_BALL', 'BALL_MAX_SPEED'];
};

BonusGenerator.prototype.nextBonus = function() {
  var _this16 = this;

  var delay = Util.randomRange(this.field.config.bonusMinDelay.value, this.field.config.bonusMaxDelay.value); // const delay = 0.1;

  this.nextBonusDelayedCall = TweenMax.delayedCall(delay, function() {
    _this16.bonus = _this16.generateBonus();

    _this16.bonus.once('disappear', function(bonus) {
      if (!_this16.isExist) return;
      _this16.bonus = null;

      _this16.nextBonus();
    }); // console.log(this.bonus);
    // this.nextBonus();

  });
};

BonusGenerator.prototype.generateBonus = function() {
  var bonusType = Util.randomElement(this.avaiableBonuses);
  this.avaiableBonuses.splice(this.avaiableBonuses.indexOf(bonusType), 1);
  if (this.avaiableBonuses.length === 0) this.resetAvaiableBonuses();
  var bonusData = {
    type: bonusType
  };
  var bonusAreaWidth = 35;
  var bonusAreaHeight = 35;
  var areasData = this.field.board.getFreeAreasData();

  for (var i = 0; i < this.field.objects.length; i++) {
    var object = this.field.objects[i];

    if (object.wallType === 'INVISIBLE_WALL') {
      areasData.blockAreas.push({
        x: object.x - object.wallWidth / 2,
        y: object.y - object.wallHeight / 2,
        width: object.wallWidth,
        height: object.wallHeight
      });
    }
  }

  var bonusPosition = null;
  var ccc = 0;

  while (bonusPosition == null && ccc < 1000) {
    bonusPosition = {
      x: Util.randomRange(areasData.area.x, areasData.area.x + areasData.area.width),
      y: Util.randomRange(areasData.area.y, areasData.area.y + areasData.area.height),
      width: bonusAreaWidth,
      height: bonusAreaHeight
    };

    for (var _i2 = 0; _i2 < areasData.blockAreas.length; _i2++) {
      if (isInArea(areasData.blockAreas[_i2], bonusPosition)) {
        bonusPosition = null;
        break;
      }
    }

    ccc++;
  }

  function isInArea(area, point) {
    if (point.x + point.width / 2 >= area.x && point.x - point.width / 2 <= area.x + area.width && point.y + point.height / 2 >= area.y && point.y - point.height / 2 <= area.y + area.height) return true;
    return false;
  }

  if (ccc >= 1000) {
    // console.log('Oooooooops!');
    return;
  }

  bonusData.x = bonusPosition.x;
  bonusData.y = bonusPosition.y; // console.log('GenerateBonus:', bonusData);

  var bonus = createBonus(this.field, bonusData);
  return bonus;
};

BonusGenerator.prototype.destroy = function() {
  if (!this.isExist) return;
  this.isExist = false;
  this.bonus = null;
  if (this.nextBonusDelayedCall) this.nextBonusDelayedCall.kill();
  if (this.nextObstacleDelayedCall) this.nextObstacleDelayedCall.kill();
};

var createBonus = function createBonus(field, data) {
  var x = data.x != undefined ? data.x : Util.randomRange(-200, 200);
  var y = data.y != undefined ? data.y : Util.randomRange(-200, 200);
  var config = {
    x: x,
    y: y,
    time: data.time
  };

  if (data.type === 'PADDLE_SIZE') {
    config.time = field.config.bonusPaddleSizeContainerDuration.value;
    return createBonusPaddleSize(field, config, {
      paddleSize: field.config.bonusPaddleSizeBonusSize.value,
      time: field.config.bonusPaddleSizeBonusDuration.value
    });
  } else if (data.type === 'PADDLE_SPEED') {
    config.time = field.config.bonusPaddleSpeedContainerDuration.value;
    return createBonusPaddleSpeed(field, config, {
      speedK: field.config.bonusPaddleSpeedBonusSpeed.value,
      time: field.config.bonusPaddleSpeedBonusDuration.value
    });
  } else if (data.type === 'NEW_BALL') {
    config.time = field.config.bonusNewBallContainerDuration.value;
    return createBonusBall(field, config);
  } else if (data.type === 'TELEPORT_MODE' || data.type === 'BLACK_HOLE_MODE') {
    config.x = config.y = 0;
    config.speed = field.config.bonusKittySpeed.value;
    config.time = config.time != undefined ? config.time : field.config.bonusKittyDuration.value;
    config.warningTime = -1;
    if (data.setup == "normal" || data.setup == "host")
      return createTeleport1(field, config, data);
    else
      return createTeleport2(field, config, data);
  } else if (data.type === 'KITTY' || data.type === 'KITTY_SHRINK_PADDLE') {
    config.x = config.y = 0;
    config.speed = field.config.bonusKittySpeed.value;
    config.time = config.time != undefined ? config.time : field.config.bonusKittyDuration.value;
    config.warningTime = -1;
    return createKitty(field, config);
  } else if (data.type === 'SHADOW_MODE') {
    config.x = config.y = 0;
    config.speed = field.config.bonusKittySpeed.value;
    config.time = config.time != undefined ? config.time : field.config.bonusKittyDuration.value;
    config.warningTime = -1;
    return createShadow(field, config);
  } else if (data.type === 'GRAVITY_WELL') {
    config.gravityPower = data.power != undefined ? data.power : field.config.bonusGravityWellPower.value;
    if (data.radius == undefined) config.radius = field.config.bonusGravityWellRadius.value;
    else config.radius = data.radius;
    config.time = config.time != undefined ? config.time : field.config.bonusGravityWellDuration.value;
    if (data.x == undefined) config.x = 0; // console.log('QQQ:', config, data);

    return createGravityWell(field, config);
  } else if (data.type === 'BALL_MAX_SPEED') {
    config.time = field.config.bonusSpeedLimitContainerDuration.value;
    return createBonusBallMaxSpeed(field, config, {
      time: field.config.bonusSpeedLimitDuration.value,
      ballMaxSpeed: field.config.bonusSpeedLimitMaxSpeed.value
    });
  } else if (data.type === 'INVISIBLE_AREA') {
    config.x = config.y = 0;
    config.areaWidth = field.config.bonusInvisibleAreaWidth.value;
    config.time = config.time != undefined ? config.time : field.config.bonusInvisibleAreaDuration.value;
    return createInvisibleArea(field, config);
  } else if (data.type === 'INVISIBLE_WALL') {
    config.x = 0;
    config.width = field.config.obstacleInvisibleWallWidth.value;
    config.height = field.config.obstacleInvisibleWallHeight.value;
    config.blinkTime = field.config.obstacleInvisibleWallBlinkDuration.value;
    config.time = config.time != undefined ? config.time : field.config.bonusInvisibleAreaDuration.value;
    return createInvisibleWall(field, config);
  } else if (data.type === 'SHOOT') {
    config.time = field.config.bonusShootContainerDuration.value;
    return createBonusShoot(field, config, {});
  }
};

var createGravityWell = function createGravityWell(field) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  console.log(config);
  var gravityWell = new NORD.Field.GravityWell(field, config);
  gravityWell.appear();
  return gravityWell;
};

var createFireZone = function createFireZone(field) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var fireZone = new NORD.Field.FireZone(field, config);
  fireZone.appear();
  return fireZone;
};

var createInvisibleWall = function createInvisibleWall(field) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var invisibleWall = new NORD.Field.InvisibleWall(field, config);
  return invisibleWall;
};

var createBonusPaddleSize = function createBonusPaddleSize(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var bonusConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
    bonusType: 'PADDLE_SIZE',
    activateCallback: function activateCallback(ball) {
      var bonus = new BonusPaddleSize(bonusConfig);
      bonus.activate(ball.playerPaddle);
    }
  }));
  return bonusContainer;
};

var createBonusPaddleSpeed = function createBonusPaddleSpeed(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var bonusConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
    bonusType: 'PADDLE_SPEED',
    activateCallback: function activateCallback(ball) {
      var bonus = new BonusPaddleSpeed(bonusConfig);
      bonus.activate(ball.playerPaddle);
    }
  }));
  return bonusContainer;
};

var createBonusBallMaxSpeed = function createBonusBallMaxSpeed(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var bonusConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
    bonusType: 'BALL_MAX_SPEED',
    activateCallback: function activateCallback(ball) {
      field.ballMaxSpeedBoost(bonusConfig.time, bonusConfig.ballMaxSpeed);
      ball.speedUp(field.config.bonusSpeedLimitBallSpeedUp.value);
    }
  }));
  return bonusContainer;
};

var createBonusShoot = function createBonusShoot(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var bonusConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
    bonusType: 'SHOOT',
    activateCallback: function activateCallback(ball) {
      if (!ball.playerPaddle) return;
      ball.playerPaddle.addShoots(field.config.bonusShootCount.value);
    }
  }));
  return bonusContainer;
};

var createBonusBall = function createBonusBall(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
    bonusType: 'NEW_BALL',
    activateCallback: function activateCallback(ball) {
      var side = ball.attackSide === 'LEFT' ? 'RIGHT' : 'LEFT';
      field.placeNewBall(side);
    }
  }));
  return bonusContainer;
};

var createTeleport1 = function createTeleport1(field, config, data) {

  var bonusContainer;
  if (data.data == "teleport1") {
    var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      x: 80,
      y: 100
    };
    bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
      bonusType: 'TELEPORT1',
      contactType: 'aaaq',
      activateCallback: function activateCallback(ball) {
        if (this.field.roundGenerator.roundMode === 'BLACK_HOLE_MODE') {
          var player = field.players[ball.playerPaddle.side];
          field.emit('black_hole_mode_hit', ball);
        } else {
          if (ball.body.velocity.x < 0) {
            ball.setTo(-80, -100);
          }
        }
      }
    }));
    bonusContainer.x = 80;
    bonusContainer.y = 100;
  }
  if (data.data == "teleport2") {
    var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      x: -80,
      y: -100
    };
    bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
      bonusType: 'TELEPORT2',
      contactType: 'aaaq',
      activateCallback: function activateCallback(ball) {
        if (this.field.roundGenerator.roundMode === 'BLACK_HOLE_MODE') {
          var player = field.players[ball.playerPaddle.side];
          field.emit('black_hole_mode_hit', ball);
        } else {
          if (ball.body.velocity.x > 0) {
            ball.setTo(80, 100);
          }
        }
      }
    }));
    bonusContainer.x = -80;
    bonusContainer.y = -100;
  }
  if (NORD.game.panelSettings.actionMode === 'BLACK_HOLE_MODE') {
    bonusContainer.bg.texture = NORD.assetsManager.getTexture('Blackhole');
  }

  return bonusContainer;
};

var createTeleport2 = function createTeleport1(field, config, data) {

  var bonusContainer;
  if (data.data == "teleport1") {
    var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      x: -80,
      y: 100
    };
    bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
      bonusType: 'TELEPORT21',
      contactType: 'aaaq',
      activateCallback: function activateCallback(ball) {
        if (this.field.roundGenerator.roundMode === 'BLACK_HOLE_MODE') {
          var player = field.players[ball.playerPaddle.side];
          field.emit('black_hole_mode_hit', ball);
        } else {
          if (ball.body.velocity.x > 0) {
            ball.setTo(80, -100);
          }
        }
      }
    }));
    bonusContainer.x = -80;
    bonusContainer.y = 100;
  }
  if (data.data == "teleport2") {
    var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      x: 80,
      y: -100
    };
    bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
      bonusType: 'TELEPORT22',
      contactType: 'aaaq',
      activateCallback: function activateCallback(ball) {
        if (this.field.roundGenerator.roundMode === 'BLACK_HOLE_MODE') {
          var player = field.players[ball.playerPaddle.side];
          field.emit('black_hole_mode_hit', ball);
        } else {
          if (ball.body.velocity.x < 0) {
            ball.setTo(-80, 100);
          }
        }
      }
    }));
    bonusContainer.x = 80;
    bonusContainer.y = -100;
  }
  if (NORD.game.panelSettings.actionMode === 'BLACK_HOLE_MODE') {
    bonusContainer.bg.texture = NORD.assetsManager.getTexture('Blackhole');
  }

  return bonusContainer;
};

var createShadow = function createShadow(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var bonusConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var playersHit = {
    LEFT: 0,
    RIGHT: 0
  };
  var bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
    bonusType: 'KITTY',
    contactType: 'aaa',
    activateCallback: function activateCallback(ball) {
      // console.log('Meow!');
      // player = field.players[ball.playerPaddle.side === 'LEFT'?'RIGHT':'LEFT'];
      var player = field.players[ball.playerPaddle.side];
      field.emit('shadow_hit_disappear', ball);
    }
  }));
  bonusContainer.bg.texture = NORD.assetsManager.getTexture('Shadow-bubble');
  return bonusContainer;
};


var createKitty = function createKitty(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var bonusConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var playersHit = {
    LEFT: 0,
    RIGHT: 0
  };
  var bonusContainer = new NORD.Field.BonusContainer(field, Object.assign({}, containerConfig, {
    bonusType: 'KITTY',
    contactType: 'aaa',
    activateCallback: function activateCallback(ball) {
      // console.log('Meow!');
      // player = field.players[ball.playerPaddle.side === 'LEFT'?'RIGHT':'LEFT'];
      var player = field.players[ball.playerPaddle.side];
      if (this.field.roundGenerator.roundMode === 'KITTY') {

        if (MultiplayerStarted) {
          if (ball.body.velocity.x <= 0) {

            playersHit[player.side]++; // console.log('Kitty hit:', playersHit);

            if (playersHit[player.side] === 1) {
              NORD.audioManager.playAudio('kitty_hit_1');
              field.emit('kitty_hit', player);
            } else if (playersHit[player.side] > 1) {
              NORD.audioManager.playAudio('kitty_hit_2');

              field.emit('kitty_hit', player); // bonusContainer.destroy();

              if (MultiplayerStarted) {
                var seObj = new PP.ServerObject();
                seObj.eventType = NORD.PP_EVENT.EVENT_GAME_KITTY_HIT_GAMEOVER;
                NORD.gameEventHandler.sendEvent(seObj);
              }

              bonusContainer.stopMove();
              var playerGoal = field.players[ball.playerPaddle.side === 'LEFT' ? 'RIGHT' : 'LEFT'];
              field.goal(playerGoal, ball, true, {
                muteGoal: true
              });
            } // field.goal(player, ball, true);
          }
        } else {
          playersHit[player.side]++; // console.log('Kitty hit:', playersHit);

          if (playersHit[player.side] === 1) {
            NORD.audioManager.playAudio('kitty_hit_1');
            field.emit('kitty_hit', player);
          } else if (playersHit[player.side] > 1) {
            NORD.audioManager.playAudio('kitty_hit_2');

            field.emit('kitty_hit', player); // bonusContainer.destroy();

            bonusContainer.stopMove();
            var playerGoal = field.players[ball.playerPaddle.side === 'LEFT' ? 'RIGHT' : 'LEFT'];
            field.goal(playerGoal, ball, true, {
              muteGoal: true
            });
          } // field.goal(player, ball, true);
        }
      } else {
        field.emit('kitty_hit_shrink', ball);
      }
    }
  }));
  return bonusContainer;
};

var createInvisibleArea = function createInvisibleArea(field) {
  var containerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var invisibleArea = new NORD.Field.InvisibleArea(field, Object.assign({}, containerConfig));
  invisibleArea.appear();
  return invisibleArea;
};

function moveRPaddle() {
  if (RightPaddle.tweenBody != null)
    RightPaddle.tweenBody.kill();
  RightPaddle.bodyY = RightPaddle.body.position.y;
  RightPaddle.tweenBody = TweenMax.to(RightPaddle, 2, {
    bodyY: -200,
    onUpdate: tweenUpdate
  });

  function tweenUpdate() {
    console.log("Right Paddle Position Y", RightPaddle.bodyY);
    RightPaddle.setTo(RightPaddle.body.position.x, RightPaddle.bodyY);

  }
}
