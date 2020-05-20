"use strict";

NORD.CONNECTION_STATE = {
  CREATING_ROOM: 0,
  SEARCH_FOR_ROOM: 1,
  RANDOM_JOIN: 2,
  LEAVE_ROOM: 3,
}

NORD.EVENT_CODE = {
  INITIALISING_PHOTON: 1,
  LEAVING_ROOM: 2,
  DISCONNECTED: 3,
  JOINED: 4,
  JOINED_LOBBY: 5,
  ROOM_PROPERTIES_CHANGED: 6,
  GAME_DOES_NOT_EXIT: 7,
  GAME_CONNECTION_ERROR: 8,
  GAME_INITIATED: 9,
  PING_RECIEVED: 10,

  LAST_EVENT_CODE: 30 //It should be last
}

NORD.multiPlayerSelectionPopup = null;

// Shunmugam Multiplayer Selection Popup

NORD.MultiplayerSelectionPopup = function(config) {
  NORD.multiPlayerSelectionPopup = this;
  config.sizeType = 'relative';
  config.width = 520;
  config.height = 378;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false;
  // this.connectionState = Math.ceil( Math.random()*2.0) == 1 ? NORD.CONNECTION_STATE.CREATING_ROOM : NORD.CONNECTION_STATE.SEARCH_FOR_ROOM;

  this.backBG = new PIXI.NineSlicePlane(NORD.assetsManager.getTexture('PopupSmall'), 15, 15, 15, 15);
  this.backBG.width = 640 + 15;
  this.backBG.height = 480 + 15;
  this.backBG.position.x = -(640 + 15) * 0.5;
  this.backBG.position.y = -(480 + 15) * 0.5;
  this.addChild(this.backBG);

  this.bg = new PIXI.NineSlicePlane(NORD.assetsManager.getTexture('PopupSmall'), 15, 15, 15, 15);
  this.bg.width = 520;
  this.bg.height = 378;
  this.bg.position.x = -260;
  this.bg.position.y = -189;
  this.addChild(this.bg);

  this.transparentBg = new PIXI.NineSlicePlane(NORD.assetsManager.getTexture('PopupSub'), 15, 15, 15, 15);
  this.transparentBg.width = 500;
  this.transparentBg.height = 250;
  this.transparentBg.position.x = -250;
  this.transparentBg.position.y = -72;
  this.addChild(this.transparentBg);
};
NORD.MultiplayerSelectionPopup.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.MultiplayerSelectionPopup.prototype.constructor = NORD.MultiplayerSelectionPopup;

NORD.MultiplayerSelectionPopup.prototype.startPhotonSerer = function() {
  if (DemoLoadFunction == undefined) {
    //yatthi add here popup
    // NORD.mainMenu.loadingPopup.show("Initialising Server");

    NORD.events.on(NORD.EVENT_CODE.INITIALISING_PHOTON, this.onInitializingPhoton.bind(this));

    //initiales photon api
    NORD.demo = new DemoLoadBalancing();
    NORD.demo.start();
  }
  // else {
  //   NORD.MultiplayerPopupSowed = false;
  //   NORD.mainMenu.multiplayerSelectionPopup.show();
  // }

};



NORD.MultiplayerSelectionPopup.prototype.onInitializingPhoton = function(event) {
  NORD.events.removeListener(NORD.EVENT_CODE.INITIALISING_PHOTON);
  // NORD.mainMenu.multiplayerSelectionPopup.show();
  NORD.MultiplayerPopupSowed = false;

  //loading popup
  NORD.mainMenu.loadingPopup.timerText.timerTextValue = 31;
  NORD.mainMenu.loadingPopup.timerText.text = "31s";
  NORD.mainMenu.loadingPopup.Button.alpha = 0;

  decreaseTimer();

  function decreaseTimer() {
    NORD.mainMenu.loadingPopup.timerText.timerTextValue -= 1;
    NORD.mainMenu.loadingPopup.timerText.text = NORD.mainMenu.loadingPopup.timerText.timerTextValue + "s";
    if (NORD.mainMenu.loadingPopup.timerText.timerTextValue <= 0) {
      if (NORD.randomSearchInstance) {
        delete NORD.randomSearchInstance;
      }
      if (DemoLoadFunction.myRoom())
        DemoLoadFunction.leaveRoom();
      NORD.mainMenu.loadingPopup.loaderText.text = "No Opponent found please try again";
      NORD.mainMenu.loadingPopup.Button.alpha = 255;
      return;
    }

    NORD.mainMenu.loadingPopup.timoutFunction = setTimeout(function() {
      decreaseTimer();
    }, 1000);
  }



  NORD.mainMenu.loadingPopup.show("Waiting For Opponent");

  if (PP.server_using == PP.SERVER_USING.Photon) {
    new NORD.RandomSearchInstance();
  } else {
    NORD.sfsController.joinLobbyRoomNew();
  }
}

