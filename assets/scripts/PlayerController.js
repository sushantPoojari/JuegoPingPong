"use strict";

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

NORD.PlayerController = function() {
  var _this = this;
  var allNameAdjective = [];
  var allNameNouns = [];
  var arrNameUsed = [
    []
  ];
  var config = {};
  this.randomAdjectiveNumber = -1;
  this.randomNounNumber = -1;

  PIXI.Container.call(this);
  var self = this;
  var allNameData = NORD.assetsManager.getJson('randomNames');
  this.allNameAdjective = allNameData['Adjectives'];
  this.allNameNouns = allNameData['Nouns'];

  this.arrNameUsed = Array(this.allNameAdjective.length).fill(false).map(() => Array(this.allNameNouns.length).fill(false));

  this.loadConfig();
  if (!this.config) {
    this.config = {
      playerName: "ping pong",
      playerAdjectiveId: -1,
      playerNounId: -1,
      playerRankNumber: 0,
      playerTier: NORD.RANK_TYPE.EASY,
      playerDifficultyLevel: NORD.MULTIPLAYER_GAME_DIFFICULTY.EASY,
      currentSelectedmode: "",
    };
    // this.getRandomName();
  } else {
    this.getNameById(this.config.playerAdjectiveId, this.config.playerNounId);
  }
  this.config.playerDifficultyLevel = this.getRankType();
  this.config.playerTier = this.getTierType();

  // console.log("Random Name is ", this.getRandomName());
  // Object.keys(settingsData).forEach(function(key) {
  //   if (_this.config[key]) _this.config[key].value = settingsData[key];
  // });

  console.log("Player Details ", this.config.playerName, " Mode ", this.config.mode, " ALl adjective name count ", allNameAdjective.length, " Nouns count " + allNameNouns.length);
};

NORD.PlayerController.prototype = Object.create(PIXI.Container.prototype);
NORD.PlayerController.prototype.constructor = NORD.PlayerController;

NORD.PlayerController.prototype.getRandomName = function() {
  var totalNameCount = 0;
  while (totalNameCount < 5000) {

    var randomAdjectiveNumber = Math.ceil(Math.random() * this.allNameAdjective.length);
    var randomNounNumber = Math.ceil(Math.random() * this.allNameNouns.length);
    if (this.arrNameUsed[randomAdjectiveNumber][randomNounNumber] == false) {
      this.arrNameUsed[randomAdjectiveNumber][randomNounNumber] = true;
      console.log("Player Name ", this.allNameAdjective[randomAdjectiveNumber], " ", this.allNameNouns[randomNounNumber], " i ", totalNameCount);
      this.randomAdjectiveNumber = randomAdjectiveNumber;
      this.randomNounNumber = randomNounNumber;

      // this.config.playerAdjectiveId = randomAdjectiveNumber;
      // this.config.playerNounId = randomNounNumber;
      // this.saveConfig();

      this.config.playerName = this.allNameAdjective[randomAdjectiveNumber] + " " + this.allNameNouns[randomNounNumber];
      return this.config.playerName;
    }
    totalNameCount++;
  }

  return "Name Not found";
}

NORD.PlayerController.prototype.getName = function() {
  if (this.config.playerName != "ping pong" && this.config.playerName != undefined) {
    return this.config.playerName;
  }
  return this.getNameById(this.config.playerAdjectiveId, this.config.playerNounId);
}

NORD.PlayerController.prototype.getNameById = function(adjectiveId, nounId) {
  return this.allNameAdjective[adjectiveId] + " " + this.allNameNouns[nounId];
}


NORD.PlayerController.prototype.getRankType = function() {
  if (this.config.playerRankNumber < 5) {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.EASY;
  } else if (this.config.playerRankNumber < 15) {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.MEDIUM;
  } else {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.HARD;
  }
};
NORD.PlayerController.prototype.getTierType = function() {
  if (this.config.playerRankNumber < 5) {
    return NORD.RANK_TYPE.EASY;
  } else if (this.config.playerRankNumber < 15) {
    return NORD.RANK_TYPE.MEDIUM;
  } else {
    return NORD.RANK_TYPE.HARD;
  }
};

NORD.PlayerController.prototype.getSecondRank = function() {
  if (this.config.playerRankNumber < 5) {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.MEDIUM;
  } else if (this.config.playerRankNumber < 15) {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.HARD;
  } else {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.EASY;
  }
};


NORD.PlayerController.prototype.getThirdRank = function() {
  if (this.config.playerRankNumber < 5) {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.HARD;
  } else if (this.config.playerRankNumber < 15) {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.EASY;
  } else {
    return NORD.MULTIPLAYER_GAME_DIFFICULTY.MEDIUM;
  }
};

NORD.PlayerController.prototype.increasePlayerRank = function() {
  this.config.playerRankNumber += 1;
  this.config.playerDifficultyLevel = this.getRankType();
  this.config.playerTier = this.getTierType();
  this.saveConfig();
};

NORD.PlayerController.prototype.getRankNumber = function() {
  return this.config.playerRankNumber;
};

NORD.PlayerController.prototype.saveConfig = function() {
  var data = this.config;
  var jsonString = JSON.stringify(data);
  localStorage.setItem('ping_pong_player', jsonString);
};

NORD.PlayerController.prototype.loadConfig = function() {
  var jsonString = localStorage.getItem('ping_pong_player');
  var data = JSON.parse(jsonString);
  if (!data) return;
  this.config = data;
};

//==========================================================================================================================================//
