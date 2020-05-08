"use strict";

// require("core-js/modules/es6.object.assign");

// require("core-js/modules/es6.string.blink");

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

NORD.Field.Wall = function(field, config) {
  //sushant wall
  if (config.type == 'BUMPER') this.container = field.contaierObstacles;
  NORD.Field.FieldObject.call(this, field);
  this.color = NORD.definitionsManager.colorYellow;
  this.type = 'WALL';
  this.wallType = config.type;
  this.ballNoCorrectVelocity = config.ballNoCorrectVelocity || false;
  if (this.wallType == 'BORDER') this.initBorderWall(config);
  if (this.wallType == 'RECT') this.initRectWall(config);
  if (this.wallType == 'DIAMOND') this.initDiamondWall(config);

  if (this.wallType == 'BUMPER') {
    this.color = 0xFFFFFF;
    this.initBumperWall(config);
  } // console.log(this.bg);


  this.updatePosition();
};

NORD.Field.Wall.prototype = Object.create(NORD.Field.FieldObject.prototype);
NORD.Field.Wall.prototype.constructor = NORD.Field.Wall;

NORD.Field.Wall.prototype.initBorderWall = function(config) {
  //const { x, y, width, height } = config;
  var x = config.x;
  var y = config.y;
  var width = config.width;
  var height = config.height; // console.log('Wall height:', height)

  this.body = Matter.Bodies.rectangle(x, y, width, height, {
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0,
    isStatic: true,
    collisionFilter: {
      category: this.field.collisionDefaultCategory
    }
  });
  this.body.fieldObject = this;
  Matter.World.add(this.field.physics, [this.body]);
  this.bg = new PIXI.Graphics();
  this.addChild(this.bg);
  // this.bg.beginFill(this.color, 1.0);
  this.bg.drawRect(0, 0, 10, 10);
  this.bg.width = width;
  this.bg.height = height;
  this.bg.x = -width / 2;
  this.bg.y = -height / 2;
};

NORD.Field.Wall.prototype.initRectWall = function(config) {
  // const { x, y, width, height } = config;
  var x = config.x;
  var y = config.y;
  var width = config.width;
  var height = config.height;
  this.wallWidth = width;
  this.wallHeight = height;
  this.body = Matter.Bodies.rectangle(x, y, width, height, {
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0,
    isStatic: true,
    collisionFilter: {
      category: this.field.collisionDefaultCategory
    }
  });
  this.body.fieldObject = this;
  Matter.World.add(this.field.physics, [this.body]);
  this.bg = new PIXI.Graphics();
  this.addChild(this.bg);
  this.bg.beginFill(this.color, 0);
  this.bg.drawRect(-10, -10, 20, 20);
  this.bg.width = width;
  this.bg.height = height;

  this.topParallelLine = Util.createSprite({
    parent: this,
    texture: 'ParallelLine',
    aX: 0.5,
    aY: 0.4,
    scaleX: 0.39,
    scaleY: 0.45
  });
  if (config.y > 0) this.topParallelLine.rotation = Math.PI;
};

NORD.Field.Wall.prototype.initDiamondWall = function(config) {
  // const { x, y, width, height } = config;
  var x = config.x;
  var y = config.y;
  var width = config.width;
  var height = config.height;
  this.wallWidth = width;
  this.wallHeight = height;
  this.body = Matter.Bodies.rectangle(x, y, width, height, {
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0,
    isStatic: true,
    collisionFilter: {
      category: this.field.collisionDefaultCategory
    }
  });
  this.body.fieldObject = this;
  Matter.World.add(this.field.physics, [this.body]);
  Matter.Body.setAngle(this.body, Math.PI / 4);
  this.bg = new PIXI.Graphics();
  this.addChild(this.bg);
  this.bg.beginFill(this.color, 0);
  this.bg.drawRect(-10, -10, 20, 20);
  this.bg.width = width;
  this.bg.height = height; // this.bg.x = -width/2;
  // this.bg.y = -height/2;


  this.diamondImage = Util.createSprite({
    parent: this,
    texture: 'DiamondMode',
    aX: 0.5,
    aY: 0.5,
    scaleX: 0.45,
    scaleY: 0.45
  });
  this.addChild(this.diamondImage);
  this.bg.rotation = this.body.angle; // console.log('Diamond created!');
};

NORD.Field.Wall.prototype.initBumperWall = function(config) {
  // const { x, y, radius } = config;
  var x = config.x;
  var y = config.y;
  var radius = config.radius; // this.wallWidth = width;
  // this.wallHeight = height;

  this.body = Matter.Bodies.circle(x, y, radius, {
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0,
    isStatic: true,
    collisionFilter: {
      category: this.field.collisionDefaultCategory
    }
  });
  this.body.fieldObject = this;
  Matter.World.add(this.field.physics, [this.body]);
  this.bg = Util.createSprite({
    atlas: 'texture_atlas',
    texture: 'bumper.png',
    parent: this,
    aX: 0.5,
    aY: 0.5
  });
  this.bg.width = this.bg.height = radius * 2; // this.bg = new PIXI.Graphics();
  // this.addChild(this.bg);
  // this.bg.beginFill(this.color, 1.0);
  // this.bg.drawCircle(0, 0, radius);
};

NORD.Field.Wall.prototype.tweenBumperHit = function() {
  var _this = this;

  TweenMax.to(this.scale, 2 / 30, {
    x: 0.9,
    y: 0.9,
    ease: Power1.easeOut,
    onComplete: function onComplete() {
      TweenMax.to(_this.scale, 2 / 30, {
        x: 1,
        y: 1,
        ease: Power1.easeOut,
        onComplete: function onComplete() {}
      });
    }
  });
};

NORD.Field.Wall.prototype.setSize = function(data) {
  if (this.wallType === 'DIAMOND') {
    // console.log('AAA:', data);
    var x = data.x || this.x;
    var y = data.y || this.y;
    var width = data.size || this.wallWidth;
    var height = data.size || this.wallHeight; // console.log('AAA:', x, y, width, height);

    this.destroyBody();
    this.initDiamondWall({
      x: x,
      y: y,
      width: width,
      height: height
    });
  } else if (this.wallType === 'RECT') {
    var _x = data.x || this.x;

    var _y = data.y || this.y;

    var _width = data.width || this.wallWidth;

    var _height = data.height || this.wallHeight;

    this.destroyBody();
    this.initRectWall({
      x: _x,
      y: _y,
      width: _width,
      height: _height
    });
  }
};

NORD.Field.Wall.prototype.destroyBody = function() {
  if (this.body) {
    this.body.fieldObject = null;
    Matter.World.remove(this.field.physics, this.body);
    this.body = null;
    this.bg.clear();
    this.removeChild(this.bg);
  }
};

