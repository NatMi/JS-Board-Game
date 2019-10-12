//Weapons
let weapons = [
  { cssClass: "snowball", damage: 5 },
  { cssClass: "fish", damage: 10 },
  { cssClass: "smallStone", damage: 15 },
  { cssClass: "bigStone", damage: 20 }
];

let pickableWeapons = weapons.filter(weapon => {
  return weapon.damage > 5;
});

let defaultWeapon = weapons.find(weapon => {
  return weapon.cssClass == "snowball";
});

//generic variables
let allMapSquares = document.getElementsByClassName("mapSquare");
let mapContainer = document.getElementById("map-container");
const initialHealthStatus = 100;
let dimmedSquareClass = "dimmedSquare";

//Players
class Player {
  constructor(cssClass, statboxId) {
    this.cssClass = cssClass;
    this.statboxId = statboxId;
    this.isActive = false;
    this.position = null;
    this.healthPoints = initialHealthStatus;
    this.Weapon = defaultWeapon;
    this.positionArray = () => {
      let currentId = this.position.id.split("-");
      currentId[0] = parseInt(currentId[0]);
      currentId[1] = parseInt(currentId[1]);
      return currentId;
    };
  }
}

let playerOne = new Player("playerOne", "statboxOne");
let playerTwo = new Player("playerTwo", "statboxTwo");

let activePlayer = () => {
  if (playerOne.isActive == true) {
    return playerOne;
  } else if (playerTwo.isActive == true) {
    return playerTwo;
  }
};

/////////////////////////////    Generate map grid    /////////////////////////////////////

//Randomizing position on map grid --> returns random element from allMapSquares HTML collection
function randomPositionOnMap() {
  let randomIndex = Math.floor(Math.random() * allMapSquares.length);
  let newRandomSquare = allMapSquares[randomIndex];
  return newRandomSquare;
}
function generateDimmedSquares() {
  let totalDimmed = 0;
  while (totalDimmed < 15) {
    let newDimmedSquare = randomPositionOnMap();

    if (newDimmedSquare.className === "mapSquare") {
      newDimmedSquare.classList.add("dimmedSquare");
      totalDimmed++;
    }
  }
}

function generatePlayersPosition(player) {
  let isOnMap = 0;
  while (isOnMap < 1) {
    let newPlayer = randomPositionOnMap();
    if (newPlayer.className === "mapSquare") {
      newPlayer.classList.add(player.cssClass);
      isOnMap++;
    }
    player.position = document.getElementsByClassName(player.cssClass)[0];
  }
}

function generateWeapons() {
  for (let weapon of pickableWeapons) {
    let isOnMap = 0;
    while (isOnMap < 2) {
      let newWeapon = randomPositionOnMap();
      if (newWeapon.className === "mapSquare") {
        newWeapon.classList.add(weapon.cssClass);
        isOnMap++;
      }
    }
  }
}
///////////////////////////////////// Draw map grid //////////////////////////////////
function drawMapGrid(size) {
  for (let row = 0; row < size; row++) {
    let mapGridRow = document.createElement("div");
    mapGridRow.className = "mapGridRow";
    mapGrid.appendChild(mapGridRow);

    for (let column = 0; column < size; column++) {
      let mapSquare = document.createElement("div");
      mapSquare.className = "mapSquare";
      mapSquare.id = `${[row + 1]}-${[column + 1]}`;
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
let availableList = document.getElementsByClassName("availableSquare");

///////// statbox
function statboxFunction(player) {
  let paragraphHealth = document.createElement("p");
  let health = document.createTextNode(`Health: ${player.healthPoints}`);
  paragraphHealth.appendChild(health);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphHealth);

  let paragraphWeapon = document.createElement("p");
  let weapon = document.createTextNode(`Weapon: ${player.Weapon.cssClass}`);
  paragraphWeapon.appendChild(weapon);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphWeapon);

  let paragraphDamage = document.createElement("p");
  let damage = document.createTextNode(`Damage: ${player.Weapon.damage}`);

  paragraphDamage.appendChild(damage);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphDamage);

  let paragraphPosition = document.createElement("p");
  let position = document.createTextNode(`Position: ${player.position.id}`);

  paragraphPosition.appendChild(position);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphPosition);
}

///////////////////////// MOVEMENT ///////////////////////////

// checks availableSquares upon game start
function checkAvailableSquares(player) {
  function check(player, index, factor) {
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];

    for (let i = 0; i < 3; i++) {
      if (index === 1) {
        y = player.positionArray()[index] + (i + 1) * factor;
      } else if (index === 0) {
        x = player.positionArray()[index] + (i + 1) * factor;
      }

      let newCheck = `${x}-${y}`;
      let newCheckId = document.getElementById(`${newCheck}`);

      if (newCheckId == null) {
        i = 4;
      } else if (newCheckId.classList.contains("dimmedSquare")) {
        i = 4;
      } else if (
        newCheckId.classList.contains("playerOne") ||
        newCheckId.classList.contains("playerTwo")
      ) {
        fightMode();
      } else {
        newCheckId.classList.add("availableSquare");
      }
    }
  }

  check(player, 0, -1); //up
  check(player, 0, 1); //down
  check(player, 1, -1); //left
  check(player, 1, 1); //right
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

  let chosenSquare = document.getElementById(event.target.id);
  chosenSquare.classList.add(player.cssClass);
  player.position = chosenSquare;
  // check if chosen square contains weapon
  for (let i = 0; i < weapons.length; i++) {
    if (chosenSquare.classList.contains(`${weapons[i].cssClass}`)) {
      console.log(`grabbed ${weapons[i].cssClass}`);
      chosenSquare.classList.add(`${player.Weapon.cssClass}`);
      player.Weapon = weapons.find(item => {
        return item.cssClass == weapons[i].cssClass;
      });
      chosenSquare.classList.remove(`${weapons[i].cssClass}`);
      i = weapons.length;
    }
  }

  if (activePlayer() == playerOne) {
    playerOne.isActive = false;
    playerTwo.isActive = true;
  } else if (activePlayer() == playerTwo) {
    playerTwo.isActive = false;
    playerOne.isActive = true;
  }

  document.getElementById(`${player.statboxId}`).innerHTML = "";
  statboxFunction(player);
  checkAvailableSquares(activePlayer());
}
/////////////////// FIGHT MODE /////////////////////////////////////
function fightMode() {
  mapGrid.classList.add("disabled");
}
//////////////////////////   CLICK EVENTS   /////////////////////////////////////////

const body = document.querySelector("body");
body.addEventListener("click", event => {
  if (event.target.classList.contains("availableSquare")) {
    movePlayer(activePlayer());
  } else {
    console.log("Clicked on a non accesible space");
  }
});