//Smart Fox Server
NORD.MultiplayerSelectionPopup.prototype.loginToSmartBox = function() {

  NORD.sfsEventEmitter.on(NORD.PP_EVENT.EVENT_LOGIN_SUCCESS, function() {
    NORD.mainMenu.multiplayerSelectionPopup.show();
  });

  NORD.sfsController.loginTo();

};



NORD.MultiplayerSelectionPopup.prototype.show = function(data) {
  NORD.mainMenu.loadingPopup.hide();
  this.tween({
    name: 'show_anim'
  });
};

NORD.MultiplayerSelectionPopup.prototype.hide = function(data, callback) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    if (callback) callback();
  });
};

NORD.MultiplayerSelectionPopup.prototype.tween = function(data, callback) {
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
NORD.MultiplayerSelectionPopup.prototype.logServerAndRoomDetail = function(roomInfo) {
  console.log("\n*****************");
  console.log("Demo Loading state ", DemoLoadFunction.state);
  console.log("Room Info ", roomInfo._customProperties.gameType, " ", roomInfo._customProperties.mode, roomInfo._customProperties.difficulty, roomInfo.removed);
  console.log("*****************\n");
}

NORD.MultiplayerSelectionPopup.prototype.updateName = function() {
  // this.l_playerName.scale = 1;
  this.l_playerName.text = NORD.App.playerController.getName();
  this.updateNameSize();
};

NORD.MultiplayerSelectionPopup.prototype.updateNameSize = function() {
  if (this.l_playerName.width > this.s_namePanel.width) {
    var toScale = this.s_namePanel.width / this.l_playerName.width;
    this.l_playerName.scale.x = toScale;
    this.l_playerName.scale.y = toScale;
  }
}

NORD.MultiplayerSelectionPopup.prototype.updateRandomName = function() {
  // this.l_playerName.scale = 1;
  this.l_playerName.text = NORD.App.playerController.getRandomName();
  this.updateNameSize();
};

//Shunmugam Multiplayer Selection Popup End
/**
 * @summary
 * @
 */
NORD.randomSearchInstance = null;
NORD.RandomSearchInstance = function(gameMode) {
  NORD.randomSearchInstance = this;

  /** @eventError Handling */
  NORD.events.on(NORD.EVENT_CODE.GAME_CONNECTION_ERROR, function(data) {

    if (NORD.gameState == NORD.GAME_STATE.SERARCHING) {
      if (NORD.randomSearchInstance) {
        NORD.randomSearchInstance.disconnectServer();
      }
    }
  });

  /**@event On Success Init Game */
  NORD.events.on(NORD.EVENT_CODE.GAME_INITIATED, function(data) {
    if (NORD.randomSearchInstance) {
      delete NORD.randomSearchInstance;
    }
  });

  /**Initializing */
  this.randomSearchState = Math.random() * 5.0 < 2.5 ? NORD.CONNECTION_STATE.RANDOM_JOIN : NORD.CONNECTION_STATE.CREATING_ROOM;
  this.randomJoinCount = 0; //Since first no need check mor time for random join
  /**Idle State Tracker */
  this.setRandomSearchState(this.randomSearchState);
};

NORD.RandomSearchInstance.prototype.setRandomSearchState = function(toState) {
  console.log("\n*****************");
  console.log("Current State ", Exitgames.Common.Util.getEnumKeyByValue(NORD.CONNECTION_STATE, this.randomSearchState), "-->", Exitgames.Common.Util.getEnumKeyByValue(NORD.CONNECTION_STATE, toState), Exitgames.Common.Util.getEnumKeyByValue(NORD.GAME_STATE, NORD.gameState));

  if (NORD.gameState == NORD.GAME_STATE.SERARCHING) {
    this.randomSearchState = toState;
    this.idleStateTracker();
    this.conectionBasedOnState();
  }
};

/**@summary Need to call whenever change random Search State */
NORD.RandomSearchInstance.prototype.idleStateTracker = function() {
  if (this.idleCheckerTween) {
    this.idleCheckerTween.kill();
  }
  this.oldState = this.randomSearchState;
  this.idleCheckerTween = TweenMax.delayedCall(30, function() {
    if (NORD.randomSearchInstance) {
      if (NORD.gameState == NORD.GAME_STATE.RANDOM_JOIN && NORD.randomSearchInstance.oldState == NORD.randomSearchInstance.randomSearchState) {
        NORD.randomSearchInstance.disconnectServer();
      }
    }
  });
};

NORD.RandomSearchInstance.prototype.conectionBasedOnState = function() {
  switch (this.randomSearchState) {
    case NORD.CONNECTION_STATE.RANDOM_JOIN:
      {
        this.randomJoinToRoom();
        break;
      }
    case NORD.CONNECTION_STATE.CREATING_ROOM:
      {
        this.createRandomRoom();
        break;
      }
    case NORD.CONNECTION_STATE.LEAVE_ROOM:
      {
        this.leaveRandomRoom();
        break;
      }
  }
};

NORD.RandomSearchInstance.prototype.randomJoinToRoom = function() {
  NORD.events.removeListener(NORD.EVENT_CODE.GAME_DOES_NOT_EXIT);
  /**@event If room not found this below event will trigger */
  NORD.events.on(NORD.EVENT_CODE.GAME_DOES_NOT_EXIT, function(data) {
    if (NORD.randomSearchInstance) {
      NORD.randomSearchInstance.randomJoinCount++;
      if (NORD.randomSearchInstance.randomJoinCount > NORD.randomSearchInstance.getRandomWaitTime()) {
        NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.CREATING_ROOM);
      } else {
        NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.RANDOM_JOIN);
      }
    }
  });

  if (DemoLoadFunction.state == Photon.LoadBalancing.LoadBalancingClient.State.JoinedLobby) {
    // if(NORD.mainMenu.loadingPopup.timerText.timerTextValue)
    var option = this.getRandomRoomOption();

    for (var i = 0; i < DemoLoadFunction.roomInfos.length; i++) {
      if (DemoLoadFunction.roomInfos[i]._customProperties.gameType == NORD.MULTIPLAYER_GAME_TYPE.RANDOM && DemoLoadFunction.roomInfos[i]._customProperties.modeType == NORD.game.panelSettings.actionMode && DemoLoadFunction.roomInfos[i]._customProperties.board == NORD.game.config.board) {

        console.log("joining room for " + DemoLoadFunction.roomInfos[i]._customProperties.difficulty)
        DemoLoadFunction.joinRoom(DemoLoadFunction.roomInfos[i].name);
        return;
        // if (DemoLoadFunction.roomInfos[i]._customProperties.difficulty == NORD.App.playerController.config.playerDifficultyLevel) {
        //   console.log("joining room for " + DemoLoadFunction.roomInfos[i]._customProperties.difficulty)
        //   DemoLoadFunction.joinRoom(DemoLoadFunction.roomInfos[i].name);
        //   return;
        // }
        // if (NORD.mainMenu.loadingPopup.timerText.timerTextValue < 10) {
        //   if (DemoLoadFunction.roomInfos[i]._customProperties.difficulty == NORD.App.playerController.getSecondRank()) {
        //     console.log("joining room for " + DemoLoadFunction.roomInfos[i]._customProperties.difficulty)
        //     DemoLoadFunction.joinRoom(DemoLoadFunction.roomInfos[i].name);
        //     return;
        //   }
        // }
        // if (NORD.mainMenu.loadingPopup.timerText.timerTextValue < 5) {
        //   if (DemoLoadFunction.roomInfos[i]._customProperties.difficulty == NORD.App.playerController.getThirdRank()) {
        //     console.log("joining room for " + DemoLoadFunction.roomInfos[i]._customProperties.difficulty)
        //     DemoLoadFunction.joinRoom(DemoLoadFunction.roomInfos[i].name);
        //     return;
        //   }
        // }
      }
    }
    // if (DemoLoadFunction.roomInfos.length == 0)
    //   DemoLoadFunction.joinRandomRoom(option);
    if (NORD.randomSearchInstance && NORD.randomSearchInstance != undefined) {
      TweenMax.delayedCall(Math.random() * 1.0, function() {
        NORD.randomSearchInstance.randomJoinCount++;
        if (NORD.randomSearchInstance.randomJoinCount > NORD.randomSearchInstance.getRandomWaitTime()) {
          NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.CREATING_ROOM);
        } else {
          NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.RANDOM_JOIN);
        }
      });
    }

  } else {
    TweenMax.delayedCall(Math.random() * 2.0, function() {
      if (NORD.randomSearchInstance)
        NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.CREATING_ROOM);
    });
  }
};