NORD.Field.Wall.prototype.destroy = function() {
  if (!this.isExist) return; // console.log('Wall destroy!', this.wallType);

  this.state = 'DESTROY';

  if (this.body) {
    this.body.fieldObject = null;
    Matter.World.remove(this.field.physics, this.body);
  }

  if (this.bg.clear) this.bg.clear();
  this.removeChild(this.bg);
  NORD.Field.FieldObject.prototype.destroy.call(this);
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.Ball = function(field, x, y) {
  NORD.Field.FieldObject.call(this, field);
  this.type = 'BALL';
  this.state = 'NONE';
  this.invisibleState = 'VISIBLE';
  this.invisibleTween = null;
  this.playerPaddle = null;
  this.color = 0xFFFFFF;
  this.radius = 0;
  this.normalSpeed = 0;
  this.delayCallImpulse = null;
  this.isFirstHit = false;
  this.speedUpCounter = this.field.config.ballSpeedUpFirstHits.value;
  this.setSize(this.field.config.ballSize.value);
  this.fireTail = new FireTail(this.parent, this);
  this.updatePosition();
  this.blink = new Blink(this);
  this.clear();
  this.xPos = 0;
  this.yPos = 0;
};

NORD.Field.Ball.prototype = Object.create(NORD.Field.FieldObject.prototype);
NORD.Field.Ball.prototype.constructor = NORD.Field.Ball;

NORD.Field.Ball.prototype.init = function(x, y) {
  this.state = 'IN_GAME';
  this.isBig = this.field.ballSize == this.field.config.bblpModeBallSize.value;
  this.setSize(this.field.ballSize);
  this.setColor(0xFFFFFF);
  this.body.isSensor = true;
  this.fireSpeedUpCount = 0;
  this.speedUpCounter = this.field.config.ballSpeedUpFirstHits.value;
  this.normalSpeed = this.field.ballMinSpeed;
  this.speed = this.normalSpeed;
  this.playerPaddle = null;
  this.isFirstHit = false;


  this.ballImage = Util.createSprite({
    texture: 'Ball',
    parent: this,
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });

  if (this.invisibleTween) {
    this.invisibleTween.kill();
    this.invisibleTween = null;
  }

  this.alpha = 1.0;
  this.invisibleState = 'VISIBLE';
  this.setTo(x, y);
};

NORD.Field.Ball.prototype.clear = function(x, y) {
  if (this.state === 'WAIT') return;
  this.state = 'WAIT';
  this.playerPaddle = null;
  this.isFirstHit = false;

  if (this.invisibleTween) {
    this.invisibleTween.kill();
    this.invisibleTween = null;
  }

  this.fireTail.setEnable(false);
  this.alpha = 1.0;
  this.invisibleState = 'VISIBLE';
  this.body.isSensor = true;
  this.setTo(0, 1000);
  Matter.Body.setVelocity(this.body, {
    x: 0,
    y: 0
  });

  if (this.delayCallImpulse) {
    this.delayCallImpulse.kill();
    this.delayCallImpulse = null;
  }

  this.blink.stop();
  this.alpha = 1.0;
};

NORD.Field.Ball.prototype.setSize = function(radius) {
  this.radius = radius;
  var x = 0;
  var y = 0;
  var velocity = {
    x: 0,
    y: 0
  };

  if (this.body) {
    x = this.body.position.x;
    y = this.body.position.y;
    velocity = Object.assign({}, this.body.velocity);
    this.body.fieldObject = null;
    Matter.World.remove(this.field.physics, this.body);
  }

  this.body = Matter.Bodies.circle(x, y, this.radius, {
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0,
    density: 0.01,
    inertia: Infinity,
    slop: 0.0001,
    collisionFilter: {
      category: this.field.collisionDefaultCategory,
      mask: this.field.collisionDefaultCategory
    }
  }); // collisionFilter: { category: this.field.collisionBallCategory, mask: this.field.collisionDefaultCategory } });

  this.body.fieldObject = this;
  Matter.World.add(this.field.physics, [this.body]);
  Matter.Body.setVelocity(this.body, {
    x: velocity.x,
    y: velocity.y
  });
  this.updateGraphics();
  this.fireZoneSpeedUpCounter = 0; // this.bg.width = this.bg.height = this.radius*2 * 0.95;
  // console.log('FFFFFF:', Util.getAngleBetween(-10, 340));
  // console.log('FFFFFF:', Util.getAngleBetween(180+180, 180));
};

NORD.Field.Ball.prototype.setColor = function(color) {
  this.color = color;
  this.updateGraphics();
};

NORD.Field.Ball.prototype.updateGraphics = function() {
  if (this.bg) {
    this.bg.clear();
  } else {
    this.bg = new PIXI.Graphics();
    this.addChild(this.bg);
  }

  this.bg.beginFill(this.color, 0);
  this.bg.drawCircle(0, 0, this.radius * 0.95);
};
NORD.Field.Ball.prototype.multiBallImpulse = function(dir) {
  var _this2 = this;
  // if (MultiplayerStarted)
  //   dir = 'RIGHT';

  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var k = 60;
  var side = dir || Util.randomElement(['LEFT', 'RIGHT']);
  this.attackSide = side;
  speed = speed || this.speed;
  if (this.field.roundMode == 'BIG_BALL_LITTLE_PADDLES') speed = this.field.ballMinSpeed * 0.7; // this.speed = 0;

  var angle = side === 'LEFT' ? Util.randomRange(90 + k, 90 + 180 - k) : Util.randomRange(90 + 180 + k, 90 + 360 - k);
  this.angle = angle;
  var impulse = Util.getMoveVector(speed, angle);

  // impulse.x = 4;
  // impulse.y = 0;
  this.distortionVelocityReceived = false;
  this.ballCollideToEdge = false;
  this.velocityActivated = true;

  if (IsHost) {
    var seObj = new PP.ServerObject();
    seObj.ballPositionX = impulse.x;
    seObj.ballPositionY = impulse.y;
    if (Ball == _this2)
      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLONE_MOVEMENT;
    else
      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLTWO_MOVEMENT;

    NORD.gameEventHandler.sendEvent(seObj);

    Matter.Body.setVelocity(this.body, {
      x: impulse.x,
      y: impulse.y
    }); // console.log('Start impulse:', dir, speed, angle, impulse);

    TweenMax.delayedCall(0.5, function() {
      if (_this2.body) _this2.body.isSensor = false;
    }); // Matter.Body.applyForce(this.body, this.body.position, { x: impulse.x, y: impulse.y });
  }
  //sushant
};
NORD.Field.Ball.prototype.startImpulse = function(dir) {
  var _this2 = this;
  // if (MultiplayerStarted)
  //   dir = 'RIGHT';

  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var k = 60;
  var side = dir || Util.randomElement(['LEFT', 'RIGHT']);
  this.attackSide = side;
  speed = speed || this.speed;
  if (this.field.roundMode == 'BIG_BALL_LITTLE_PADDLES') speed = this.field.ballMinSpeed * 0.7; // this.speed = 0;

  var angle = side === 'LEFT' ? Util.randomRange(90 + k, 90 + 180 - k) : Util.randomRange(90 + 180 + k, 90 + 360 - k);
  this.angle = angle;
  var impulse = Util.getMoveVector(speed, angle);

  impulse.x = 4;
  impulse.y = 0;
  //sushant
  if (MultiplayerStarted) {
    this.distortionVelocityReceived = false;
    this.ballCollideToEdge = false;
    this.velocityActivated = true;
    if (IsHost) {
      var seObj = new PP.ServerObject();
      seObj.ballPositionX = impulse.x;
      seObj.ballPositionY = impulse.y;
      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_INITIAL_BALL_MOVEMENT;

      NORD.gameEventHandler.sendEvent(seObj);

      Matter.Body.setVelocity(this.body, {
        x: impulse.x,
        y: impulse.y
      }); // console.log('Start impulse:', dir, speed, angle, impulse);

      TweenMax.delayedCall(0.5, function() {
        if (_this2.body) _this2.body.isSensor = false;
      }); // Matter.Body.applyForce(this.body, this.body.position, { x: impulse.x, y: impulse.y });
    }
  } else {
    Matter.Body.setVelocity(this.body, {
      x: impulse.x,
      y: impulse.y
    }); // console.log('Start impulse:', dir, speed, angle, impulse);

    TweenMax.delayedCall(0.5, function() {
      if (_this2.body) _this2.body.isSensor = false;
    }); // Matter.Body.applyForce(this.body, this.body.position, { x: impulse.x, y: impulse.y });
  }
  //sushant
};

NORD.Field.Ball.prototype.delayImpulse = function(time, dir) {
  var _this3 = this;

  var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  this.blink.start(0.25);
  this.delayCallImpulse = TweenMax.delayedCall(time, function() {
    _this3.delayCallImpulse = null;

    _this3.blink.stop();

    _this3.startImpulse(dir, speed || 0);
  });
};

NORD.Field.Ball.prototype.setTo = function(x, y) {
  Matter.Body.setPosition(this.body, {
    x: x,
    y: y
  });
};

NORD.Field.Ball.prototype.getMoveAnge = function() {
  return Util.normalizeAngle(Util.angle(0, 0, this.body.velocity.x, this.body.velocity.y) * Util.TO_DEGREES);
};

NORD.Field.Ball.prototype.getMoveAngleByVelocity = function(x, y) {
  return Util.normalizeAngle(Util.angle(0, 0, x, y) * Util.TO_DEGREES);
};

NORD.Field.Ball.prototype.setMoveAnge = function(angle) {
  var speed = Util.distance(0, 0, this.body.velocity.x, this.body.velocity.y);
  var v = Util.getMoveVector(speed, angle);
  Matter.Body.setVelocity(this.body, {
    x: v.x,
    y: v.y
  });
};

NORD.Field.Ball.prototype.setInvisible = function(v) {
  var _this4 = this;

  if (v && (this.invisibleState === 'VISIBLE' || this.state === 'TO_VISIBLE')) {
    if (this.invisibleTween) this.invisibleTween.kill();
    this.invisibleState = 'TO_INVISIBLE';
    this.invisibleTween = TweenMax.to(this, 4 / 30, {
      alpha: 0,
      ease: Power2.easeOut,
      onComplete: function onComplete() {
        _this4.invisibleState = 'INVISIBLE';
        _this4.invisibleTween = null;
      }
    }); // NORD.audioManager.playAudio('ball_fire_ring');
    // console.log('INV');
  } else if (!v && (this.invisibleState === 'INVISIBLE' || this.state === 'TO_INVISIBLE')) {
    if (this.invisibleTween) this.invisibleTween.kill();
    this.invisibleState = 'TO_VISIBLE';
    this.invisibleTween = TweenMax.to(this, 4 / 30, {
      alpha: 1,
      ease: Power2.easeOut,
      onComplete: function onComplete() {
        _this4.invisibleState = 'VISIBLE';
        _this4.invisibleTween = null;
      }
    }); // console.log('VIS');
  }
};

NORD.Field.Ball.prototype.update = function() {
  NORD.Field.FieldObject.prototype.update.call(this);
  if (!this.field.isGame() || this.state !== 'IN_GAME') return;
  var self = this;
  if (this.speed > this.field.ballMaxSpeed && this.field.roundMode !== 'FIRE_ZONE') this.setSpeed(this.speed * 0.95);
  this.moveAngle = this.getMoveAnge();
  this.side = this.body.position.x > 0 ? 'RIGHT' : 'LEFT';
  this.attackSide = getAttackSide(this.moveAngle);

  function getAttackSide(angle) {
    return angle >= 90 && angle < 90 + 180 ? 'LEFT' : 'RIGHT';
  }

  //sushant
  if (MultiplayerStarted)
    this.checkMultiplayerBoundaryGoal();
  else
    this.checkGoal();
  //sushant

  if (this.field.roundGenerator.roundMode === 'DOUBLE_BALL' && this.field.getActiveBalls().length === 1) {
    if (Math.abs(this.x) < 5) {
      var delay = this.field.config.multiballModeNewBallDelay.value;
      var ball;
      if (delay) ball = this.field.placeNewBall(this.attackSide === 'LEFT' ? 'RIGHT' : 'LEFT', {
        delayBlinkTime: delay,
        speed: this.speed
      });
      else ball = this.field.placeNewBall(this.attackSide === 'LEFT' ? 'RIGHT' : 'LEFT', {
        speed: this.speed
      }); // ball.setSpeed(this.speed);
      // console.log('CCC:', ball.speed, this.speed);
    }
  }
};

NORD.Field.Ball.prototype.correctVelocity = function() {
  if (!(this.state === 'IN_GAME')) return;
  var currentAngle = Util.normalizeAngle(Util.angle(0, 0, this.body.velocity.x, this.body.velocity.y) * Util.TO_DEGREES);
  var shiftAngle = 55;
  var angle = null;
  var dif = null;
  var avaiableAngles = [360 - shiftAngle, 0 + shiftAngle, 180 - shiftAngle, 180 + shiftAngle];

  if (currentAngle >= avaiableAngles[0] || currentAngle < avaiableAngles[1] || currentAngle >= avaiableAngles[2] && currentAngle < avaiableAngles[3]) {
    return;
  }

  for (var i = 0; i < avaiableAngles.length; i++) {
    var d = getAngleDif(currentAngle, avaiableAngles[i]);

    if (dif == null || d < dif) {
      angle = avaiableAngles[i];
      dif = d;
    }
  }
  this.angle = angle;

  var impulse = Util.getMoveVector(Util.distance(0, 0, this.body.velocity.x, this.body.velocity.y), angle);

  Matter.Body.setVelocity(this.body, {
    x: impulse.x,
    y: impulse.y
  }); // Matter.Body.setVelocity(this.body, { x: this.body.velocity.x + signX*d, y: this.body.velocity.y-signY*d });

  function getAngleDif(a1, a2) {
    return Math.min(Math.abs(a2 - a1), Math.abs(a2 - a1 + 360));
  } // const corK = 2;
  // if(Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x * corK))
  // {
  //   const signX = Util.sign(this.body.velocity.x);
  //   const signY = Util.sign(this.body.velocity.y);
  //   const d = Math.abs(this.body.velocity.y) - Math.abs(this.body.velocity.x * corK);
  //   Matter.Body.setVelocity(this.body, { x: this.body.velocity.x + signX*d, y: this.body.velocity.y-signY*d });
  // }

};
//sushant
NORD.Field.Ball.prototype.checkMultiplayerBoundaryGoal = function() {
  var goalShift = 100;
  var onEdge = this.body.position.x < -this.field.config.FIELD_WIDTH / 2.2;


  if (this.body.position.x > this.field.config.FIELD_WIDTH / 4 && this.body.position.x < this.field.config.FIELD_WIDTH / 2) {
    this.stopped = false;
    this.ballCollideToEdge = false;
  }

  if (this.stopped == undefined || !this.stopped) {
    if (this.body.position.x > this.field.config.FIELD_WIDTH / 2) {
      this.stopped = true;
      var seObj = new PP.ServerObject();
      if (this == Ball)
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_BALL_POSITION;
      else
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_BALL_POSITION_ONE;
      seObj.ballPositionX = this.body.velocity.x;
      seObj.ballPositionY = this.body.velocity.y;
      NORD.gameEventHandler.sendEvent(seObj);
    }
  }

  if (this.body.position.x < -this.field.config.FIELD_WIDTH / 2.25 && !this.ballCollideToEdge) {
    this.ballCollideToEdge = true;
    console.log("balleeeeddddee");

    if (!this.velocityActivated) {
      this.velocityActivated = true;

      var positionNeedToChange = false;
      if (this.body.velocity.x <= 0)
        positionNeedToChange = true;
      Matter.Body.setVelocity(this.body, {
        x: 0,
        y: 0
      });
      if (positionNeedToChange)
        this.setTo(NORD.game.ballImpulse.bodypositionX, NORD.game.ballImpulse.bodypositionY);

      Matter.Body.setVelocity(this.body, {
        x: NORD.game.ballImpulse.x,
        y: NORD.game.ballImpulse.y
      });
      if (this.tweenSpeed != null) {
        this.tweenSpeed.kill();
        this.tweenSpeed = null;
      }

      LeftPaddle.paddleTeleporting = true;
      LeftPaddle.setTo(LeftPaddle.body.position.x, NORD.game.ballImpulse.paddleYPosition);
      LeftPaddle.visibleDelay = TweenMax.delayedCall(0.5, function() {
        LeftPaddle.paddleTeleporting = false;
      });

      NORD.game.ballImpulse.x = 0;
      NORD.game.ballImpulse.y = 0;

      if (positionNeedToChange) {
        LeftPaddle.paddleGettingTeleported = true;
        if (LeftPaddle.tweenSpeed != null)
          LeftPaddle.tweenSpeed.kill();
        LeftPaddle.tweenSpeed = TweenMax.to(LeftPaddle.body.position, 0.1, {
          x: LeftPaddle.body.position.x,
          y: NORD.game.ballImpulse.paddleYPosition
        });

        LeftPaddle.tweenSpeed = TweenMax.to(LeftPaddle.body, 0.1, {
          x: LeftPaddle.body.position.x,
          y: NORD.game.ballImpulse.paddleYPosition
        });

        LeftPaddle.setTo(LeftPaddle.body.position.x, NORD.game.ballImpulse.paddleYPosition);
        TweenMax.delayedCall(0.5, function() {
          LeftPaddle.paddleGettingTeleported = false;
        });
      }
    }
  }

  if (onEdge) {

    if (this.body.velocity.x < 0 && !this.distortionVelocityReceived) {
      // console.log("velocity Stopped");
      Matter.Body.setVelocity(this.body, {
        x: 0,
        y: 0
      });
    }

  } else {
    var isGoal = this.body.position.x > this.field.config.FIELD_WIDTH / 2 + this.radius + goalShift || this.body.position.y > this.field.config.FIELD_HEIGHT / 2 + this.field.config.WALLS_HEIGHT + goalShift;

    if (isGoal) {
      var goalPlayer = this.field.players[this.side === 'LEFT' ? 'RIGHT' : 'LEFT'];
      if (this.field.roundGenerator.roundMode !== 'DOUBLE_BALL') {
        this.field.goal(goalPlayer, this);

        var seObj = new PP.ServerObject();
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_DEFEATED;

        NORD.gameEventHandler.sendEvent(seObj);
        NORD.game.screenGame.panelPause.hide();
      } else this.field.emit('multiball_goal', {
        ball: this,
        player: goalPlayer
      });
    }
  }
};
//sushant

NORD.Field.Ball.prototype.checkGoal = function() {
  var goalShift = 100;
  var isGoal = this.body.position.x < -this.field.config.FIELD_WIDTH / 2 - this.radius - goalShift || this.body.position.x > this.field.config.FIELD_WIDTH / 2 + this.radius + goalShift || this.body.position.y < -this.field.config.FIELD_HEIGHT / 2 - this.field.config.WALLS_HEIGHT - goalShift || this.body.position.y > this.field.config.FIELD_HEIGHT / 2 + this.field.config.WALLS_HEIGHT + goalShift;

  if (isGoal) {
    var goalPlayer = this.field.players[this.side === 'LEFT' ? 'RIGHT' : 'LEFT'];
    if (this.field.roundGenerator.roundMode !== 'DOUBLE_BALL') this.field.goal(goalPlayer, this);
    else this.field.emit('multiball_goal', {
      ball: this,
      player: goalPlayer
    });
  }
};

NORD.Field.Ball.prototype.setSpeed = function(speed) {
  this.normalSpeed = speed;
  this.speed = this.normalSpeed;
  var angle = Util.angle(0, 0, this.body.velocity.x, this.body.velocity.y) * Util.TO_DEGREES;
  var impulse = Util.getMoveVector(this.speed, angle);
  Matter.Body.setVelocity(this.body, {
    x: impulse.x,
    y: impulse.y
  });
};

NORD.Field.Ball.prototype.speedUp = function(speedK) {
  if (this.field.ballSpeedUpDisable) return;
  this.speedUpCounter--;
  if (this.speedUpCounter > 0) return;
  this.speedUpCounter = this.field.config.ballSpeedUpHits.value;
  this.normalSpeed *= speedK;
  this.normalSpeed = Math.min(this.normalSpeed, this.field.ballMaxSpeed);
  this.speed = this.normalSpeed;
  var angle = Util.angle(0, 0, this.body.velocity.x, this.body.velocity.y) * Util.TO_DEGREES;
  var impulse = Util.getMoveVector(this.speed, angle);

  Matter.Body.setVelocity(this.body, {
    x: impulse.x,
    y: impulse.y
  }); // console.log('Ball speed up!', this.field.ballMaxSpeed);
};

NORD.Field.Ball.prototype.bumperSpeedUp = function(speedK) {
  this.normalSpeed *= speedK;
  this.normalSpeed = Math.min(this.normalSpeed, this.field.ballMaxSpeed);
  this.speed = this.normalSpeed;
  var angle = Util.angle(0, 0, this.body.velocity.x, this.body.velocity.y) * Util.TO_DEGREES;

  var impulse = Util.getMoveVector(this.speed, angle);
  Matter.Body.setVelocity(this.body, {
    x: impulse.x,
    y: impulse.y
  });
};

NORD.Field.Ball.prototype.fireZoneSpeedUp = function(speedK) {
  var _fireColors;

  this.bumperSpeedUp(speedK);

  if (!this.fireTail.isEnable) {
    this.fireTail.setEnable(true);
    this.fireTail.power = 0.2;
  } else this.fireTail.power = Math.min(1.0, this.fireTail.power + 0.15);

  this.fireSpeedUpCount++;
  if (this.fireSpeedUpCount > 4) this.fireSpeedUpCount = 4;
  var fireColors = (_fireColors = {}, _defineProperty(_fireColors, '1', 0xFCD8B7), _defineProperty(_fireColors, '2', 0xFABE86), _defineProperty(_fireColors, '3', 0xF89D46), _defineProperty(_fireColors, '4', 0xF67903), _fireColors);
  this.setColor(fireColors[this.fireSpeedUpCount]);
};

NORD.Field.Ball.prototype.distortionVelocity = function(paddle) {
  var k = paddle.speed / this.field.config.paddleSpeed.value; // console.log('K:', k, this.field.config.paddleSpeed.value, paddle.speed);

  if (k > 1) k = 1;
  if (k < -1) k = -1;
  var maxDistortion = 30;
  var distortion = maxDistortion * k * (paddle.side === 'RIGHT' ? -1 : 1);
  var angle = Util.normalizeAngle(Util.angle(0, 0, this.body.velocity.x, this.body.velocity.y) * Util.TO_DEGREES + distortion);
  this.angle = angle;
  var impulse = Util.getMoveVector(Util.distance(0, 0, this.body.velocity.x, this.body.velocity.y), angle);

  Matter.Body.setVelocity(this.body, {
    x: impulse.x,
    y: impulse.y
  });
};

NORD.Field.Ball.prototype.ballHitBall = function(ball) {
  if (this.body.isSensor) {
    return;
  } // console.log('Ball', ball);

  // sushant
  if (MultiplayerStarted) {
    if (IsHost) {
      this.setSpeed(this.speed);
      this.correctVelocity();

      var seObj = new PP.ServerObject();
      seObj.ballBodyPositionX = this.body.position.x;
      seObj.ballBodyPositionY = this.body.position.y;
      seObj.paddlePositionY = RightPaddle.body.position.y;
      seObj.ballPositionX = this.body.velocity.x;
      seObj.ballPositionY = this.body.velocity.y;

      if (Ball == this) {
        console.log("ball sent");
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONONE_VELOCITY;
      } else {
        console.log("ball1 sent");
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONTWO_VELOCITY;
      }
      NORD.gameEventHandler.sendEvent(seObj);
    }
  } else {
    this.setSpeed(this.speed);
    this.correctVelocity();
  }
};

NORD.Field.Ball.prototype.hitWall = function(wall) {
  var self = this;

  if (wall.wallType === 'INVISIBLE_WALL') {
    wall.blink();
    this.bumperSpeedUp(this.field.getBallSpeedUpK('INVISIBLE_WALL'));
    this.correctVelocity();
  }

  if (wall.wallType === 'BUMPER') {
    wall.tweenBumperHit();
    this.bumperSpeedUp(this.field.getBallSpeedUpK('BUMPER'));
    NORD.audioManager.playAudio('ball_hit_bumper');
    this.correctVelocity();
  } else if (this.invisibleState !== 'INVISIBLE') {
    if (this.isBig) NORD.audioManager.playAudio('wall_hit_big_ball');
    else NORD.audioManager.playAudio('wall_hit_ball');
  }

  // if (MultiplayerStarted) {
  //   if (IsHost) {
  //
  //     var seObj = new PP.ServerObject();
  //     seObj.ballBodyPositionX = this.body.position.x;
  //     seObj.ballBodyPositionY = this.body.position.y;
  //     seObj.paddlePositionY = RightPaddle.body.position.y;
  //     seObj.ballPositionX = this.body.velocity.x;
  //     seObj.ballPositionY = this.body.velocity.y;
  //
  //     if (Ball == this) {
  //       console.log("ball sent");
  //       seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONONE_VELOCITY;
  //     } else {
  //       console.log("ball1 sent");
  //       seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONTWO_VELOCITY;
  //     }
  //     NORD.gameEventHandler.sendEvent(seObj);
  //   }
  // }
  // console.log('Hit Wall:', wall, wall.wallType);
  // if(wall && !wall.ballNoCorrectVelocity) this.correctVelocity();

};

NORD.Field.Ball.prototype.hitPaddle = function(paddle) {
  var self = this;
  this.speedUp(this.field.getBallSpeedUpK('PADDLE')); // this.fireZoneSlowdown();

  // console.log('Paddle hit:', paddle.speed);
  // if((paddle.side === 'LEFT' && this.body.velocity.x < 0 && this.body.position.x > paddle.body.position.x) ||
  //    (paddle.side === 'RIGHT' && this.body.velocity.x > 0 && this.body.position.x < paddle.body.position.x))

  if (paddle.side === 'LEFT' && this.body.velocity.x < 0 && this.body.position.x + this.radius + 5 > paddle.body.position.x || paddle.side === 'RIGHT' && this.body.velocity.x > 0 && this.body.position.x - this.radius - 5 < paddle.body.position.x) {
    Matter.Body.setVelocity(this.body, {
      x: this.body.velocity.x * -1,
      y: this.body.velocity.y
    });
  }

  this.distortionVelocity(paddle);
  this.correctVelocity();

  if (paddle.side === 'LEFT' && this.body.velocity.x < 0 && this.body.position.x + this.radius + 5 > paddle.body.position.x || paddle.side === 'RIGHT' && this.body.velocity.x > 0 && this.body.position.x - this.radius - 5 < paddle.body.position.x) {
    Matter.Body.setVelocity(this.body, {
      x: this.body.velocity.x * -1,
      y: this.body.velocity.y
    });
  }

  if (!this.isFirstHit && this.field.roundMode == 'BIG_BALL_LITTLE_PADDLES') {
    this.setSpeed(this.field.ballMinSpeed);
  }

  //sushant
  if (MultiplayerStarted) {
    if (paddle.side == "RIGHT") {
      console.log("distortionVelocity send --- " + this.body.velocity.x);
      var seObj = new PP.ServerObject();
      seObj.ballBodyPositionX = this.body.position.x;
      seObj.ballBodyPositionY = this.body.position.y;
      seObj.paddlePositionY = paddle.body.position.y;
      seObj.ballPositionX = this.body.velocity.x;
      seObj.ballPositionY = this.body.velocity.y;

      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTION_VELOCITY;

      NORD.gameEventHandler.sendEvent(seObj);
      Matter.Body.setVelocity(this.body, {
        x: this.body.velocity.x,
        y: this.body.velocity.y
      });
    }
  }
  //sushant

  this.playerPaddle = paddle;
  var p = paddle.side === 'LEFT' ? 'player1' : 'player2';
  if (this.isBig) NORD.audioManager.playAudio(p + '_hit_big_ball');
  else NORD.audioManager.playAudio(p + '_hit_ball');
  this.isFirstHit = true;

  // this.getTotalDuration();
};

NORD.Field.Ball.prototype.getTotalDuration = function() {

  var config = NORD.game.field.config;
  var diagonalLength = Util.calcHypotenuse(config.FIELD_WIDTH, config.FIELD_HEIGHT);
  var ballDetails = {
    x: this.body.position.x,
    y: this.body.position.y,
    vx: this.body.velocity.x,
    vy: this.body.velocity.y
  };
  var isMoveingFroward = ballDetails.x < 0 ? true : false;
  var xxP = isMoveingFroward ? NORD.game.field.paddleRight.position.x : NORD.game.field.paddleLeft.position.x;

  var itReachedSideWall = false;
  var totalDistance = 0;
  var topPosY = NORD.game.field.wallTop.position.y;
  var bottomPosY = NORD.game.field.wallBot.position.y;

  while (!itReachedSideWall) {
    var moveAngle = this.getMoveAngleByVelocity(ballDetails.vx, ballDetails.vy);
    var targetPosition = Util.getMoveVector(diagonalLength, moveAngle);

    var yyP = Util.getSlopePoint(xxP, ballDetails.x, targetPosition.x, ballDetails.y, targetPosition.y);
    if (Util.isBetween(yyP, bottomPosY, topPosY)) {
      totalDistance += Util.distance(ballDetails.x, ballDetails.y, xxP, yyP);
      itReachedSideWall = true;
    } else {
      var yyP = ballDetails.y < 0 ? NORD.game.field.wallBot.position.y : NORD.game.field.wallTop.position.y;
      var xxP = Util.getSlopePoint(yyP, this.body.position.y, targetPosition.y, this.body.position.x, targetPosition.x);
      totalDistance += Util.distance(ballDetails.x, ballDetails.y, xxP, yyP);
      posVelocity.x = xxP;
      posVelocity.y = yyP;
      posVelocity.vy *= -1;
    }
  }

  this.xPos = totalDistance;
  var duration = (totalDistance / (this.body.speed));
  duration = duration / 60;
  NORD.ball = this;
  console.log(" Target Pos ", xxP, " ", yyP, " D", totalDistance, " Dur ", duration);

  NORD.ball.tempTween = TweenMax.to(this, duration, {
    xPos: 0,
    onUpdate: function() {
      console.log("Ball Position--->", NORD.ball.body.position.x, NORD.ball.xPos);
      if (NORD.ball.xPos <= 0) {
        console.log("Ball Position--->Inside", NORD.ball.body.position.x, NORD.ball.xPos);

      }
    }
  });

};

//==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


var FireTail = function FireTail(container, ball) {
  this.isExist = true;
  this.isEnable = false;
  this.ball = ball;
  this.container = container;
  this.power = 0.6;
  this.powerCounter = 5;
  this.counter = 0; // TweenMax.to(this, 5.0, { power: 1.0 });

  NORD.app.on('update', this.update, this);
};

FireTail.prototype.setEnable = function(isEnable) {
  if (this.isEnable === isEnable) return;
  this.isEnable = isEnable;
};

FireTail.prototype.update = function() {
  if (!this.isExist || !this.isEnable || !this.ball || this.ball.moveAngle == undefined || NORD.game.field.state.getState().pause === 'TRUE') return;
  this.counter++;

  if (this.counter >= 1 + this.powerCounter * (1 - this.power)) {
    this.counter = 0;
    createParticle({
      x: this.ball.x,
      y: this.ball.y,
      container: this.container,
      angle: this.ball.moveAngle + 180 + Util.randomRange(-50, 50)
    });
  }
};

var createParticle = function createParticle(data) {
  var particle = {
    isExist: true
  };
  particle.sprite = Util.createSprite({
    atlas: 'texture_atlas',
    texture: 'fire_tail_p_1.png',
    parent: data.container,
    aX: 0.5,
    aY: 0.5
  });
  var p2 = Util.getMoveVector(10, data.angle);
  particle.sprite.x = data.x + p2.x;
  particle.sprite.y = data.y + p2.y;
  var distance = Util.randomRange(10, 40);
  var time = Util.randomRange(0.9, 1.9);
  var p = Util.getMoveVector(distance, data.angle);
  particle.sprite.scale.x = particle.sprite.scale.y = Util.randomRange(0.8, 1.4);
  particle.tween2 = TweenMax.to(particle.sprite.scale, time, {
    alpha: 0.0,
    x: 0.4,
    y: 0.4,
    ease: Power2.easeOut
  });
  particle.tween = TweenMax.to(particle.sprite, time, {
    alpha: 0.0,
    x: particle.sprite.x + p.x,
    y: particle.sprite.y + p.y,
    ease: Power2.easeOut,
    onComplete: function onComplete() {
      particle.tween2 = null;
      particle.tween = null;
      particle.destroy();
    }
  });

  particle.destroy = function() {
    if (!particle.isExist) return;
    particle.isExist = false;
    particle.sprite.visible = false;
    particle.sprite.parent.removeChild(particle.sprite);
    particle.sprite.destroy();
    particle.sprite = null;

    if (particle.tween) {
      particle.tween.kill();
      particle.tween = null;
    }

    if (particle.tween2) {
      particle.tween2.kill();
      particle.tween2 = null;
    }
  };
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


var Blink = function Blink(object) {
  var _this5 = this;

  this.object = object;
  this.time = 0;
  this.period = 0;
  this.delayedCall = null;
  this.stopDelayCall = null;
  this.isBlink = false;

  this.start = function(period) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    _this5.isBlink = true;

    if (_this5.stopDelayCall) {
      _this5.stopDelayCall.kill();

      _this5.stopDelayCall = null;
    }

    loop('UP', period);

    if (time > 0) {
      _this5.stopDelayCall = TweenMax.delayedCall(time, function() {
        _this5.stopDelayCall = null;

        _this5.stop();
      });
    }
  };

  this.stop = function() {
    var isVisible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    _this5.isBlink = false;

    if (_this5.delayedCall) {
      _this5.delayedCall.kill();

      _this5.delayedCall = null;
    }

    if (_this5.stopDelayCall) {
      _this5.stopDelayCall.kill();

      _this5.stopDelayCall = null;
    }

    if (isVisible) _this5.object.alpha = 1.0;
    else _this5.object.alpha = 0.0;
  };

  var loop = function loop(dir, period) {
    if (dir == 'UP') {
      _this5.object.alpha = 1.0;
    }

    if (dir == 'DOWN') {
      _this5.object.alpha = 0.0;
    }

    _this5.delayedCall = TweenMax.delayedCall(period, function() {
      _this5.delayedCall = null;
      loop(dir == 'UP' ? 'DOWN' : 'UP', period);
    });
  };
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.Paddle = function(field, side) {
  NORD.Field.FieldObject.call(this, field);
  this.type = 'PADDLE';
  this.color = 0xFFFFFF;
  this.bonuses = [];
  this.side = side;
  this.shootsCount = 0;
  this.shootsMode = 'OFF';
  this.isStun = false;
  this.isStunned = false;
  this.stunDelay = null; // this.speed = this.field.config.paddleSpeed.value;

  this.speed = 0;
  this.maxSpeed = this.field.config.paddleSpeed.value;
  this.tweenSpeed = null;
  this.moveState = 'STOP';
  this.field.config.paddleDeceleration.on('change', function(data) {
    this.updateDeccelerationRation();
  }, this);
  this.updateDeccelerationRation();
  this.tutUp = Util.createSprite({
    atlas: 'texture_atlas',
    texture: 'tut_p' + (side === 'LEFT' ? 2 : 1) + '_up.png',
    parent: this,
    aX: 0.5,
    aY: 0.5,
    y: 0,
    scaleXY: 0.7
  });
  this.tutDown = Util.createSprite({
    atlas: 'texture_atlas',
    texture: 'tut_p' + (side === 'LEFT' ? 2 : 1) + '_down.png',
    parent: this,
    aX: 0.5,
    aY: 0.5,
    y: 0,
    scaleXY: 0.7
  });
  this.tutUp.visible = this.tutDown.visible = false; // this.shootViewTexture1 = NORD.assetsManager.getTexture('texture_atlas', 'gun_1.png');
  // this.shootViewTexture2 = NORD.assetsManager.getTexture('texture_atlas', 'gun_2.png');

  this.shootView = Util.createSprite({
    texture: 'Bullet-tip',
    parent: this,
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.5
  });

  var shootShift = 10;

  if (this.side === 'LEFT') {
    this.paddleViewImage = Util.createSprite({
      texture: 'leftPaddle',
      parent: this,
      aX: 0.8,
      aY: 0.5,
      scaleXY: 0.5
    });
  } else {
    this.paddleViewImage = Util.createSprite({
      texture: 'rightPaddle',
      parent: this,
      aX: 0.2,
      aY: 0.5,
      scaleXY: 0.5
    });
  }

  this.shootViewPaddleTexture = Util.createSprite({
    texture: 'Stun-GUn',
    parent: this,
    aX: 0.65,
    aY: 0.5,
    scaleXY: 0.4
  });

  if (this.side === 'LEFT') {
    this.shootView.x = shootShift;
  } else {
    this.shootView.x = -shootShift;
    this.shootView.rotation = Math.PI;
    this.shootViewPaddleTexture.rotation = Math.PI;
  }

  this.shootViewPaddleTexture.visible = false;
  this.shootView.visible = false;
  this.shootViewTween = null; // this.shootsTotalDefault = 2;
  // this.shootsTotal = this.shootsTotalDefault;

  this.blinkShootView = new Blink(this.shootView);
  this.blinkPaddle = new Blink(this); // this.body = Matter.Bodies.circle(0, 0, 3, { isStatic: true, inertia: Infinity, restitution: 1.0, friction: 0.0, frictionStatic: 0.0, frictionAir: 0.0, inertia: Infinity, slop: 0.00001 }, 100);
  // Matter.World.add(this.field.physics, [this.body]);
  // this.bg = Util.createSprite({ atlas: 'texture_atlas', texture: 'paddle.png', parent: this, aX: 0.5, aY: 0.5 });
  // this.paddleMask = new PIXI.Graphics();
  // this.addChild(this.paddleMask);
  // this.paddleMask.beginFill(0xFFFFFF);
  // this.paddleMask.drawRect(0, -400, 200, 800);
  // this.bg.mask = this.paddleMask;
  // this.paddleMask.interactive = true;

  this.touchArea = Util.createSprite({
    atlas: 'texture_atlas',
    texture: 'paddle.png',
    parent: this,
    aX: 0.5,
    aY: 0.5
  });
  this.touchArea.interactive = true;
  this.touchArea.width = 400;
  this.touchArea.height = 1200;
  this.touchArea.alpha = 0;
  this.interactive = true;
  this.paddleView = new PaddleView2();
  this.addChild(this.paddleView);
  this.paddleView.on('change', function(data) { // this.updatePaddle();
  }, this);
  this.setSize(this.field.config.paddleSize.value, this.field.config.paddleShape.value);
  this.field.config.paddleShape.on('change', function(data) {
    this.setSize(this.field.config.paddleSize.value, this.field.config.paddleShape.value);
  }, this);
  this.field.config.paddleSize.on('change', function(data) {
    this.setSize(this.field.config.paddleSize.value, this.field.config.paddleShape.value);
  }, this); // this.field.config.paddlePlatformSize.on('change', function(data)
  // {
  //   this.setSize(this.field.config.paddleShape.value, this.field.config.paddleSize.value);
  // }, this);
  // console.log('F:', this);
  // this.updatePosition();
};

NORD.Field.Paddle.prototype = Object.create(NORD.Field.FieldObject.prototype);
NORD.Field.Paddle.prototype.constructor = NORD.Field.Paddle;

NORD.Field.Paddle.prototype.setTut = function(v) {
  var size = this.paddleView.paddleWidth / 2 + 20;
  this.tutUp.y = -size;
  this.tutDown.y = size;
  this.tutUp.visible = this.tutDown.visible = v; // console.log('Set tut:', v, size);
};

NORD.Field.Paddle.prototype.setShootView = function(isShow) {
  if (isShow && !this.shootView.visible) {
    this.shootView.visible = true;
    this.shootViewPaddleTexture.visible = true;
    this.shootView.alpha = 1.0; // this.blinkShootView.start(0.25, 1.0);
  } else if (!isShow && this.shootView.visible) {
    this.shootView.visible = false;
    this.shootViewPaddleTexture.visible = false;
    this.blinkShootView.stop();
  }
};

NORD.Field.Paddle.prototype.addShoots = function() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  this.shootsCount += count;
  this.setShootsMode('ON');
  this.field.emit('gun_ready', this);
};

NORD.Field.Paddle.prototype.setShootsMode = function(mode) {
  if (this.shootsMode === mode) return;
  this.shootsMode = mode;
  if (this.shootsMode == 'ON') this.setShootView(true);
  else this.setShootView(false);
};

NORD.Field.Paddle.prototype.shoot = function() {
  if (MultiplayerStarted) {
    if (this.side == "RIGHT") {
      var seObj = new PP.ServerObject();
      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_SHOOT;
      seObj.paddlePositionY = this.y;

      NORD.gameEventHandler.sendEvent(seObj);
    }
  }

  var _this6 = this;

  if (this.shootsCount <= 0) return;
  this.shootsCount--;
  if (this.shootsCount === 0) this.setShootsMode('OFF');
  var bullet = new NORD.Field.PaddleBullet(this.field, {
    paddle: this
  });

  //sushant
  this.currentBullet = bullet;

  NORD.audioManager.playAudio('blaster_shoot');

  if (this.shootsCount === 0) {
    this.shootReload = TweenMax.delayedCall(this.field.config.gunModeReload.value, function() {
      _this6.shootReload = null; // this.shootsTotal --;

      _this6.addShoots(1);
    });
  }

  this.field.emit('gun_shoot', this);
};

NORD.Field.Paddle.prototype.stun = function() {
  var _this7 = this;

  // this.stopMove();
  // this.isStun = true;
  // return;
  if (this.stunDelay !== null) this.stunDelay.kill();
  this.stunDelay = TweenMax.delayedCall(0.7, function() {
    _this7.stunDelay = null; // this.isStun = false;

    _this7.blinkPaddle.stop();

    _this7.alpha = 1.0;
  });
  this.blinkPaddle.start(0.10);
};

NORD.Field.Paddle.prototype.updateDeccelerationRation = function() {
  this.deccelerationEase = Power2.easeOut;
  this.deccelerationSpeedRation = 0;

  for (var i = 0; i < this.field.config.paddleDeceleration.value * 60; i++) {
    this.deccelerationSpeedRation += 1 - Power2.easeOut.getRatio(i / (this.field.config.paddleDeceleration.value * 60));
  }
};

NORD.Field.Paddle.prototype.init = function(player) {
  this.clear();
  this.player = player;
  if (this.player.type === 'AI') this.controller = new NORD.Field.PaddleControllerAI(this.field, this);
  else if (this.player.type === 'HUMAN') this.controller = new NORD.Field.PaddleControllerHuman(this.field, this); // this.controller = new NORD.Field.PaddleControllerHuman(this.field, this);

  this.setTo(this.sidePosition, 0);
  this.visible = true;
  this.paddleViewImage.scale.y = 0.5;
  this.shootViewPaddleTexture.visible = false;
};

NORD.Field.Paddle.prototype.clear = function() {
  this.setSize(this.field.config.paddleSize.value, this.field.config.paddleShape.value);
  this.player = null;
  if (this.controller) this.controller.destroy();
  this.controller = null; // this.shootsTotal = this.shootsTotalDefault;

  this.speed = 0;
  this.moveState = 'STOP';

  if (this.tweenSpeed !== null) {
    this.tweenSpeed.kill();
    this.tweenSpeed = null;
  }

  if (this.shootReload) {
    this.shootReload.kill();
    this.shootReload = null;
  }

  if (this.shootViewTween) {
    this.shootViewTween.kill();
    this.shootViewTween = null;
  }

  this.shootView.visible = false;

  while (this.bonuses.length) {
    this.bonuses[0].destroy();
  }

  this.shootsCount = 0;
  this.shootsMode = 'OFF';
  this.blinkPaddle.stop();
  this.alpha = 1.0;
  this.blinkShootView.stop();
  this.shootView.visible = false;
  this.isStun = false;
  if (this.stunDelay !== null) this.stunDelay.kill();
  this.stunDelay = null;
};

NORD.Field.Paddle.prototype.addBonus = function(bonus) {
  this.bonuses.push(bonus);
  this.applyBonuses();
};

NORD.Field.Paddle.prototype.removeBonus = function(bonus) {
  var n = this.bonuses.indexOf(bonus);
  this.bonuses.splice(n, 1);
  this.applyBonuses();
};

NORD.Field.Paddle.prototype.applyBonuses = function() {
  var _this8 = this;

  // this.setSize(this.field.config.paddleSize.value, this.field.config.paddleShape.value);
  var size = this.field.config.paddleSize.value;
  var controlPoints = this.field.config.paddleShape.value;
  var maxSpeed = this.field.config.paddleSpeed.value;
  this.bonuses.forEach(function(bonus) {
    if (bonus.type === 'PADDLE_SIZE') size = bonus.paddleSize;
    else if (bonus.type === 'PADDLE_SPEED') maxSpeed = _this8.field.config.paddleSpeed.value * bonus.speedK;
  });
  if (this.paddleView.size !== size) this.setSize(size, controlPoints);
  if (this.maxSpeed !== maxSpeed) this.maxSpeed = maxSpeed;
};

NORD.Field.Paddle.prototype.setSize = function(size, controlPoints) {
  this.paddleView.size = size;
  this.paddleView.controlPoints = controlPoints;
  this.paddleView.updatePaddle();
  this.size = this.paddleView.paddleWidth;
  this.sidePosition = this.field.config.PADDLE_SHIFT * (this.side === 'LEFT' ? -1 : 1);
  this.updatePaddle();
};

NORD.Field.Paddle.prototype.updatePaddle = function() {
  var _Matter$Bodies$fromVe;

  var y = 0;

  if (this.body) {
    y = this.body.position.y;
    this.body.fieldObject = null;
    Matter.World.remove(this.field.physics, this.body);
  }

  var vertices = this.paddleView.getPoints(this.side == 'LEFT' ? -Math.PI / 2 : Math.PI / 2);
  this.body = Matter.Bodies.fromVertices(this.sidePosition, y, vertices, (_Matter$Bodies$fromVe = {
    isStatic: true,
    inertia: Infinity,
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0
  }, _defineProperty(_Matter$Bodies$fromVe, "inertia", Infinity), _defineProperty(_Matter$Bodies$fromVe, "slop", 0.00001), _defineProperty(_Matter$Bodies$fromVe, "collisionFilter", {
    category: this.field.collisionDefaultCategory,
    mask: this.field.collisionBallCategory | this.field.collisionBulletCategory
  }), _Matter$Bodies$fromVe));
  this.body.fieldObject = this;

  //sushant
  // if (MultiplayerStarted) {
  //   if (this.side == "RIGHT") {
  //     Matter.World.add(this.field.physics, [this.body]); // console.log('AAA:', this.body, this);
  //   }
  // } else
  //   Matter.World.add(this.field.physics, [this.body]); // console.log('AAA:', this.body, this);
  // //sushant
  Matter.World.add(this.field.physics, [this.body]); // console.log('AAA:', this.body, this);

  this.paddleView.rotation = this.side == 'LEFT' ? Math.PI / 2 : -Math.PI / 2;
  this.paddleView.visible = false;

  if (!this.graphics) {
    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);
  }

  this.graphics.clear();
  this.drawPaddle();
  this.checkBounds(); // this.paddleView.x = -this.paddleView.paddleHeight/2 * (this.side == 'LEFT'?-1:1);
  // console.log(this.paddleView.paddleHeight);
};

