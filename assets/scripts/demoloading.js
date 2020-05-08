/// <reference path="Photon/Photon-Javascript_SDK.d.ts"/>
var __extends = (this && this.__extends) || (function() {
  var extendStatics = Object.setPrototypeOf ||
    ({
        __proto__: []
      }
      instanceof Array && function(d, b) {
        d.__proto__ = b;
      }) ||
    function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return function(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
// For Photon Cloud Application access create cloud-app-info.js file in the root directory (next to default.html) and place next lines in it:
//var AppInfo = {
//    MasterAddress: "master server address:port",
//    AppId: "your app id",
//    AppVersion: "your app version",
//}
// fetching app info global variable while in global context
var DemoWss = this["AppInfo"] && this["AppInfo"]["Wss"];
var DemoAppId = this["AppInfo"] && this["AppInfo"]["AppId"] ? this["AppInfo"]["AppId"] : "<no-app-id>";
var DemoAppVersion = this["AppInfo"] && this["AppInfo"]["AppVersion"] ? this["AppInfo"]["AppVersion"] : "1.0";
var DemoMasterServer = this["AppInfo"] && this["AppInfo"]["MasterServer"];
var DemoFbAppId = this["AppInfo"] && this["AppInfo"]["FbAppId"];
var ConnectOnStart = true;
var DemoLoadFunction;
var ServerRegionList;
var ServerRegionListArray = [];
var RegionCounter = 0;

var DemoLoadBalancing = /** @class */ (function(_super) {
  __extends(DemoLoadBalancing, _super);

  function DemoLoadBalancing() {

    var iamAHoster = false;

    actorConfig = {};
    actorConfig.name = NORD.App.playerController.getName();
    var _this = _super.call(this, DemoWss ? Photon.ConnectionProtocol.Wss : Photon.ConnectionProtocol.Ws, DemoAppId, DemoAppVersion, actorConfig) || this;
    _this.logger = new Exitgames.Common.Logger("Demo:");
    // uncomment to use Custom Authentication
    // this.setCustomAuthentication("username=" + "yes" + "&token=" + "yes");
    _this.output(_this.logger.format("Init", _this.getNameServerAddress(), DemoAppId, DemoAppVersion));
    _this.logger.info("Init", _this.getNameServerAddress(), DemoAppId, DemoAppVersion);
    _this.setLogLevel(Exitgames.Common.Logger.Level.INFO);
    return _this;
  }
  DemoLoadBalancing.prototype.start = function() {
    this.setupUI();
    // connect if no fb auth required
    if (ConnectOnStart) {
      if (DemoMasterServer) {
        this.setMasterServerAddress(DemoMasterServer);
        this.connect();
      } else {
        this.connectToNameServer();
      }
    }
  };

  DemoLoadBalancing.prototype.onGetRegionsResult = function(errorCode, errorMsg, regions) {
    console.log("onGetRegionsResult:", errorCode, errorMsg, regions);
    ServerRegionList = regions;

    for (key in regions) {
      if (regions.hasOwnProperty(key)) {
        var urlAddress = regions[key];
        var region = Object.keys(regions).find(key => regions[key] === urlAddress);

        urlAddress = urlAddress.replace("wss", "https");
        console.log(urlAddress);

        if (this.checkCorrespondingRegion(region) != null) {
          ServerRegionListArray.push({
            region: region,
            address: urlAddress,
            country: this.checkCorrespondingRegion(region),
          });
        }
      }
    }
    // DemoLoadFunction.getFirstPing(function(ping) {
    //   for (var i = 0; i < ServerRegionListArray.length; i++) {
    //     if (ServerRegionListArray[i].address == ping) {
    //       var connectedReg = ServerRegionListArray[i].region;
    //       localStorage.setItem('savedServerRegion', connectedReg);
    //       console.log("connected region " + connectedReg);
    //       DemoLoadFunction.connectToRegionMaster(connectedReg);
    //     }
    //   }
    // });

    RegionCounter = 0;
    DemoLoadFunction.getPing();
    // var connectedReg = "in"; //ServerRegionListArray[0].region;
    // if (NORD.MultiplayerPopupSowed)
    //   NORD.mainMenu.loadingPopup.loaderText.text = "connecting region " + connectedReg;
    // localStorage.setItem('savedServerRegion', connectedReg);
    // console.log("connected region " + connectedReg);
    // NORD.mainMenu.multiplayerSelectionPopup.connectedRegion.text = 'connected region : ' + Util.checkCorrespondingRegion(localStorage.getItem('savedServerRegion'));
    // DemoLoadFunction.connectToRegionMaster(connectedReg);

    // for(var i=0; i<ServerRegionListArray.length; i++)
    // {
    //   var test = new DemoLoadBalancing.GetPingBandWidth(ServerRegionListArray[i].address,i,ServerRegionListArray[i].region, function(pingData){
    //     console.log("Ping --------> ", pingData);
    //         });
    // }
  };
  DemoLoadBalancing.prototype.checkCorrespondingRegion = function(region) {
    if (region == "asia")
      return "Asia";
    // if (region == "au")
    //   return "Australia";
    if (region == "cae")
      return "Canada, East";
    // if (region == "cn")
    //   return "Chinese Mainland";
    if (region == "eu")
      return "Europe";
    if (region == "in")
      return "India";
    // if (region == "jp")
    //   return "Japan";
    if (region == "ru")
      return "Russia";
    // if (region == "rue")
    //   return "Russia, East";
    // if (region == "za")
    //   return "South Africa";
    // if (region == "sa")
    //   return "South America";
    // if (region == "kr")
    //   return "South Korea";
    if (region == "us")
      return "USA, East	";
    // if (region == "usw")
    //   return "USA, West	";

    return null;
  };
  DemoLoadBalancing.prototype.getPing = function() {
    var address = ServerRegionListArray[RegionCounter].address;
    if (NORD.MultiplayerPopupSowed)
      NORD.mainMenu.loadingPopup.loaderText.text = "checking region " + ServerRegionListArray[RegionCounter].country;
    var p = new Ping();
    p.ping(address, function(err, data) {
      // Also display error if err is returned.
      if (err) {
        console.log("error loading resource")
        data = data + " " + err;
      }
      data = data.replace("error", "");
      data = parseInt(data);
      // console.log(data)
      console.log("Ping -----> 2 ", data);


      ServerRegionListArray[RegionCounter].data = data;


      if (ServerRegionListArray[RegionCounter].region == "asia") {
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.left.spriteOn.children[0].text = "Asia - " + ServerRegionListArray[RegionCounter].data + "ms";
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.left.spriteOff.children[0].text = "Asia - " + ServerRegionListArray[RegionCounter].data + "ms";

        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.left.spriteOn.children[0], ServerRegionListArray[RegionCounter].data)
        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.left.spriteOff.children[0], ServerRegionListArray[RegionCounter].data)
      }
      if (ServerRegionListArray[RegionCounter].region == "in") {
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.center.spriteOn.children[0].text = "India - " + ServerRegionListArray[RegionCounter].data + "ms";
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.center.spriteOff.children[0].text = "India - " + ServerRegionListArray[RegionCounter].data + "ms";

        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.center.spriteOn.children[0], ServerRegionListArray[RegionCounter].data)
        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.center.spriteOff.children[0], ServerRegionListArray[RegionCounter].data)
      }
      if (ServerRegionListArray[RegionCounter].region == "eu") {
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.right.spriteOn.children[0].text = "Europe - " + ServerRegionListArray[RegionCounter].data + "ms";
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.right.spriteOff.children[0].text = "Europe - " + ServerRegionListArray[RegionCounter].data + "ms";

        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.right.spriteOn.children[0], ServerRegionListArray[RegionCounter].data)
        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.right.spriteOff.children[0], ServerRegionListArray[RegionCounter].data)
      }
      if (ServerRegionListArray[RegionCounter].region == "us") {
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomLeft.spriteOn.children[0].text = "USA-East - " + ServerRegionListArray[RegionCounter].data + "ms";
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomLeft.spriteOff.children[0].text = "USA-East - " + ServerRegionListArray[RegionCounter].data + "ms";

        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomLeft.spriteOn.children[0], ServerRegionListArray[RegionCounter].data)
        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomLeft.spriteOff.children[0], ServerRegionListArray[RegionCounter].data)
      }
      if (ServerRegionListArray[RegionCounter].region == "ru") {
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomCenter.spriteOn.children[0].text = "Russia - " + ServerRegionListArray[RegionCounter].data + "ms";
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomCenter.spriteOff.children[0].text = "Russia - " + ServerRegionListArray[RegionCounter].data + "ms";

        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomCenter.spriteOn.children[0], ServerRegionListArray[RegionCounter].data)
        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomCenter.spriteOff.children[0], ServerRegionListArray[RegionCounter].data)
      }
      if (ServerRegionListArray[RegionCounter].region == "cae") {
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomRight.spriteOn.children[0].text = "Canada - " + ServerRegionListArray[RegionCounter].data + "ms";
        NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomRight.spriteOff.children[0].text = "Canada - " + ServerRegionListArray[RegionCounter].data + "ms";

        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomRight.spriteOn.children[0], ServerRegionListArray[RegionCounter].data)
        setColor(NORD.game.screenMainMenu.subModeSelectionPopup.switchRegion.sides.bottomRight.spriteOff.children[0], ServerRegionListArray[RegionCounter].data)
      }
      RegionCounter++;

      if (RegionCounter < ServerRegionListArray.length)
        DemoLoadFunction.getPing();
      // else {
      //   ServerRegionListArray.sort(compare);
      //   var connectedReg = ServerRegionListArray[0].region;
      //   if (NORD.MultiplayerPopupSowed)
      //     NORD.mainMenu.loadingPopup.loaderText.text = "connecting region " + connectedReg;
      //   localStorage.setItem('savedServerRegion', connectedReg);
      //   console.log("connected region " + connectedReg);
      //   NORD.mainMenu.multiplayerSelectionPopup.connectedRegion.text = 'connected region : ' + Util.checkCorrespondingRegion(localStorage.getItem('savedServerRegion'));
      //   DemoLoadFunction.connectToRegionMaster(connectedReg);
      // }


    });

    var setColor = function(object, value) {
      if (value <= 100)
        object.style.fill = 0x00FF00;
      else if (value <= 200)
        object.style.fill = 0xFFA500;
      else
        object.style.fill = 0xFF0000;



    };
  };

  DemoLoadBalancing.prototype.getBestRegion = function() {};

  function compare(a, b) {
    const bandA = a.data;
    const bandB = b.data;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  DemoLoadBalancing.prototype.getFirstPing = function(callaback) {
    var hasGotOne = false;

    function fetchServer(addr) {
      fetch(addr)
        .then((resp) => resp.json())
        .then(function(data) {
          console.log(data);
          if (!hasGotOne) {
            callaback(addr);
          }
          hasGotOne = true;
        })
        .catch(function(error) {
          console.log(error);
          if (!hasGotOne) {
            callaback(addr);
          }
          hasGotOne = true;
        });
    }
    for (var i = 0; i < ServerRegionListArray.length; i++) {
      var url = ServerRegionListArray[i].address;
      fetchServer(url);
    }
  };

  function compare(a, b) {
    const bandA = a.data;
    const bandB = b.data;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };
  DemoLoadBalancing.prototype.onError = function(errorCode, errorMsg) {
    this.output("Error " + errorCode + ": " + errorMsg);
    demo.start();
  };
  DemoLoadBalancing.prototype.onEvent = function(code, content, actorNr) {
    switch (code) {
      case 1:
        var mess = content.message[0].toString();
        NORD.gameEventHandler.onReciveEvent(mess, content.message);
        break;
      default:
    }
    // console.log(content.message.msg);
  };
  DemoLoadBalancing.prototype.onStateChange = function(state) {
    // "namespace" import for static members shorter acceess
    var LBC = Photon.LoadBalancing.LoadBalancingClient;

    console.log("DemoLoadBalancing change state ", state, LBC.StateToName(state));

    // var stateText = document.getElementById("statetxt");
    // stateText.textContent = LBC.StateToName(state);

    switch (state) {
      case LBC.State.ConnectedToNameServer:
        this.getRegions("Best Region");
        break;
      case Photon.LoadBalancing.LoadBalancingClient.State.JoinedLobby:
        {
          NORD.events.emit(NORD.EVENT_CODE.JOINED_LOBBY, LBC.StateToName(state));
          NORD.events.emit(NORD.EVENT_CODE.INITIALISING_PHOTON, LBC.StateToName(state));
          break;
        }
      case Photon.LoadBalancing.LoadBalancingClient.State.Disconnected:
        {
          NORD.events.emit(NORD.EVENT_CODE.DISCONNECTED, LBC.StateToName(state));
          break;
        }
      case Photon.LoadBalancing.LoadBalancingClient.State.Joined:
        {
          NORD.events.emit(NORD.EVENT_CODE.JOINED, LBC.StateToName(state));
          break;
        }

    }

    this.updateRoomButtons();
    // this.updateRoomInfo();
  };
  DemoLoadBalancing.prototype.updateRoomInfo = function() {
    // var stateText = document.getElementById("roominfo");
    // stateText.innerHTML = "room: " + this.myRoom().name + " [" + this.objToStr(this.myRoom()._customProperties) + "]";
    // stateText.innerHTML = stateText.innerHTML + "<br>";
    // stateText.innerHTML += " actors: ";
    // stateText.innerHTML = stateText.innerHTML + "<br>";
    // for (var nr in this.myRoomActors()) {
    //   var a = this.myRoomActors()[nr];
    //   stateText.innerHTML += " " + nr + " " + a.name + " [" + this.objToStr(a.customProperties) + "]";
    //   stateText.innerHTML = stateText.innerHTML + "<br>";
    // }
    this.updateRoomButtons();
  };
  DemoLoadBalancing.prototype.onActorPropertiesChange = function(actor) {
    DemoLoadFunction.updateRoomInfo();
  };
  DemoLoadBalancing.prototype.onMyRoomPropertiesChange = function() {
    DemoLoadFunction.updateRoomInfo();
  };

  DemoLoadBalancing.prototype.onRoomListUpdate = function(rooms, roomsUpdated, roomsAdded, roomsRemoved) {
    this.logger.info("Demo: onRoomListUpdate", rooms, roomsUpdated, roomsAdded, roomsRemoved);
    this.output("Demo: Rooms update: " + roomsUpdated.length + " updated, " + roomsAdded.length + " added, " + roomsRemoved.length + " removed");
    this.onRoomList(rooms);
    this.updateRoomButtons(); // join btn state can be changed
  };
  DemoLoadBalancing.prototype.onRoomList = function(rooms) {
    this.updateRoomButtons();
    return;
    var menu = document.getElementById("gamelist");
    while (menu.firstChild) {
      menu.removeChild(menu.firstChild);
    }
    var selectedIndex = 0;
    for (var i = 0; i < rooms.length; ++i) {
      var r = rooms[i];
      var item = document.createElement("option");
      item.attributes["value"] = r.name;
      item.textContent = r.name;
      menu.appendChild(item);
      if (this.myRoom().name == r.name) {
        selectedIndex = i;
      }
    }
    menu.selectedIndex = selectedIndex;
    this.output("Demo: Rooms total: " + rooms.length);
  };
  DemoLoadBalancing.prototype.onJoinRoom = function(isJoined) {
    console.log("DemoLoadBalancing.prototype.onJoinRoom " + isJoined);
    this.output("Game " + this.myRoom().name + " joined");
    DemoLoadFunction.updateRoomInfo();
    if (this.myRoom().isVisible) {
      if (this.myRoom().playerCount == 2) {
        clearTimeout(NORD.mainMenu.loadingPopup.timoutFunction);

        this.myRoom().setIsVisible(false);

        NORD.mainMenu.loadingPopup.hide();
        NORD.events.emit(NORD.EVENT_CODE.GAME_INITIATED, "Success");


        // var seObj1 = new PP.ServerObject();
        // seObj1.eventType = NORD.PP_EVENT.EVENT_GAME_EVENT_HOST_HANDSHAKE;
        // seObj1.currentPing = 0;
        // NORD.gameEventHandler.sendEvent(seObj1);

        MultiplayerStarted = true;

        MainMenuLocation.ballDiamondGeneratedPos = 140 * (Util.randomRangeInt(0, 1) == 0 ? 1 : -1);

        var seObj = new PP.ServerObject();
        seObj.ballDiamondPos = MainMenuLocation.ballDiamondGeneratedPos;
        seObj.eventType = NORD.PP_EVENT.EVENT_GAME_STARTED;

        NORD.gameEventHandler.sendEvent(seObj);
        NORD.gameState = NORD.GAME_STATE.IN_GAME;
        IsHost = true;

        NORD.game.ballImpulse.x = 0;
        NORD.game.ballImpulse.y = 0;

        var config = NORD.game.config;
        config.players = "one";
        config.dificulty = this.myRoom()._customProperties.difficulty;
        config.mode = this.myRoom()._customProperties.mode;
        NORD.game.setConfig(config);

        MainMenuLocation.boardSelected = DemoLoadFunction.myRoom()._customProperties.board;

        TweenMax.delayedCall(0.07 * 2, function() {
          if (NORD.game.config.mode !== 'action') MainMenuLocation.toGame(MainMenuLocation.boardSelected);
          else MainMenuLocation.toGame('board_2');
        });
      }
    }
  };
  DemoLoadBalancing.prototype.onActorJoin = function(actor) {
    console.log("actor " + actor.actorNr + " joined at ");
    DemoLoadFunction.updateRoomInfo();
  };
  DemoLoadBalancing.prototype.onActorLeave = function(actor) {
    console.log("actor " + actor.actorNr + " left");
    DemoLoadFunction.updateRoomInfo();
    MultiplayerStarted = false;
  };
  DemoLoadBalancing.prototype.startGame = function(message) {
    try {
      this.raiseEvent(1, {
        message: message
          // senderName: "user" + this.myActor().actorNr
      });
      console.log(this.myActor().actorNr + message);
    } catch (err) {
      this.output("error: " + err.message);
    }
  };
  DemoLoadBalancing.prototype.sendMessage = function(message) {
    // console.log("message - " + Exitgames.Common.Util.getEnumKeyByValue(NORD.PP_EVENT, message[0]) + " - " + sizeof(message));

    try {
      this.raiseEvent(1, {
        message: message
          // senderName: "user" + this.myActor().actorNr
      });
      // console.log(this.myActor().actorNr + message);
    } catch (err) {
      this.output("error: " + err.message);
    }
  };

  DemoLoadBalancing.prototype.setupUI = function() {
    var _this = this;
    DemoLoadFunction = this;
    this.logger.info("Setting up UI.");
    this.updateRoomButtons();
  };
  DemoLoadBalancing.prototype.output = function(str, color) {
    var log = document.getElementById("theDialogue");
    var escaped = str.replace(/&/, "&amp;").replace(/</, "&lt;").
    replace(/>/, "&gt;").replace(/"/, "&quot;");
    if (color) {
      escaped = "<FONT COLOR='" + color + "'>" + escaped + "</FONT>";
    }
  };



  DemoLoadBalancing.prototype.updateRoomButtons = function() {
    // if (MainMenuLocation != undefined) {
    //   MainMenuLocation.multilayerPanel.createRoomButton.interactive = (this.isInLobby() && !this.isJoinedToRoom());
    //
    //   var canJoin = this.isInLobby() && !this.isJoinedToRoom() && this.availableRooms().length > 0;
    //   MainMenuLocation.multilayerPanel.joinButton.interactive = canJoin;
    //
    //   // btn = document.getElementById("joinrandomgamebtn");
    //   // btn.disabled = !canJoin;
    //
    //   MainMenuLocation.multilayerPanel.leaveButton.interactive = (this.isJoinedToRoom());
    //
    //   if (this.isJoinedToRoom()) {
    //     if (this.actorsArray.length >= 2)
    //       MainMenuLocation.multilayerPanel.joinButton.interactive = false;
    //   }
    //
    // }
  };
  return DemoLoadBalancing;
}(Photon.LoadBalancing.LoadBalancingClient));
// var demo;
// window.onload = function() {
//   demo = new DemoLoadBalancing();
//   demo.start();
// };


DemoLoadBalancing.GetPingBandWidth = function(address, i, region, pongResponse) {
  // DemoLoadBalancing.call(this);

  var http = new XMLHttpRequest();
  http.pongResponse = pongResponse;
  http.started = new Date().getTime();
  http.iVal = i;
  http.address = address;
  http.region = region;

  http.open("GET", address, /*async*/ true);
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      var ended = new Date().getTime();
      var milliseconds = ended - http.started;

      if (http.pongResponse != null) {
        var response = {
          region: region,
          duration: milliseconds,
          iVal: http.iVal,
          address: http.address,
          started: http.started,
          ended: ended
        };

        http.pongResponse(response);
      }
    }
  };
  try {
    http.send(null);
  } catch (exception) {
    // this is expected
  }

};
