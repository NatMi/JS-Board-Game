"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

//Weapons
var weapons = [
  { cssClass: "snowball", damage: 5 },
  { cssClass: "fish", damage: 10 },
  { cssClass: "smallStone", damage: 15 },
  { cssClass: "bigStone", damage: 20 }
];

var pickableWeapons = weapons.filter(function(weapon) {
  return weapon.damage > 5;
});

var defaultWeapon = weapons.find(function(weapon) {
  return weapon.cssClass == "snowball";
});

//generic variables
var allMapSquares = document.getElementsByClassName("mapSquare");
var mapContainer = document.getElementById("map-container");
var initialHealthStatus = 100;
var dimmedSquareClass = "dimmedSquare";

//Players

var Player = function Player(cssClass, statboxId) {
  var _this = this;

  _classCallCheck(this, Player);

  this.cssClass = cssClass;
  this.statboxId = statboxId;
  this.isActive = false;
  this.position = null;
  this.healthPoints = initialHealthStatus;
  this.Weapon = defaultWeapon;
  this.positionArray = function() {
    var currentId = _this.position.id.split("-");
    currentId[0] = parseInt(currentId[0]);
    currentId[1] = parseInt(currentId[1]);
    return currentId;
  };
};

var playerOne = new Player("playerOne", "statboxOne");
var playerTwo = new Player("playerTwo", "statboxTwo");

var activePlayer = function activePlayer() {
  if (playerOne.isActive == true) {
    return playerOne;
  } else if (playerTwo.isActive == true) {
    return playerTwo;
  }
};

/////////////////////////////    Generate map grid    /////////////////////////////////////

//Randomizing position on map grid --> returns random element from allMapSquares HTML collection
function randomPositionOnMap() {
  var randomIndex = Math.floor(Math.random() * allMapSquares.length);
  var newRandomSquare = allMapSquares[randomIndex];
  return newRandomSquare;
}
function generateDimmedSquares() {
  var totalDimmed = 0;
  while (totalDimmed < 15) {
    var newDimmedSquare = randomPositionOnMap();

    if (newDimmedSquare.className === "mapSquare") {
      newDimmedSquare.classList.add("dimmedSquare");
      totalDimmed++;
    }
  }
}
function generatePlayersPosition(player) {
  var isOnMap = 0;
  while (isOnMap < 1) {
    var newPlayer = randomPositionOnMap();
    if (newPlayer.className === "mapSquare") {
      newPlayer.classList.add(player.cssClass);
      isOnMap++;
    }
    player.position = document.getElementsByClassName(player.cssClass)[0];
  }
}