NORD.Field.Paddle.prototype.drawPaddle = function() {
  var bbb = this.body;

  var drawBody = function drawBody(body) {
    if (body.parts && body.parts.length > 1) {
      body.parts.forEach(function(b, i) {
        if (i == 0) return;
        drawBody(b);
      });
    } else {
      mainGraphics.lineStyle(0, 0xFFFFFF);
      mainGraphics.beginFill(0xFFFFFF, 0);
      var vertices = body.vertices.map(function(p) {
        return {
          x: p.x - bbb.position.x,
          y: p.y - bbb.position.y
        };
      });
      var startVert = vertices[0];
      mainGraphics.moveTo(startVert.x, startVert.y);
      vertices.forEach(function(vert, n) {
        if (n === 0) return;
        mainGraphics.lineTo(vert.x, vert.y);
      });
      mainGraphics.lineTo(startVert.x, startVert.y);
    }
  };

  var mainGraphics = this.graphics;
  mainGraphics.clear();
  drawBody(this.body);
};

NORD.Field.Paddle.prototype.setTo = function(x, y) {
  Matter.Body.setPosition(this.body, {
    x: x,
    y: y
  });
};

NORD.Field.Paddle.prototype.moveToSoft = function(y) {
  if (this.isStun) return;
  var side = y > this.body.position.y ? 'DOWN' : 'UP';
  var distance = Math.abs(y - this.body.position.y);
  var isRightMove = Util.sign(this.speed) === (side === 'UP' ? -1 : 1);
  var acceleration = this.field.config.paddleAcceleration.value;
  var decceleration = this.field.config.paddleDeceleration.value;
  var absSpeed = Math.abs(this.speed);

  if (distance < 5) {
    this.stopMove();
    return;
  }

  if (isRightMove) {
    var stopDistance = absSpeed * this.deccelerationSpeedRation * 0.7;

    if (distance <= stopDistance) {
      // if(this === this.field.paddleRight) console.log('StopDistance:', stopDistance, 'Distance:', distance);
      this.stopMove();
      return;
    }
  } // if(this === this.field.paddleRight) console.log('Side:', side);


  this.moveTo(side);
}; // NORD.Field.Paddle.prototype.moveTo = function(y)
// {
//   if(this.field.state.getState().gamePhase !== 'GAME') return;
//
//   var acceleration = this.field.config.paddleAcceleration.value;
//
//   var dir = y > this.body.position.y ? 'DOWN':'UP';
//   if(dir === 'UP')
//   {
//     this.speed -= acceleration;
//   }
//   else if(dir === 'DOWN')
//   {
//     this.speed += acceleration;
//   }
//
//   if(Math.abs(this.speed) > this.field.config.paddleSpeed.value)
//   {
//     this.speed = this.field.config.paddleSpeed.value * Util.sign(this.speed);
//   }
//
//   this.moveCounter = 3;
// }


