var PP = function PP() {};

PP.SERVER_USING = {
  Photon: 1,
  SmartFox: 2
}
PP.server_using = PP.SERVER_USING.Photon;

NORD.gameEventHandler = null;

NORD.GameEventHandler = function() {

  NORD.gameEventHandler = this;
};

NORD.PP_EVENT = {
  EVENT_LOGIN_SUCCESS: 0,

  //Game Related
  EVENT_GAME_STARTED: "1",
  EVENT_GAME_INITIAL_BALL_MOVEMENT: "2",
  EVENT_GAME_PADDLE_DISTORTION_VELOCITY: "3",
  EVENT_GAME_BALL_POSITION: "4",
  EVENT_GAME_PADDLE_POSITION: "5",
  EVENT_GAME_DEFEATED: "6",
  EVENT_GAME_EXIT_BETWEEN: "7",
  EVENT_GAME_EVENT_KEY: "10",

  EVENT_GAME_EVENT_HOST_HANDSHAKE: "12",
  EVENT_GAME_EVENT_CLIENT_HANDSHAKE: "13",

  EVENT_GAME_INITIAL_BALLONE_MOVEMENT: "14",
  EVENT_GAME_INITIAL_BALLTWO_MOVEMENT: "15",
  EVENT_GAME_PADDLE_DISTORTIONONE_VELOCITY: "16",
  EVENT_GAME_PADDLE_DISTORTIONTWO_VELOCITY: "17",

  EVENT_GAME_DEFEATED_ONE: "18",
  EVENT_GAME_DEFEATED_TWO: "19",


  EVENT_GAME_PADDLE_SHOOT: "20",
  EVENT_GAME_PADDLE_BALL_SHOOT_RECEIVED: "21",
  EVENT_GAME_KITTY_HIT: "22",
  EVENT_GAME_KITTY_HIT_GAMEOVER: "23",


  EVENT_GAME_GRAVITY_WELL_OBSTACLE: "24",
  EVENT_GAME_INVISIBLE_WALL_POSITION: "25",
  EVENT_GAME_BALL_POSITION_CHANGE: "26",
}

PP.VARIABLE = {
  POSITION_X: "x",
  POSITION_Y: "y",
  STATE: "s",
  BALL_POSITION_Y: "by",
  BALL_POSITION_X: "bx",

  BODY_POSITION_Y: "boy",
  BODY_POSITION_X: "box",

  PADDLE_POSITION_Y: "py",
  TARGET_SPEED: "ts",
  ACCELERATION: "ac",
  DEACCELERATION: "de",
  SERVER_TIME: "st",
  VALUES: "v"
}

PP.ServerObject = function() {
  this.eventType = -1;
  this.state = -1,
    this.ballDiamondPos = -1,
    this.ballPositionX = -1,
    this.ballPositionY = -1,
    this.ballBodyPositionX = -1,
    this.ballBodyPositionY = -1,

    this.gravityX = -1,
    this.gravityY = -1,
    this.radius = -1,
    this.power = -1,

    this.paddlePositionY = -1,
    this.paddleBodyPositionY = -1,
    this.targetSpeed = -1,
    this.acceleration = -1,
    this.deacceleration = -1,
    this.serverTime = -1,
    this.currentPing = -1,
    this.opponentPing = 0,
    this.wallPositionY = -1
};


PP.ServerObject.prototype = Object.create(EventEmitter.prototype);
PP.ServerObject.prototype.constructor = PP.ServerObject;


