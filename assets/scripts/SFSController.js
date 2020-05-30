NORD.sfsController = null;
NORD.sfs = null;
// var LOBBY_ROOM_NAME = "Ping Pong";
var LOBBY_ROOM_NAME = "The Lobby";

var USER_NAME = "user_name";
var GAME_ROOMS_GROUP_NAME = "games";


NORD.playersName = {
  playerName: "",
  opponentName: ""
};

NORD.sfsEventEmitter = new EventEmitter()

NORD.SFSController = function() {

  NORD.sfsController = this;
};

NORD.SFSController.prototype = Object.create(PIXI.Container.prototype);
NORD.SFSController.prototype.constructor = NORD.SFSController;

NORD.SFSController.prototype.initiializeSFS = function() {

  // Create configuration object
  var config = {};
  // config.host = "3.6.18.169";
  // config.port = 8383;

  config.host = "127.0.0.1";
  config.port = 8080;
  config.zone = "PingPongZone";
  config.debug = false;

  // Create SmartFox client instance
  var sfs = new SFS2X.SmartFox(config);
  sfs.enableLagMonitor(true, 1, 5);

  // Set logging level
  // Set logging
  sfs.logger.level = SFS2X.LogLevel.INFO;
  sfs.logger.enableConsoleOutput = false;
  sfs.logger.enableEventDispatching = false;

  sfs.logger.addEventListener(SFS2X.LogLevel.DEBUG, onDebugLogged, this);

  sfs.logger.addEventListener(SFS2X.LogLevel.INFO, onInfoLogged, this);
  sfs.logger.addEventListener(SFS2X.LogLevel.WARNING, onWarningLogged, this);
  sfs.logger.addEventListener(SFS2X.LogLevel.ERROR, onErrorLogged, this);

  // Add event listeners
  sfs.addEventListener(SFS2X.SFSEvent.PING_PONG, onPingPongEvent, this);
  sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
  sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
  sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
  sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
  sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, onLogout, this);
  sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
  sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);
  sfs.addEventListener(SFS2X.SFSEvent.PUBLIC_MESSAGE, onPublicMessage, this);
  sfs.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, onUserEnterRoom, this);
  sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, onUserExitRoom, this);
  sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, onUserVariablesUpdate, this);
  sfs.addEventListener(SFS2X.SFSEvent.USER_COUNT_CHANGE, onUserCountChange, this);
  sfs.addEventListener(SFS2X.SFSEvent.ROOM_REMOVE, onRoomRemove, this);
  sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, onRoomAdd, this);
  sfs.addEventListener(SFS2X.SFSEvent.INVITATION, onInvitation, this);
  sfs.addEventListener(SFS2X.SFSEvent.OBJECT_MESSAGE, onObjectMessage, this);

  sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, this);
  sfs.addEventListener(SFS2X.SFSEvent.PRIVATE_MESSAGE, onPrivateMessage, this);
  sfs.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, onRoomVarsUpdate, this);

  NORD.sfs = sfs;
  sfs.connect();

  //------------------------------------
  // LOGGER EVENT HANDLERS
  //------------------------------------
  function onDebugLogged(event) {
    console.log(event.message, "DEBUG", true);
  }

  function onInfoLogged(event) {
    console.log(event.message, "INFO", true);
  }

  function onWarningLogged(event) {
    console.log(event.message, "WARN", true);
  }

  function onErrorLogged(event) {
    console.log(event.message, "ERROR", true);
  }

  //------------------------------------
  // SFS EVENT HANDLERS
  //------------------------------------

  function onPingPongEvent(event) {
    console.log("pong wars ", event);
  }

  function onConnection(event) {
    // Reset view
    // setView("login", false);

    if (event.success) {
      console.log("Connected to SmartFoxServer 2X!");
    } else {
      var error = "Connection failed: " + (event.errorMessage ? event.errorMessage + " (code " + event.errorCode + ")" : "Is the server running at all?");
      showError(error);
    }
  }

  function onPingPongEvent(event) {
    console.log("Ping Pong Event ", event);
  }

  function onConnectionLost(event) {
    // Reset view
    // setView("login", true);

    // Show disconnection reason
    if (event.reason != SFS2X.ClientDisconnectionReason.MANUAL && event.reason != SFS2X.ClientDisconnectionReason.UNKNOWN) {
      var error = "You have been disconnected; reason is: " + event.reason;
      console.log(error);
    } else
      console.log("You have been disconnected; reason is: " + event.reason);
  }

  function onLoginError(event) {
    // Reset view
    setView("login", true);

    // Show error
    var error = "Login error: " + event.errorMessage + " (code " + event.errorCode + ")";
    showError(error);
  }

  function onLogin(event) {
    console.log("Login successful!" +
      "\n\tZone: " + event.zone +
      "\n\tUser: " + event.user);
    NORD.sfsEventEmitter.emit(NORD.PP_EVENT.EVENT_LOGIN_SUCCESS);

    var params = new SFS2X.SFSObject();
    params.putInt("a", 25);
    params.putInt("b", 17);

    // NORD.sfs.send( new SFS2X.ExtensionRequest("sum", params) );

    NORD.sfs.send(new SFS2X.ExtensionRequest("sub", params));
    NORD.sfs.send(new SFS2X.ExtensionRequest("sum", params));
    // NORD.sfs.send(new SFS2X.ExtensionRequest("createroom", params));
    NORD.sfs.send(new SFS2X.ExtensionRequest("FindRoom", null));



    // Set user name
    // NOTE: this always a good practice, in case a custom login procedure on the server side modified the username
    // $("#usernameIn").val(event.user.name);
    // $("#usernameLb").html(event.user.name);

    // Set default player details
    onPlayerProfileChange();

    // Join lobby room
    // joinLobbyRoom();
  }

  function onPlayerProfileChange() {

    var playerName = new SFS2X.SFSUserVariable(USER_NAME, NORD.App.playerController.getName());
    NORD.playersName.myName = playerName;
    var isSent = sfs.send(new SFS2X.SetUserVariablesRequest([playerName]));
  }

  function onLogout(event) {
    console.log("Logout from zone " + event.zone + " performed!");

    // Switch to LOGIN view
    setView("login", true);
  }

  function joinLobbyRoom() {
    if (NORD.sfs.lastJoinedRoom == null || NORD.sfs.lastJoinedRoom.name != LOBBY_ROOM_NAME)
      NORD.sfs.send(new SFS2X.JoinRoomRequest(LOBBY_ROOM_NAME));
  }

  function onRoomJoinError(event) {
    console.log("Room join error: " + event.errorMessage + " (code: " + event.errorCode + ")", true);

    if (event.errorCode == 20) {
      NORD.mainMenu.loadingPopup.show("Room is full\nPlease wait & Refresh Again");
    }
    // Reset roomlist selection
    // $("#roomList").jqxListBox("clearSelection");
  }

  function onRoomJoin(event) {
    console.log("Room joined: " + event.room);

    var params = new SFS2X.SFSObject();
    params.putInt("a", 30);
    params.putInt("b", 40);

    NORD.sfs.send(new SFS2X.ExtensionRequest("sum", params, NORD.sfs.lastJoinedRoom));


    // Switch view
    if (event.room.name == LOBBY_ROOM_NAME) {
      // $("#roomLb").html(event.room.name);
      // setView("lobby", true);

      // Reset game state in case a game was joined previously
      currentGameStarted = false;
    } else {
      // setView("game", true);

      // // Write game state to log area
      // $("#gameLogPn").jqxPanel("clearcontent");

      // writeToGameLogArea("You entered the game<br/><em>This is just a placeholder to show the game-related events</em>");

      // setGameState(true);
    }
  }

  function onObjectMessage(evtParams) {
    var dataObj = evtParams.message;

    var sender = evtParams.sender;
    var avatar = getUserAvatar(sender.id);

    avatar.x = dataObj.x;
    avatar.y = dataObj.y;
  }

  function onPublicMessage(event) {
    var sender = (event.sender.isItMe ? "You" : event.sender.name);
    console.log("onPublicMessage", sender, event);
    // if (event.room.name == LOBBY_ROOM_NAME)
    //     writeToLobbyChatArea("<b>" + sender + " said:</b><br/>" + event.message);
  }

  function onUserEnterRoom(event) {
    if (event.user.isItMe == false) {
      MultiplayerStarted = true;
      var seObj = new PP.ServerObject();
      seObj.eventType = NORD.PP_EVENT.EVENT_GAME_STARTED;

      NORD.gameEventHandler.sendEvent(seObj);
      NORD.gameEventHandler.onReciveEvent(seObj.eventType);
      IsHost = true;
    }
    if (event.room.name == LOBBY_ROOM_NAME) {
      // writeToLobbyChatArea("<em>User " + event.user.name + " (" + event.user.id + ") entered the room</em>");

      // For example code simplicity we rebuild the full userlist instead of just adding the specific item
      populateUsersList();
    } else {
      // writeToGameLogArea("User " + event.user.name + " joined the game", true);

      setGameState(true);
    }
  }

  function onUserExitRoom(event) {
    if (event.room.name == LOBBY_ROOM_NAME) {
      if (!event.user.isItMe)
      // writeToLobbyChatArea("<em>User " + event.user.name + " (" + event.user.id + ") left the room</em>");

      // For example code simplicity we rebuild the full userlist instead of just removing the specific item
        populateUsersList();
    } else {
      if (!event.user.isItMe) {
        writeToGameLogArea("User " + event.user.name + " left the game", true);

        setGameState(false);
      }
    }
  }

  function onUserVariablesUpdate(event) {
    console.log("onUserVariablesUpdate", event);

    if (event.changedVars.indexOf(USER_NAME) > -1) {

    }
    // Check if the 'country' or 'ranking' variables were set/updated
    // if (event.changedVars.indexOf(USERVAR_COUNTRY) > -1 || event.changedVars.indexOf(USERVAR_RANKING) > -1)
    {
      // For example code simplicity we rebuild the full userlist instead of just editing the specific item
      populateUsersList();
    }
  }

  function onUserCountChange(event) {
    if (event.uCount == 2) {
      // NORD.gameEventHandler.sendEvent(NORD.PP_EVENT.EVENT_GAME_STARTED);
    }
    // For example code simplicity we rebuild the full roomlist instead of just updating the specific item
    populateRoomsList();
  }

  function onRoomRemove(event) {

    // For example code simplicity we rebuild the full roomlist instead of just removing the item
    populateRoomsList();
  }

  function onRoomAdd(event) {

    // For example code simplicity we rebuild the full roomlist instead of just adding the new item
    populateRoomsList();
  }

  function onInvitation(event) {
    // Retrieve invitation data
    var invitation = event.invitation;

    // Display invitation panel
    processInvitation(invitation);
  }

  function onExtensionResponse(evtParams) {
    if (evtParams.cmd == "add") {
      var responseParams = evtParams.params;
    }
  }

  function onRoomVarsUpdate(evtParams) {
    var changedVars = evtParams.changedVars;
    var room = evtParams.room;

    // Check if the "gameStarted" variable was changed
    for (v in changedVars) {
      var eventType = changedVars[v];
      var senderId = room.getVariable("si");
      if (senderId != undefined && senderId.value == NORD.sfs.mySelf.id) {
        return;
      }
      switch (eventType) {
        case NORD.PP_EVENT.EVENT_GAME_STARTED:
        case NORD.PP_EVENT.EVENT_GAME_DEFEATED:
        case NORD.PP_EVENT.EVENT_GAME_EXIT_BETWEEN:
          {
            if (eventType == NORD.PP_EVENT.EVENT_GAME_STARTED)

              NORD.gameEventHandler.onReciveEvent(eventType);

            if (room.getVariable(NORD.PP_EVENT.EVENT_GAME_STARTED).value == true) {
              NORD.gameEventHandler.onReciveEvent(eventType);
            } else
              console.log("Game stopped");
            break;
          }
        case NORD.PP_EVENT.EVENT_GAME_INITIAL_BALL_MOVEMENT:
        case NORD.PP_EVENT.EVENT_GAME_BALL_POSITION:
          {
            if (room.getVariable(eventType).value == true) {

              var allValues = room.getVariable(PP.VARIABLE.VALUES);
              var arrayOFValues = allValues.value.getLongArray(PP.VARIABLE.VALUES);

              NORD.gameEventHandler.onReciveEvent(eventType, arrayOFValues);
            }
            break;
          }
        case NORD.PP_EVENT.EVENT_GAME_PADDLE_DISTORTION_VELOCITY:
          {
            if (room.getVariable(eventType).value == true) {
              var allValues = room.getVariable(PP.VARIABLE.VALUES);
              var arrayOFValues = allValues.value.getLongArray(PP.VARIABLE.VALUES);
              NORD.gameEventHandler.onReciveEvent(eventType, arrayOFValues);
            }
            break;
          }
        case NORD.PP_EVENT.EVENT_GAME_PADDLE_POSITION:
          {
            if (room.getVariable(eventType).value == true) {
              var allValues = room.getVariable(PP.VARIABLE.VALUES);
              var arrayOFValues = allValues.value.getLongArray(PP.VARIABLE.VALUES);
              NORD.gameEventHandler.onReciveEvent(eventType, arrayOFValues);
            }
            break;
          }

      }
    }

    // if (changedVars.indexOf("gameStarted") != -1) {
    //     if (room.getVariable("gameStarted").value == true)
    //         console.log("Game started");
    //     else
    //         console.log("Game stopped");
    // }
  }

  //Other methods

  function populateRoomsList() {
    var rooms = sfs.roomManager.getRoomList();
    var source = [];

    if (sfs.lastJoinedRoom != null && sfs.lastJoinedRoom.name == LOBBY_ROOM_NAME) {
      for (var r in rooms) {
        var room = rooms[r];

        if (room.isGame && !room.isPasswordProtected && !room.isHidden) {
          var players = room.userCount;
          var maxPlayers = room.maxUsers;
          var isStarted = room.getVariable(SFS2X.ReservedRoomVariables.RV_GAME_STARTED).value;

          var item = {};
          item.html = "<div><p class='itemTitle game'><strong>" + room.name + "</strong></p>" +
            "<p class='itemSub'>Players: " + players + "/" + maxPlayers + "</p>" +
            "<p class='itemSub'>" + (isStarted ? "Match started" + (players < maxPlayers ? ", join anyway!" : "") : "Waiting for players, wanna join?") + "</p></div>";
          item.title = room.name;
          item.roomObj = room;

          source.push(item);
        }
      }
    }

    // $("#roomList").jqxListBox({source: source});
  }

  function someMethod() {
    sfs.addEventListener(SFS2X.SFSEvent.PRIVATE_MESSAGE, onPrivateMessage, this);

    // Send a private message to Jack
    var user = sfs.usermanager.getUserByName("Jack");
    sfs.send(new SFS2X.Requests.System.PrivateMessageRequest("Hello my friend!", user.id));
  }

  function onPrivateMessage(evtparams) {
    // As messages are forwarded to the sender too,
    // I have to check if I am the sender

    var sender = evtparams.sender;

    if (sender != NORD.sfs.mySelf)
      console.log("User " + sender.name + " sent me this PM: " + evtparams.message);
  }

  function populateUsersList() {
    var index = 0;

    if (sfs.lastJoinedRoom != null && sfs.lastJoinedRoom.name == LOBBY_ROOM_NAME) {
      var users = sfs.lastJoinedRoom.getUserList();

      for (var u in users) {
        var user = users[u];

        if (user.containsVariable(USER_NAME)) {
          if (user.isItMe) {
            NORD.playersName.playerName = user.getVariable(USER_NAME).value
          } else {
            NORD.playersName.opponentName = user.getVariable(USER_NAME).value
          }
        }
      }
    }
    return;
    // enableButton("#inviteUserBt", false);

    // "main" indicates the main user list contained in the right accordion of the lobby view
    // "sec" indicates the secondary user list contained in the invitation tab of the game creation panel

    var mainSource = [];
    var mainSelectedIndex = -1;
    var mainSelectedUser = ($("#userList").jqxListBox("selectedIndex") > -1 ? $("#userList").jqxListBox("getSelectedItem").title : null);

    var secSource = [];
    var secSelectedIndexes = [];
    var secSelectedItems = $("#userSelector").jqxListBox("getSelectedItems");
    var secSelectedUsers = [];

    for (var o in secSelectedItems)
      secSelectedUsers.push(secSelectedItems[o].value);

    if (sfs.lastJoinedRoom != null && sfs.lastJoinedRoom.name == LOBBY_ROOM_NAME) {
      var users = sfs.lastJoinedRoom.getUserList();

      for (var u in users) {
        var user = users[u];

        if (!user.isItMe) {
          // MAIN USER LIST
          var mainItem = {};
          mainItem.html = "<div><p class='itemTitle'><strong>" + user.name + "</strong></p>";

          if (user.containsVariable(USERVAR_COUNTRY))
            mainItem.html += "<p class='itemSub'>Country: <strong>" + user.getVariable(USERVAR_COUNTRY).value + "</strong></p>";

          if (user.containsVariable(USERVAR_RANKING))
            mainItem.html += "<p class='itemSub'>Ranking: <strong>" + user.getVariable(USERVAR_RANKING).value + "</strong></p>";

          mainItem.html += "</div>";

          mainItem.title = user.name;
          mainItem.userObj = user;

          mainSource.push(mainItem);

          if (user.name == mainSelectedUser)
            mainSelectedIndex = index;

          // SECONDARY USER LIST
          secSource.push(user.name);

          if (secSelectedUsers.indexOf(user.name) > -1)
            secSelectedIndexes.push(index);

          index++;
        }
      }
    }

    // MAIN USER LIST

    // Populate list
    $("#userList").jqxListBox({
      source: mainSource
    });

    // Set selected index
    $("#userList").jqxListBox("selectedIndex", mainSelectedIndex);

    // Make sure selected index is visible
    if (mainSelectedIndex > -1)
      $("#userList").jqxListBox("ensureVisible", mainSelectedIndex + 1);

    // SECONDARY USER LIST

    // Populate list
    $("#userSelector").jqxListBox({
      source: secSource
    });

    // Set selected indexes
    for (var i = 0; i < secSelectedIndexes.length; i++)
      $("#userSelector").jqxListBox("selectIndex", secSelectedIndexes[i]);
  }
};