NORD.RandomSearchInstance.prototype.createRandomRoom = function() {
  NORD.events.removeListener(NORD.EVENT_CODE.JOINED);
  NORD.events.on(NORD.EVENT_CODE.JOINED, function(data) {
    TweenMax.delayedCall(NORD.randomSearchInstance.getRandomWaitTime(), function() {
      if (NORD.randomSearchInstance)
        NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.LEAVE_ROOM);
    });
  });

  var option = this.getRandomRoomOption();
  var name = NORD.App.playerController.getName();
  name += Date.now();
  DemoLoadFunction.createRoom(name, option);
};

NORD.RandomSearchInstance.prototype.leaveRandomRoom = function() {
  if (DemoLoadFunction.myRoom() && DemoLoadFunction.myRoom().playerCount <= 1) {
    NORD.events.removeListener(NORD.EVENT_CODE.DISCONNECTED);
    NORD.events.on(NORD.EVENT_CODE.DISCONNECTED, function(data) {
      NORD.events.removeListener(NORD.EVENT_CODE.JOINED_LOBBY);
      NORD.events.on(NORD.EVENT_CODE.JOINED_LOBBY,
        function(data) {
          if (NORD.randomSearchInstance) {
            NORD.randomSearchInstance.randomJoinCount = 0;
            NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.RANDOM_JOIN);
          }
        });
    });
    DemoLoadFunction.myRoom().isVisible = false;
    DemoLoadFunction.myRoom().setIsVisible(false);
    console.log("Leaving Room ", DemoLoadFunction.myRoom().playerCount, DemoLoadFunction.myRoom());
    DemoLoadFunction.leaveRoom();
  } else {
    TweenMax.delayedCall(Math.random() * 2.0, function() {
      if (NORD.randomSearchInstance)
        NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.RANDOM_JOIN);
    });
  }
};