PP.ServerObject.prototype.getData = function(eventType, array) {
  switch (eventType) {
    case NORD.PP_EVENT.EVENT_GAME_STARTED:
      {
        this.eventType = eventType;
        this.ballDiamondPos = convertToFloat(array[1]);

        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALL_MOVEMENT:
      {
        this.eventType = eventType;
        this.ballPositionX = convertToFloat(array[1]);
        this.ballPositionY = convertToFloat(array[2]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLONE_MOVEMENT:
      {
        this.eventType = eventType;
        this.ballPositionX = convertToFloat(array[1]);
        this.ballPositionY = convertToFloat(array[2]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLTWO_MOVEMENT:
      {
        this.eventType = eventType;
        this.ballPositionX = convertToFloat(array[1]);
        this.ballPositionY = convertToFloat(array[2]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTION_VELOCITY:
      {
        this.eventType = eventType;
        this.ballBodyPositionX = convertToFloat(array[1]);
        this.ballBodyPositionY = convertToFloat(array[2]);
        this.paddlePositionY = convertToFloat(array[3]);
        this.ballPositionX = convertToFloat(array[4]);
        this.ballPositionY = convertToFloat(array[5]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONONE_VELOCITY:
      {
        this.eventType = eventType;
        this.ballBodyPositionX = convertToFloat(array[1]);
        this.ballBodyPositionY = convertToFloat(array[2]);
        this.paddlePositionY = convertToFloat(array[3]);
        this.ballPositionX = convertToFloat(array[4]);
        this.ballPositionY = convertToFloat(array[5]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONTWO_VELOCITY:
      {
        this.eventType = eventType;
        this.ballBodyPositionX = convertToFloat(array[1]);
        this.ballBodyPositionY = convertToFloat(array[2]);
        this.paddlePositionY = convertToFloat(array[3]);
        this.ballPositionX = convertToFloat(array[4]);
        this.ballPositionY = convertToFloat(array[5]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION:
      {
        this.eventType = eventType;
        this.ballPositionX = convertToFloat(array[1]);
        this.ballPositionY = convertToFloat(array[2]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION_CHANGE:
      {
        this.eventType = eventType;
        this.ballPositionX = convertToFloat(array[1]);
        this.ballPositionY = convertToFloat(array[2]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INVISIBLE_WALL_POSITION:
      {
        this.eventType = eventType;
        this.wallPositionY = convertToFloat(array[1]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_GRAVITY_WELL_OBSTACLE:
      {
        this.eventType = eventType;

        this.gravityX = convertToFloat(array[1]);
        this.gravityY = convertToFloat(array[2]);
        this.radius = convertToFloat(array[3]);
        this.power = convertToFloat(array[4]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_POSITION:
      {
        this.eventType = eventType;
        this.paddlePositionY = convertToFloat(array[1]);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_SHOOT:
      {
        this.eventType = eventType;
        this.paddlePositionY = convertToFloat(array[1]);
        break;
      }

    case NORD.PP_EVENT.EVENT_GAME_EVENT_HOST_HANDSHAKE:
      {
        this.eventType = eventType;
        this.currentPing = convertToFloat(array[1]);
        break;
      }

    case NORD.PP_EVENT.EVENT_GAME_EVENT_CLIENT_HANDSHAKE:
      {
        this.eventType = eventType;
        this.currentPing = convertToFloat(array[1]);
        break;
      }
  }
}

NORD.GameEventHandler.prototype = Object.create(PIXI.Container.prototype);
NORD.GameEventHandler.prototype.constructor = NORD.GameEventHandler;

function convertToInt(value) {
  // return value;
  return Math.floor((value.toFixed(3)) * 100);
}

function convertToFloat(value) {
  // return value;
  return value / 100.0;
}

NORD.GameEventHandler.prototype.sendEvent = function(serverObject, data) {

  var eveentInt = parseInt(serverObject.eventType);
  var data = [];
  switch (serverObject.eventType) {
    case NORD.PP_EVENT.EVENT_GAME_STARTED:
      {
        serverObject.ballDiamondPos = convertToInt(serverObject.ballDiamondPos);
        data = [eveentInt, serverObject.ballDiamondPos];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_DEFEATED:
    case NORD.PP_EVENT.EVENT_GAME_DEFEATED_ONE:
    case NORD.PP_EVENT.EVENT_GAME_KITTY_HIT:
    case NORD.PP_EVENT.EVENT_GAME_KITTY_HIT_GAMEOVER:
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_BALL_SHOOT_RECEIVED:
    case NORD.PP_EVENT.EVENT_GAME_DEFEATED_TWO:
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_SHOOT:
      {
        serverObject.paddlePositionY = convertToInt(serverObject.paddlePositionY);
        data = [eveentInt, serverObject.paddlePositionY];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_EXIT_BETWEEN:
      {
        data = [eveentInt];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALL_MOVEMENT:
      {
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballPositionX, serverObject.ballPositionY];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLONE_MOVEMENT:
      {
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballPositionX, serverObject.ballPositionY];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLTWO_MOVEMENT:
      {
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballPositionX, serverObject.ballPositionY];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTION_VELOCITY:
      {
        serverObject.ballBodyPositionX = convertToInt(serverObject.ballBodyPositionX);
        serverObject.ballBodyPositionY = convertToInt(serverObject.ballBodyPositionY);
        serverObject.paddlePositionY = convertToInt(serverObject.paddlePositionY);
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballBodyPositionX, serverObject.ballBodyPositionY, serverObject.paddlePositionY, serverObject.ballPositionX, serverObject.ballPositionY];
        // data = [eveentInt, serverObject.ballBodyPositionX, serverObject.ballBodyPositionY, serverObject.paddlePositionY, serverObject.ballPositionX, serverObject.ballPositionY];

        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONONE_VELOCITY:
      {
        serverObject.ballBodyPositionX = convertToInt(serverObject.ballBodyPositionX);
        serverObject.ballBodyPositionY = convertToInt(serverObject.ballBodyPositionY);
        serverObject.paddlePositionY = convertToInt(serverObject.paddlePositionY);
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballBodyPositionX, serverObject.ballBodyPositionY, serverObject.paddlePositionY, serverObject.ballPositionX, serverObject.ballPositionY];
        // data = [eveentInt, serverObject.ballBodyPositionX, serverObject.ballBodyPositionY, serverObject.paddlePositionY, serverObject.ballPositionX, serverObject.ballPositionY];

        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONTWO_VELOCITY:
      {
        serverObject.ballBodyPositionX = convertToInt(serverObject.ballBodyPositionX);
        serverObject.ballBodyPositionY = convertToInt(serverObject.ballBodyPositionY);
        serverObject.paddlePositionY = convertToInt(serverObject.paddlePositionY);
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballBodyPositionX, serverObject.ballBodyPositionY, serverObject.paddlePositionY, serverObject.ballPositionX, serverObject.ballPositionY];
        // data = [eveentInt, serverObject.ballBodyPositionX, serverObject.ballBodyPositionY, serverObject.paddlePositionY, serverObject.ballPositionX, serverObject.ballPositionY];

        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION:
      {
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballPositionX, serverObject.ballPositionY];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION_CHANGE:
      {
        serverObject.ballPositionX = convertToInt(serverObject.ballPositionX);
        serverObject.ballPositionY = convertToInt(serverObject.ballPositionY);
        data = [eveentInt, serverObject.ballPositionX, serverObject.ballPositionY];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INVISIBLE_WALL_POSITION:
      {
        serverObject.wallPositionY = convertToInt(serverObject.wallPositionY);
        data = [eveentInt, serverObject.wallPositionY];
        break;
      }

    case NORD.PP_EVENT.EVENT_GAME_GRAVITY_WELL_OBSTACLE:
      {
        serverObject.gravityX = convertToInt(serverObject.gravityX);
        serverObject.gravityY = convertToInt(serverObject.gravityY);
        serverObject.radius = convertToInt(serverObject.radius);
        serverObject.power = convertToInt(serverObject.power);
        data = [eveentInt, serverObject.gravityX, serverObject.gravityY, serverObject.radius, serverObject.power];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_POSITION:
      {
        serverObject.paddlePositionY = convertToInt(serverObject.paddlePositionY);
        data = [eveentInt, serverObject.paddlePositionY];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_EVENT_CLIENT_HANDSHAKE:
      {
        serverObject.currentPing = convertToInt(serverObject.currentPing);
        data = [eveentInt, serverObject.currentPing];
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_EVENT_HOST_HANDSHAKE:
      {
        serverObject.currentPing = convertToInt(serverObject.currentPing);
        data = [eveentInt, serverObject.currentPing];
        break;
      }

  }

  if (PP.server_using == PP.SERVER_USING.Photon) {

    // console.log("Event-->Sending - " + Exitgames.Common.Util.getEnumKeyByValue(NORD.PP_EVENT, data[0]) + " - " + sizeof(data), " --> ", data);
    DemoLoadFunction.sendMessage(data);
  } else {
    // console.log("Event-->Sending - " + Exitgames.Common.Util.getEnumKeyByValue(NORD.PP_EVENT, data[0]) + " - " + sizeof(data), " --> ", data);

    var roomVars = [];
    roomVars.push(new SFS2X.SFSRoomVariable(serverObject.eventType, true));

    switch (serverObject.eventType) {
      case NORD.PP_EVENT.EVENT_GAME_STARTED:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_DEFEATED:
      case NORD.PP_EVENT.EVENT_GAME_DEFEATED_ONE:
      case NORD.PP_EVENT.EVENT_GAME_KITTY_HIT:
      case NORD.PP_EVENT.EVENT_GAME_KITTY_HIT_GAMEOVER:
      case NORD.PP_EVENT.EVENT_GAME_PADDLE_BALL_SHOOT_RECEIVED:
      case NORD.PP_EVENT.EVENT_GAME_DEFEATED_TWO:
      case NORD.PP_EVENT.EVENT_GAME_PADDLE_SHOOT:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_EXIT_BETWEEN:
        {
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALL_MOVEMENT:
      case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLONE_MOVEMENT:
      case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLTWO_MOVEMENT:
      case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION_CHANGE:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_INVISIBLE_WALL_POSITION:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTION_VELOCITY:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }

      case NORD.PP_EVENT.EVENT_GAME_GRAVITY_WELL_OBSTACLE:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONONE_VELOCITY:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONTWO_VELOCITY:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_PADDLE_POSITION:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_EVENT_CLIENT_HANDSHAKE:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
      case NORD.PP_EVENT.EVENT_GAME_EVENT_HOST_HANDSHAKE:
        {
          var sfso = new SFS2X.SFSObject();
          sfso.putLongArray(PP.VARIABLE.VALUES, data);
          roomVars.push(new SFS2X.SFSRoomVariable(PP.VARIABLE.VALUES, sfso));
          break;
        }
    }

    NORD.sfsController.sendEvent(serverObject.eventType, roomVars);
  }

};

NORD.GameEventHandler.prototype.onReciveEvent = function(eventType, data) {

  // console.log("Event-->Reciveing - " + Exitgames.Common.Util.getEnumKeyByValue(NORD.PP_EVENT, eventType) + " - " + sizeof(data), " --> ", data);
  if (PP.server_using == PP.SERVER_USING.Photon) {
    var serverObj = new PP.ServerObject();
    serverObj.getData(eventType, data);
  } else {
    var serverObj = new PP.ServerObject();
    serverObj.getData(eventType, data);
  }
  switch (eventType) {
    case NORD.PP_EVENT.EVENT_GAME_STARTED:
      {
        clearTimeout(NORD.mainMenu.loadingPopup.timoutFunction);
        MultiplayerStarted = true;
        NORD.game.screenGame.panelEndGame.buttonRestart.interactive = false;
        NORD.mainMenu.loadingPopup.hide();
        NORD.events.emit(NORD.EVENT_CODE.GAME_INITIATED, "Success");

        // var seObj1 = new PP.ServerObject();
        // seObj1.eventType = NORD.PP_EVENT.EVENT_GAME_EVENT_CLIENT_HANDSHAKE;
        // seObj1.currentPing = 0;
        // NORD.gameEventHandler.sendEvent(seObj1);

        NORD.gameState = NORD.GAME_STATE.IN_GAME;
        IsHost = false;

        NORD.game.ballImpulse.x = 0;
        NORD.game.ballImpulse.y = 0;

        var config = NORD.game.config;
        config.players = "one";
        config.dificulty = DemoLoadFunction.myRoom()._customProperties.difficulty;
        config.mode = DemoLoadFunction.myRoom()._customProperties.mode;
        NORD.game.setConfig(config);

        MainMenuLocation.boardSelected = DemoLoadFunction.myRoom()._customProperties.board;

        MainMenuLocation.ballDiamondGeneratedPos = serverObj.ballDiamondPos;

        TweenMax.delayedCall(0.07 * 2, function() {
          if (NORD.game.config.mode !== 'action') MainMenuLocation.toGame(MainMenuLocation.boardSelected);
          else MainMenuLocation.toGame('board_2');
        });
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALL_MOVEMENT:
      {
        // console.log("ball re", serverObj.ballPositionX, serverObj.ballPositionY);
        NORD.game.ballImpulse.x = serverObj.ballPositionX * -1;
        NORD.game.ballImpulse.y = serverObj.ballPositionY;

        Matter.Body.setVelocity(Ball.body, {
          x: NORD.game.ballImpulse.x,
          y: NORD.game.ballImpulse.y
        }); // console.log('Start impulse:', dir, speed, angle, impulse);

        NORD.game.ballImpulse.x = 0;
        NORD.game.ballImpulse.y = 0;

        TweenMax.delayedCall(0.5, function() {
          if (Ball.body) Ball.body.isSensor = false;
        });
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLONE_MOVEMENT:
      {
        var ball = RoundVariable.getFreeBall();
        ball.init(0, 0);
        ball.distortionVelocityReceived = false;
        ball.ballCollideToEdge = false;
        ball.velocityActivated = true;
        Ball = ball;

        // console.log("ballone re", serverObj.ballPositionX, serverObj.ballPositionY);
        NORD.game.ballImpulse.x1 = serverObj.ballPositionX * -1;
        NORD.game.ballImpulse.y1 = serverObj.ballPositionY;

        Matter.Body.setVelocity(Ball.body, {
          x: NORD.game.ballImpulse.x1,
          y: NORD.game.ballImpulse.y1
        }); // console.log('Start impulse:', dir, speed, angle, impulse);

        NORD.game.ballImpulse.x1 = 0;
        NORD.game.ballImpulse.y1 = 0;

        TweenMax.delayedCall(0.1, function() {
          if (Ball.body) Ball.body.isSensor = false;
        });
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALLTWO_MOVEMENT:
      {
        var ball = RoundVariable.getFreeBall();
        ball.init(0, 0);
        ball.distortionVelocityReceived = false;
        ball.ballCollideToEdge = false;
        ball.velocityActivated = true;
        Ball1 = ball;

        // console.log("ballone re", serverObj.ballPositionX, serverObj.ballPositionY);
        NORD.game.ballImpulse.x1 = serverObj.ballPositionX * -1;
        NORD.game.ballImpulse.y1 = serverObj.ballPositionY;

        Matter.Body.setVelocity(Ball1.body, {
          x: NORD.game.ballImpulse.x1,
          y: NORD.game.ballImpulse.y1
        }); // console.log('Start impulse:', dir, speed, angle, impulse);

        NORD.game.ballImpulse.x1 = 0;
        NORD.game.ballImpulse.y1 = 0;

        TweenMax.delayedCall(0.1, function() {
          if (Ball1.body) Ball1.body.isSensor = false;
        });
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTION_VELOCITY:
      {

        console.log("distortionVelocity received --- ");
        Ball.distortionVelocityReceived = false;

        NORD.game.ballImpulse.x = serverObj.ballPositionX * -1;
        NORD.game.ballImpulse.y = serverObj.ballPositionY;

        Ball.velocityActivated = false;

        NORD.game.ballImpulse.paddleYPosition = serverObj.paddlePositionY;
        NORD.game.ballImpulse.bodypositionX = serverObj.ballBodyPositionX * -1;
        NORD.game.ballImpulse.bodypositionY = serverObj.ballBodyPositionY;

        // if (!Ball.ballCollideToEdge) {
        console.log("ball ballCollideToEdge" + serverObj.ballPositionX * -1);
        if (Ball.body.velocity.x > 0 && !Util.inbetweenRange(NORD.game.ballImpulse.x, Ball.body.velocity.x.toFixed(3))) {
          NORD.game.screenGame.showIndicator(0.5);
        }

        Ball.velocityActivated = true;

        var positionNeedToChange = false;
        if (Ball.body.velocity.x <= 0)
          positionNeedToChange = true;

        Matter.Body.setVelocity(Ball.body, {
          x: 0,
          y: 0
        });
        if (positionNeedToChange)
          Ball.setTo(NORD.game.ballImpulse.bodypositionX, NORD.game.ballImpulse.bodypositionY);
        Matter.Body.setVelocity(Ball.body, {
          x: NORD.game.ballImpulse.x,
          y: NORD.game.ballImpulse.y
        });

        if (positionNeedToChange) {
          LeftPaddle.paddleGettingTeleported = true;

          if (Util.exceedsRange(LeftPaddle.body.position.y, NORD.game.ballImpulse.paddleYPosition, 20))
            NORD.game.screenGame.showIndicator(0.5);

          if (LeftPaddle.tweenBody != null)
            LeftPaddle.tweenBody.kill();
          LeftPaddle.bodyY = LeftPaddle.body.position.y;
          LeftPaddle.tweenBody = TweenMax.to(LeftPaddle, 0.1, {
            bodyY: serverObj.paddlePositionY,
            onUpdate: tweenUpdate
          });

          function tweenUpdate() {
            LeftPaddle.setTo(LeftPaddle.body.position.x, LeftPaddle.bodyY);
          }

          TweenMax.delayedCall(0.5, function() {
            LeftPaddle.paddleGettingTeleported = false;
          });
        }

        NORD.game.ballImpulse.x = 0;
        NORD.game.ballImpulse.y = 0;
        // }
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONONE_VELOCITY:
      {
        console.log("ball DISTORTION_VELOCITY");
        Ball.distortionVelocityReceived = false;

        NORD.game.ballImpulse.x = serverObj.ballPositionX * -1;
        NORD.game.ballImpulse.y = serverObj.ballPositionY;

        Ball.velocityActivated = false;

        NORD.game.ballImpulse.paddleYPosition = serverObj.paddlePositionY;
        NORD.game.ballImpulse.bodypositionX = serverObj.ballBodyPositionX * -1;
        NORD.game.ballImpulse.bodypositionY = serverObj.ballBodyPositionY;

        Ball.velocityActivated = true;
        Matter.Body.setVelocity(Ball.body, {
          x: 0,
          y: 0
        });
        Ball.setTo(NORD.game.ballImpulse.bodypositionX, NORD.game.ballImpulse.bodypositionY);
        Matter.Body.setVelocity(Ball.body, {
          x: NORD.game.ballImpulse.x,
          y: NORD.game.ballImpulse.y
        });

        if (LeftPaddle.tweenBody != null)
          LeftPaddle.tweenBody.kill();
        LeftPaddle.bodyY = LeftPaddle.body.position.y;
        LeftPaddle.tweenBody = TweenMax.to(LeftPaddle, 0.1, {
          bodyY: serverObj.paddlePositionY,
          onUpdate: tweenUpdate
        });

        function tweenUpdate() {
          LeftPaddle.setTo(LeftPaddle.body.position.x, LeftPaddle.bodyY);
        }

        TweenMax.delayedCall(0.5, function() {
          LeftPaddle.paddleGettingTeleported = false;
        });
        NORD.game.ballImpulse.x = 0;
        NORD.game.ballImpulse.y = 0;
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTIONTWO_VELOCITY:
      {
        console.log("ball1 DISTORTION_VELOCITY");
        Ball1.distortionVelocityReceived = false;

        NORD.game.ballImpulse.x1 = serverObj.ballPositionX * -1;
        NORD.game.ballImpulse.y1 = serverObj.ballPositionY;

        Ball1.velocityActivated = false;

        NORD.game.ballImpulse.paddleYPosition = serverObj.paddlePositionY;
        NORD.game.ballImpulse.bodypositionX1 = serverObj.ballBodyPositionX * -1;
        NORD.game.ballImpulse.bodypositionY1 = serverObj.ballBodyPositionY;

        Ball1.velocityActivated = true;
        Matter.Body.setVelocity(Ball1.body, {
          x: 0,
          y: 0
        });
        Ball1.setTo(NORD.game.ballImpulse.bodypositionX1, NORD.game.ballImpulse.bodypositionY1);
        Matter.Body.setVelocity(Ball1.body, {
          x: NORD.game.ballImpulse.x1,
          y: NORD.game.ballImpulse.y1
        });

        if (LeftPaddle.tweenBody != null)
          LeftPaddle.tweenBody.kill();
        LeftPaddle.bodyY = LeftPaddle.body.position.y;
        LeftPaddle.tweenBody = TweenMax.to(LeftPaddle, 0.1, {
          bodyY: serverObj.paddlePositionY,
          onUpdate: tweenUpdate
        });

        function tweenUpdate() {
          LeftPaddle.setTo(LeftPaddle.body.position.x, LeftPaddle.bodyY);
        }

        TweenMax.delayedCall(0.5, function() {
          LeftPaddle.paddleGettingTeleported = false;
        });
        NORD.game.ballImpulse.x1 = 0;
        NORD.game.ballImpulse.y1 = 0;
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION:
      {
        Matter.World.remove(LeftPaddle.field.physics, LeftPaddle.body);

        Ball.distortionVelocityReceived = true;
        NORD.game.ballImpulse.x = serverObj.ballPositionX * -1;
        NORD.game.ballImpulse.y = serverObj.ballPositionY;
        Matter.Body.setVelocity(Ball.body, {
          x: NORD.game.ballImpulse.x,
          y: NORD.game.ballImpulse.y
        });
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION_CHANGE:
      {
        Ball.setTo(serverObj.ballPositionX, serverObj.ballPositionY);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_INVISIBLE_WALL_POSITION:
      {
        var _bonusData = {
          type: "INVISIBLE_WALL",
          time: -1,
          x: 0,
          y: serverObj.wallPositionY
        };

        var _bonus3 = createBonus(NORD.game.field, _bonusData);
        NORD.game.field.setGameGraphicsAlpha(1.0, true);
      }
    case NORD.PP_EVENT.EVENT_GAME_GRAVITY_WELL_OBSTACLE:
      {
        var _bonusData3 = {
          type: "GRAVITY_WELL",
          time: -1,
          x: serverObj.gravityX,
          y: serverObj.gravityY
        };
        if (serverObj.radius != 0)
          _bonusData3.radius = serverObj.radius;
        if (serverObj.power != 0)
          _bonusData3.power = serverObj.power;

        var _bonus3 = createBonus(NORD.game.field, _bonusData3);
        NORD.game.field.setGameGraphicsAlpha(1.0, true);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_POSITION:
      {
        if (LeftPaddle.paddleGettingTeleported)
          return;

        if (LeftPaddle.tweenBody != null)
          LeftPaddle.tweenBody.kill();
        LeftPaddle.bodyY = LeftPaddle.body.position.y;
        LeftPaddle.tweenBody = TweenMax.to(LeftPaddle, 0.1, {
          bodyY: serverObj.paddlePositionY,
          onUpdate: tweenUpdate
        });

        function tweenUpdate() {
          LeftPaddle.setTo(LeftPaddle.body.position.x, LeftPaddle.bodyY);
        }

        // LeftPaddle.setTo(LeftPaddle.body.position.x, serverObj.paddlePositionY);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_KITTY_HIT:
      {
        var point = NORD.game.field.roundGenerator.kittyPointLeft;
        point.hit(LeftPlayer);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_KITTY_HIT_GAMEOVER:
      {
        NORD.game.field.roundGenerator.bonus.stopMove();
        NORD.game.field.goal(RightPlayer, Ball, true, {
          muteGoal: true
        });

        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_DEFEATED:
      {
        Ball = null;
        Ball1 = null;
        RoundVariable.goal(RightPlayer);
        NORD.game.screenGame.panelPause.hide();
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_DEFEATED_ONE:
      {
        Ball = null;
        ScoreHolder.multiballPointLeft.goal(RightPlayer);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_DEFEATED_TWO:
      {
        Ball1 = null;
        ScoreHolder.multiballPointLeft.goal(RightPlayer);
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_BALL_SHOOT_RECEIVED:
      {

        LeftPaddle.stun();
        NORD.audioManager.playAudio('shoot_hit');
        NORD.game.field.emit('bullet_hit_paddle', LeftPaddle);
        RightPaddle.currentBullet.destroy();
        RightPaddle.currentBullet = null;
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_PADDLE_SHOOT:
      {
        LeftPaddle.setTo(LeftPaddle.body.position.x, serverObj.paddlePositionY);
        LeftPaddle.shoot();
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_EVENT_CLIENT_HANDSHAKE:
      {
        if (!IsHost) {
          NORD.game.screenGame.pingOppText.text = "Opp T.Diff - " + serverObj.currentPing + "ms";

          if (NORD.previousTime) {
            var timeDiff = Date.now() - NORD.previousTime;
            NORD.game.ballImpulse.currentPing = timeDiff;
            NORD.game.screenGame.pingText.text = "My T.Diff - " + timeDiff + "ms";
          }

          setTimeout(function() {
            NORD.previousTime = Date.now();
            var seObj = new PP.ServerObject();
            seObj.eventType = NORD.PP_EVENT.EVENT_GAME_EVENT_CLIENT_HANDSHAKE;
            seObj.currentPing = NORD.game.ballImpulse.currentPing;
            NORD.gameEventHandler.sendEvent(seObj);
          }, 3000);

        } else {
          var seObj = new PP.ServerObject();
          seObj.eventType = NORD.PP_EVENT.EVENT_GAME_EVENT_CLIENT_HANDSHAKE;
          seObj.currentPing = NORD.game.ballImpulse.currentPing;

          NORD.gameEventHandler.sendEvent(seObj);
        }
        break;
      }
    case NORD.PP_EVENT.EVENT_GAME_EVENT_HOST_HANDSHAKE:
      {
        if (IsHost) {
          NORD.game.screenGame.pingOppText.text = "Opp T.Diff - " + serverObj.currentPing + "ms";

          if (NORD.previousTime) {
            var timeDiff = Date.now() - NORD.previousTime;
            NORD.game.ballImpulse.currentPing = timeDiff;
            NORD.game.screenGame.pingText.text = "My T.Diff - " + timeDiff + "ms";
          }

          setTimeout(function() {
            NORD.previousTime = Date.now();
            var seObj = new PP.ServerObject();
            seObj.eventType = NORD.PP_EVENT.EVENT_GAME_EVENT_HOST_HANDSHAKE;
            seObj.currentPing = NORD.game.ballImpulse.currentPing;
            NORD.gameEventHandler.sendEvent(seObj);
          }, 3000);

        } else {
          var seObj = new PP.ServerObject();
          seObj.eventType = NORD.PP_EVENT.EVENT_GAME_EVENT_HOST_HANDSHAKE;
          seObj.currentPing = NORD.game.ballImpulse.currentPing;
          NORD.gameEventHandler.sendEvent(seObj);
        }
        break;

      }
    case NORD.PP_EVENT.EVENT_GAME_EXIT_BETWEEN:
      {
        MultiplayerStarted = false;
        break;
      }
  }


};