NORD.SFSController.prototype.connectToSFS = function() {
  NORD.sfs.connect();
};

NORD.SFSController.prototype.loginTo = function() {
  NORD.sfs.send(new SFS2X.LoginRequest(""));
};
NORD.SFSController.prototype.joinLobbyRoomNew = function() {
  if (NORD.sfs.lastJoinedRoom == null || NORD.sfs.lastJoinedRoom.name != LOBBY_ROOM_NAME)
  // NORD.sfs.send(new SFS2X.QuickJoinGameRequest(null, [GAME_ROOMS_GROUP_NAME], NORD.sfs.lastJoinedRoom));

    NORD.sfs.send(new SFS2X.JoinRoomRequest(LOBBY_ROOM_NAME));
}

NORD.SFSController.prototype.sendEvent = function(eventType, data) {
  // var sfso = new SFS2X.SFSObject();
  // sfso.putByte("id", 10);
  // sfso.putShort("health", 5000);
  // // sfso.putIntArray("pos", Arrays.asList(120,150));
  // sfso.putUtfString("name", "Hurricane");
  // NORD.sfs.send(new SFS2X.ExtensionRequest("setPosition", sfso));

  // var userVars = [];
  // userVars.push(new SFS2X.SFSUserVariable("t", 1));
  // userVars.push(new SFS2X.SFSUserVariable("ys", 33));
  // NORD.sfs.send(new SFS2X.SetUserVariablesRequest(userVars));

  // var users = NORD.sfs.lastJoinedRoom.getUserList();

  // for (var u in users) {
  //     var user = users[u];

  //     if (!user.isItMe)
  //     {
  //         var message = "Hello My dear friend " + user.name;

  //         NORD.sfs.send(new SFS2X.PrivateMessageRequest(NORD.sfs.mySelf, message, data));
  //     }
  // }

  data.push(new SFS2X.SFSRoomVariable("si", NORD.sfs.mySelf.id));
  NORD.sfs.send(new SFS2X.SetRoomVariablesRequest(data));

  // this.someMethod();
  // NORD.sfs.send( new SFS2X.PublicMessageRequest("data", data) );
  // NORD.sfs.send(new SFS2X.ObjectMessageRequest(data));

  // SFS2X.SFSEvent.OBJECT_MESSAGE

  // SFS2X.Requests.MMO.SetMMOItemVariables
  // NORD.sfs.send( new SFS2X.SetUserVariablesRequest(data) );
};