function generateWeapons() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = pickableWeapons[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      let weapon = _step.value;

      var isOnMap = 0;
      while (isOnMap < 2) {
        var newWeapon = randomPositionOnMap();
        if (newWeapon.className === "mapSquare") {
          newWeapon.classList.add(weapon.cssClass);
          isOnMap++;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
///////////////////////////////////// Draw map grid //////////////////////////////////
function drawMapGrid(size) {
  for (var row = 0; row < size; row++) {
    var mapGridRow = document.createElement("div");
    mapGridRow.className = "mapGridRow";
    mapGrid.appendChild(mapGridRow);

    for (var column = 0; column < size; column++) {
      var mapSquare = document.createElement("div");
      mapSquare.className = "mapSquare";
      mapSquare.id = [row + 1] + "-" + [column + 1];
      mapGridRow.appendChild(mapSquare);
    }
  }

  generateDimmedSquares();
  generatePlayersPosition(playerOne);
  playerOne.isActive = true;
  checkAvailableSquares(playerOne);
  generatePlayersPosition(playerTwo);
  generateWeapons();
}

drawMapGrid(12);
statboxFunction(playerOne);
statboxFunction(playerTwo);
var availableList = document.getElementsByClassName("availableSquare");

///////// statbox
function statboxFunction(player) {
  var paragraphHealth = document.createElement("p");
  var health = document.createTextNode("Health: " + player.healthPoints);
  paragraphHealth.appendChild(health);
  document.getElementById("" + player.statboxId).appendChild(paragraphHealth);

  var paragraphWeapon = document.createElement("p");
  var weapon = document.createTextNode("Weapon: " + player.Weapon.cssClass);
  paragraphWeapon.appendChild(weapon);
  document.getElementById("" + player.statboxId).appendChild(paragraphWeapon);

  var paragraphDamage = document.createElement("p");
  var damage = document.createTextNode("Damage: " + player.Weapon.damage);

  paragraphDamage.appendChild(damage);
  document.getElementById("" + player.statboxId).appendChild(paragraphDamage);

  var paragraphPosition = document.createElement("p");
  var position = document.createTextNode("Position: " + player.position.id);

  paragraphPosition.appendChild(position);
  document.getElementById("" + player.statboxId).appendChild(paragraphPosition);
}

///////////////////////// MOVEMENT ///////////////////////////
// function testCheck(player) {
//   let x = player.positionArray()[0];
//   let y = player.positionArray()[1];
//   let i = 0;
//   function checkCases(c, d) {
//     while (i < 3) {
//       let manipulateX = c;
//       let manipulateY = d;
//       let newCheck = `${manipulateX}-${manipulateY}`;

//       let newCheckId = document.getElementById(`${newCheck}`);
//       if (newCheckId == null) {
//         i = 3;
//       } else if (newCheckId.classList.contains("dimmedSquare")) {
//         i = 3;
//       } else if (
//         newCheckId.classList.contains("playerOne") ||
//         newCheckId.classList.contains("playerTwo")
//       ) {
//         alert("Fight!");
//         i = 3;
//       } else {
//         newCheckId.classList.add("availableSquare");
//         i++;
//         console.log(i);
//       }
//     }
//     i = 0;
//   }
//   //left
//   leftCheckX = x - (i + 1);

//   checkCases(leftCheckX, y);
//   //right
//   let rightCheckX = x + (i + 1);

//   checkCases(rightCheckX, y);
//   //top
//   let topCheckY = y - (i + 1);
//   checkCases(x, topCheckY);

//   checkCases(x, topCheckY);
//   // bottom
//   let bottomCheckY = y + (i + 1);

//   checkCases(x, bottomCheckY);
// }

//up
function checkAvailableSquaresUp(player) {
  for (var i = 0; i < 3; i++) {
    var x = player.positionArray()[0];
    var y = player.positionArray()[1];
    x = player.positionArray()[0] - (i + 1);

    var newCheck = x + "-" + y;
    var newCheckId = document.getElementById("" + newCheck);

    if (newCheckId == null || newCheckId.classList.contains("dimmedSquare")) {
      i = 3;
    } else if (
      newCheckId.classList.contains("playerOne") ||
      newCheckId.classList.contains("playerTwo")
    ) {
      alert("Fight!");
    } else {
      newCheckId.classList.add("availableSquare");
    }
  }
}

//down
function checkAvailableSquaresDown(player) {
  for (var i = 0; i < 3; i++) {
    var x = player.positionArray()[0];
    var y = player.positionArray()[1];
    x = player.positionArray()[0] + (i + 1);

    var newCheck = x + "-" + y;
    var newCheckId = document.getElementById("" + newCheck);

    if (newCheckId == null) {
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      i = 4;
    } else if (
      newCheckId.classList.contains("playerOne") ||
      newCheckId.classList.contains("playerTwo")
    ) {
      alert("Fight!");
    } else {
      newCheckId.classList.add("availableSquare");
    }
  }
}

//right
function checkAvailableSquaresRight(player) {
  for (var i = 0; i < 3; i++) {
    var x = player.positionArray()[0];
    var y = player.positionArray()[1];
    y = player.positionArray()[1] + (i + 1);

    var newCheck = x + "-" + y;
    var newCheckId = document.getElementById("" + newCheck);

    if (newCheckId == null) {
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      i = 4;
    } else if (
      newCheckId.classList.contains("playerOne") ||
      newCheckId.classList.contains("playerTwo")
    ) {
      alert("Fight!");
    } else {
      newCheckId.classList.add("availableSquare");
    }
  }
}

//left

function checkAvailableSquaresLeft(player) {
  for (var i = 0; i < 3; i++) {
    var x = player.positionArray()[0];
    var y = player.positionArray()[1];
    y = player.positionArray()[1] - (i + 1);

    var newCheck = x + "-" + y;
    var newCheckId = document.getElementById("" + newCheck);

    if (newCheckId == null) {
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      i = 4;
    } else if (
      newCheckId.classList.contains("playerOne") ||
      newCheckId.classList.contains("playerTwo")
    ) {
      alert("Fight!");
    } else {
      newCheckId.classList.add("availableSquare");
    }
  }
}

// checks availableSquares upon game start
function checkAvailableSquares(player) {
  checkAvailableSquaresUp(player);
  checkAvailableSquaresDown(player);
  checkAvailableSquaresRight(player);
  checkAvailableSquaresLeft(player);
}

////////////////////

function takePlayerAway(player) {
  document.getElementById(player.position.id).classList.remove(player.cssClass);
}

function clearAccessible() {
  while (availableList.length) {
    availableList[availableList.length - 1].classList.remove("availableSquare");
  }
}

// movePlayer

function movePlayer(player) {
  clearAccessible();
  takePlayerAway(player);

  var chosenSquare = document.getElementById(event.target.id);
  chosenSquare.classList.add(player.cssClass);
  player.position = chosenSquare;
  console.log('Moved player to mapSquare with id "' + chosenSquare.id + '"');
  // check if chosen square contains weapon

  var _loop = function _loop(_i) {
    if (chosenSquare.classList.contains("" + weapons[_i].cssClass)) {
      console.log("grabbed " + weapons[_i].cssClass);
      chosenSquare.classList.add("" + player.Weapon.cssClass);
      player.Weapon = weapons.find(function(item) {
        return item.cssClass == weapons[_i].cssClass;
      });
      chosenSquare.classList.remove("" + weapons[_i].cssClass);
      _i = weapons.length;
    }
    i = _i;
  };

  for (var i = 0; i < weapons.length; i++) {
    _loop(i);
  }

  if (activePlayer() == playerOne) {
    playerOne.isActive = false;
    playerTwo.isActive = true;
  } else if (activePlayer() == playerTwo) {
    playerTwo.isActive = false;
    playerOne.isActive = true;
  }

  document.getElementById("" + player.statboxId).innerHTML = "";
  statboxFunction(player);
  checkAvailableSquares(activePlayer());
}

//////////////////////////   CLICK EVENTS   /////////////////////////////////////////

var body = document.querySelector("body");
body.addEventListener("click", function(event) {
  if (event.target.classList.contains("availableSquare")) {
    movePlayer(activePlayer());
  } else {
    console.log("Clicked on a non accesible space");
  }
});