NORD.Field.Paddle.prototype.moveTo = function(p) {
  if (!this.field.isGame()) return;
  if (this.isStun) return;
  var self = this;
  var side = 'NONE';
  if (typeof p !== 'string') side = p > this.body.position.y ? 'DOWN' : 'UP';
  else side = p;
  if (side === 'NONE') return;
  if (this.moveState === side) return;

  if (this.tweenSpeed !== null) {
    this.tweenSpeed.kill();
    this.tweenSpeed = null;
  }

  var targetSpeed = this.maxSpeed * (side === 'UP' ? -1 : 1);
  var acceleration = this.field.config.paddleAcceleration.value; // if(this.moveState === 'STOP' || this.moveState === 'STOPING')
  // {

  this.moveState = side;
  this.tweenSpeed = TweenMax.to(this, acceleration, {
    speed: targetSpeed,
    ease: Power4.easeOut,
    onComplete: function onComplete() {
      self.tweenSpeed = null;
    }
  }); // if(this === this.field.paddleRight) console.log(targetSpeed);
  // }

};

NORD.Field.Paddle.prototype.stopMove = function() {
  if (this.moveState === 'STOP' || this.moveState === 'STOPING') return;
  var self = this;
  this.moveState = 'STOPING';
  if (this.tweenSpeed !== null) this.tweenSpeed.kill();
  var decceleration = this.field.config.paddleDeceleration.value; // const ty = this.body.position.y;

  this.tweenSpeed = TweenMax.to(this, decceleration, {
    speed: 0,
    ease: this.deccelerationEase,
    onComplete: function onComplete() {
      self.moveState = 'STOP';
      self.tweenSpeed = null; // console.log('SSS:', Math.abs(self.body.position.y - ty));
    }
  });

};