NORD.RandomSearchInstance.prototype.getRandomWaitTime = function() {
  switch (this.randomSearchState) {
    case NORD.CONNECTION_STATE.RANDOM_JOIN:
      {
        var minValue = Math.random() * 2 + 3.0;
        var maxValue = Math.random() * 2 + 7.0;
        var random = Math.random() * (maxValue - minValue);
        random += minValue;
        return random;
        break;
      }
    case NORD.CONNECTION_STATE.CREATING_ROOM:
      {
        var minValue = Math.random() * 2 + 4.0;
        var maxValue = Math.random() * 2 + 8.0;
        var random = Math.random() * (maxValue - minValue);
        random += minValue;
        return random;
        break;
      }
    case NORD.CONNECTION_STATE.LEAVE_ROOM:
      {
        var minValue = Math.random() * 2 + 3.0;
        var maxValue = Math.random() * 3 + 5.0;
        var random = Math.random() * (maxValue - minValue);
        random += minValue;
        return random;
        break;
      }
  }
}


NORD.RandomSearchInstance.prototype.getRandomRoomOption = function(mode) {
  var modType;
  var boardType;
  var gameModeList = [];
  var positionList = [];
  if (NORD.game.config.mode == "classic") {
    modType = NORD.game.panelSettings.actionMode;
    boardType = NORD.game.config.board;
  } else {
    modType = NORD.game.panelSettings.actionMode;
    boardType = NORD.game.config.board;
  }

  for (var i = 0; i < 24; i++) {
    var avaiableModes = NORD.game.field.roundGenerator.getAvaiablesModes();
    var roundMode = Util.randomElement(avaiableModes);
    avaiableModes.splice(avaiableModes.indexOf(roundMode), 1);
    gameModeList.push(roundMode);
    if (NORD.game.config.mode != "classic" && NORD.game.panelSettings.actionMode == "TELEPORT_MODE" || NORD.game.panelSettings.actionMode == "BLACK_HOLE_MODE")
      positionList.push(Math.floor(Math.random() * 2));
  }

  for (var i = 0; i < gameModeList.length; i++) {
    if (gameModeList[i] == "TELEPORT_MODE" || gameModeList[i] == "BLACK_HOLE_MODE")
      positionList.push(Math.floor(Math.random() * 2));
  }

  console.log("%%%%%%%%%%%", NORD.game.panelSettings.actionMode, "%%%%%%%%%%%", NORD.game.config.board);

  var option = {
    isVisible: true,
    expectedMaxPlayers: 2,
    maxPlayers: 2,
    customGameProperties: {
      mode: NORD.game.config.mode, //NORD.MULTIPLAYER_GAME_MODE.CLASSIC,
      gameType: NORD.MULTIPLAYER_GAME_TYPE.RANDOM,
      modeType: modType,
      board: boardType,
      gameModeList: gameModeList,
      positionList: positionList,
      difficulty: NORD.MULTIPLAYER_GAME_DIFFICULTY.EASY //NORD.App.playerController.config.playerDifficultyLevel
    }
  }
  return option;
}

NORD.RandomSearchInstance.prototype.disconnectServer = function() {
  if (NORD.gameState != NORD.GAME_STATE.SERARCHING) {
    return;
  }
  //do stuff
  console.log("Force Disconnecting server");
  NORD.events.removeListener(NORD.EVENT_CODE.DISCONNECTED);
  NORD.events.on(NORD.EVENT_CODE.DISCONNECTED, function(data) {
    if (DemoLoadFunction)
      DemoLoadFunction.start();
    else {
      NORD.demo = new DemoLoadBalancing();
      NORD.demo.start();
    }
  });
  NORD.events.removeListener(NORD.EVENT_CODE.JOINED_LOBBY);
  NORD.events.on(NORD.EVENT_CODE.JOINED_LOBBY, function(data) {
    if (NORD.randomSearchInstance) {
      NORD.randomSearchInstance.randomJoinCount = 0;
      NORD.randomSearchInstance.setRandomSearchState(NORD.CONNECTION_STATE.RANDOM_JOIN);
    }
  });

  if (DemoLoadFunction) {
    switch (DemoLoadFunction.state) {
      case Photon.LoadBalancing.LoadBalancingClient.State.Error:
      case Photon.LoadBalancing.LoadBalancingClient.State.Uninitialized:
      case Photon.LoadBalancing.LoadBalancingClient.State.ConnectedToMaster:
      case Photon.LoadBalancing.LoadBalancingClient.State.ConnectedToGameserver:
      case Photon.LoadBalancing.LoadBalancingClient.State.Joined:
      case Photon.LoadBalancing.LoadBalancingClient.State.Disconnected:
        {
          DemoLoadFunction.disconnect();
          break;
        }
    }
  } else {
    NORD.demo = new DemoLoadBalancing();
    NORD.demo.start();
  }
};


//Shunmugam CustomRoomCell Selection Popup
NORD.CustomRoomCell = function(config) {
  config.sizeType = 'relative';
  config.width = 300;
  config.height = 244;
  NORD.GUI.BasePanel.call(this, config);
  var self = this;
  this.state = 'hide';
  this.visible = false;
  this.interactiveChildren = false;

};

NORD.CustomRoomCell.prototype = Object.create(NORD.GUI.BasePanel.prototype);
NORD.CustomRoomCell.prototype.constructor = NORD.CustomRoomCell;

NORD.CustomRoomCell.prototype.show = function(data) {
  this.tween({
    name: 'show_anim'
  });
};

NORD.CustomRoomCell.prototype.hide = function(data, callback) {
  this.tween({
    name: 'hide_anim'
  }, function() {
    if (callback) callback();
  });
};

NORD.CustomRoomCell.prototype.tween = function(data, callback) {
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