NORD.Field.Paddle.prototype.checkBounds = function() {
  var topBorder = -this.field.config.FIELD_HEIGHT / 2 + this.size / 2 + 10;
  var botBorder = this.field.config.FIELD_HEIGHT / 2 - this.size / 2 - 10;
  var pos = this.body.position.y + this.speed;

  if (pos < topBorder) {
    this.speed = 0;
    pos = topBorder;

    if (this.tweenSpeed !== null) {
      this.tweenSpeed.kill();
      this.tweenSpeed = null;
    }

    this.moveState = 'STOP';
  } else if (pos > botBorder) {
    this.speed = 0;
    pos = botBorder;

    if (this.tweenSpeed !== null) {
      this.tweenSpeed.kill();
      this.tweenSpeed = null;
    }

    this.moveState = 'STOP';
  }

  this.setTo(this.body.position.x, pos);
};

NORD.Field.Paddle.prototype.update = function() {
  NORD.Field.FieldObject.prototype.update.call(this);
  if (!this.isExist || !this.field.isGame()) return; // this.applyBonuses();

  this.checkBounds(); // if(this === this.field.paddleRight) console.log('DDD', this.speed);

  var decceleration = this.field.config.paddleDeceleration.value;

  if (this.moveState !== 'STOP' && this.moveState !== 'STOPING') {
    if (this.speed > this.maxSpeed) this.speed *= 0.95;
  }

  if (this.moveCounter === 0) {
    // this.speed *= 0.95;
    // if(Math.abs(this.speed) <= decceleration) this.speed = 0;
    // else this.speed += -1*Util.sign(this.speed)*decceleration;
    if (Math.abs(this.speed) <= 0.05) this.speed = 0;
    else this.speed *= decceleration;
  } else if (this.moveCounter > 0) this.moveCounter--;


  //sushant
  if (MultiplayerStarted) {
    if (this.side == "RIGHT") {
      if (this.y != this.previousPositionY) {
        this.previousPositionY = this.y;

        var seObj = new PP.ServerObject();
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_POSITION;
        seObj.paddlePositionY = this.y;
        NORD.gameEventHandler.sendEvent(seObj);
      }
    }

  }
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.PaddleBullet = function(field, config) {
  NORD.Field.FieldObject.call(this, field);
  this.isExist = true;
  this.type = 'PADDLE_BULLET';
  this.radius = 20;
  this.paddle = config.paddle;
  if (this.paddle.side === 'LEFT') this.rotation = 180 * Util.TO_RADIANS;
  var _this$paddle$body$pos = this.paddle.body.position,
    x = _this$paddle$body$pos.x,
    y = _this$paddle$body$pos.y;
  var moveK = this.paddle.side === 'LEFT' ? 1 : -1;
  this.speed = field.config.bonusShootBulletSpeed.value * (this.paddle.side === 'LEFT' ? 1 : -1); // this.speed = -3;

  x += 60 * moveK;
  this.body = Matter.Bodies.circle(x, y, this.radius, {
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0,
    density: 0.01,
    inertia: Infinity,
    slop: 0.00001,
    // collisionFilter: { category: this.field.collisionBallCategory, mask: this.field.collisionDefaultCategory } });
    collisionFilter: {
      category: this.field.collisionBulletCategory,
      mask: this.field.collisionDefaultCategory
    }
  });
  this.body.isSensor = true; // Matter.Body.setSensor(this.body, true);

  this.body.fieldObject = this;
  Matter.World.add(this.field.physics, [this.body]); // this.bg = new PIXI.Graphics();
  // this.addChild(this.bg);
  // this.bg.beginFill(0xFFFFFF, 1.0);
  // this.bg.drawCircle(0, 0, this.radius * 0.7);

  this.bg = Util.createSprite({
    parent: this,
    texture: 'Bullet',
    aX: 0.5,
    aY: 0.5,
    scaleXY: 0.4
  });
  this.updatePosition();
};

NORD.Field.PaddleBullet.prototype = Object.create(NORD.Field.FieldObject.prototype);
NORD.Field.PaddleBullet.prototype.constructor = NORD.Field.PaddleBullet;

NORD.Field.PaddleBullet.prototype.hitPaddle = function(paddle) {
  // console.log('hit!!!', this.paddle.side + ' => ' + paddle.side);
  if (MultiplayerStarted) {
    if (paddle.side == "RIGHT") {
      paddle.stun();
      NORD.audioManager.playAudio('shoot_hit');
      this.field.emit('bullet_hit_paddle', paddle);
      this.destroy();


      var seObj = new PP.ServerObject();
      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_PADDLE_BALL_SHOOT_RECEIVED;
      seObj.paddlePositionY = this.y;

      NORD.gameEventHandler.sendEvent(seObj);
    }
  } else {
    if (paddle.side !== this.paddle.side) {
      paddle.stun();
      NORD.audioManager.playAudio('shoot_hit');
      this.field.emit('bullet_hit_paddle', paddle);
      this.destroy();
    }
  }
};

NORD.Field.PaddleBullet.prototype.update = function() {
  NORD.Field.FieldObject.prototype.update.call(this);
  if (!this.isExist || this.isStop || !this.field.isGame()) return;
  Matter.Body.setPosition(this.body, {
    x: this.body.position.x + this.speed,
    y: this.body.position.y
  });
  if (this.body.position.x < -400 || this.body.position.x > 400) this.destroy();
};

NORD.Field.PaddleBullet.prototype.destroy = function() {
  if (!this.isExist) return; // console.log('Bullet destroy!');

  this.state = 'DESTROY';

  if (this.body) {
    this.body.fieldObject = null;
    Matter.World.remove(this.field.physics, this.body);
  } // this.bg.clear();


  this.removeChild(this.bg);
  NORD.Field.FieldObject.prototype.destroy.call(this);
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//


NORD.Field.InvisibleWall = function(field, config) {
  NORD.Field.FieldObject.call(this, field);
  this.isExist = true;
  this.type = 'WALL';
  this.wallType = 'INVISIBLE_WALL';
  this.blinkTime = config.blinkTime;
  this.color = 0xFFFFFF;
  this.stateVisible = 'hide';
  this.visibleDelay = null;
  this.setSize(config);
  this.updatePosition();
};

NORD.Field.InvisibleWall.prototype = Object.create(NORD.Field.FieldObject.prototype);
NORD.Field.InvisibleWall.prototype.constructor = NORD.Field.InvisibleWall;

NORD.Field.InvisibleWall.prototype.setSize = function(config) {
  // const { x, y, width, height } = config;
  var x = config.x;
  var y = config.y;
  var width = config.width;
  var height = config.height;
  this.wallWidth = width;
  this.wallHeight = height;
  this.body = Matter.Bodies.rectangle(x, y, width, height, {
    restitution: 1.0,
    friction: 0.0,
    frictionStatic: 0.0,
    frictionAir: 0.0,
    isStatic: true,
    collisionFilter: {
      category: this.field.collisionDefaultCategory
    }
  });
  this.body.fieldObject = this;
  Matter.World.add(this.field.physics, [this.body]);
  this.bg = new PIXI.Graphics();
  this.addChild(this.bg); // this.bg.beginFill(this.color, 1.0);

  this.bg.lineStyle(5.0, 0xFFFFFF);
  this.bg.drawRect(-this.wallWidth / 2 + 2.5, -this.wallHeight / 2 + 2.5, this.wallWidth - 5, this.wallHeight - 5); // this.bg.width = width;
  // this.bg.height = height;

  this.bg.visible = this.stateVisible === 'show' ? true : false;
};

NORD.Field.InvisibleWall.prototype.blink = function() {
  var _this9 = this;

  this.stateVisible = 'show';
  if (this.visibleDelay) this.visibleDelay.kill();
  this.bg.visible = true;
  this.visibleDelay = TweenMax.delayedCall(this.blinkTime, function() {
    _this9.visibleDelay = null;
    _this9.stateVisible = 'hide';
    _this9.bg.visible = false;
  }); // console.log('Blink!');
};

NORD.Field.InvisibleWall.prototype.update = function() {
  NORD.Field.FieldObject.prototype.update.call(this);
};

NORD.Field.InvisibleWall.prototype.destroy = function() {
  if (!this.isExist) return;
  this.state = 'DESTROY';

  if (this.visibleDelay) {
    this.visibleDelay.kill();
    this.visibleDelay = null;
  }

  this.stateVisible = 'hide';

  if (this.body) {
    this.body.fieldObject = null;
    Matter.World.remove(this.field.physics, this.body);
  }

  this.bg.clear();
  this.removeChild(this.bg);
  NORD.Field.FieldObject.prototype.destroy.call(this);
}; //==========================================================================================================================================//
//==========================================================================================================================================//
//==========================================================================================================================================//
