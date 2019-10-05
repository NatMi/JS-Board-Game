/*TODO:
 - add turns for players (player 2 is not moving on the map) - highlight active player - check which player is active
    ... event : move player with isActive=true, then change it to false and turn anorher player's attribute to true?
 - pick up new weapon / leave old weapon in the spot of the old one
 - add initial position of the players to be restricted (start from the opposite parts of the grid)
 - work on dimmed fields (right now some places on grid are unaccessable, what if one of the players gets stuck?
 - refine the code (get rid of some repetitions)
    
    */

//Weapons
class Weapon {
  constructor(weaponCssClass, weaponDamage) {
    this.weaponCssClass = weaponCssClass;
    this.weaponDamage = weaponDamage;
  }
}

let snowball = new Weapon("snowball", 5);
let fish = new Weapon("fish", 10);
let smallStone = new Weapon("smallStone", 15);
let bigStone = new Weapon("bigStone", 20);

let pickableWeapons = [fish, smallStone, bigStone];
let defaultWeapon = snowball;

//generic variables
let allMapSquares = document.getElementsByClassName("mapSquare");
let mapContainer = document.getElementById("map-container");
let initialHealthStatus = 100;
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
  for (weapon of pickableWeapons) {
    let isOnMap = 0;
    while (isOnMap < 2) {
      let newWeapon = randomPositionOnMap();
      if (newWeapon.className === "mapSquare") {
        newWeapon.classList.add(weapon.weaponCssClass);
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
  generatePlayersPosition(playerTwo);
  generateWeapons();
}

drawMapGrid(12);
let availableList = document.getElementsByClassName("availableSquare");

// Stat box

///////////////////////// MOVEMENT ///////////////////////////

//up
function checkAvailableSquaresUp(player) {
  for (let i = 0; i < 4; i++) {
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    x = player.positionArray()[0] - i;

    let newCheck = `${x}-${y}`;
    let newCheckId = document.getElementById(`${newCheck}`);

    if (newCheckId == null) {
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      i = 4;
    } else {
      newCheckId.classList.add("availableSquare");
    }
  }
}

//down
function checkAvailableSquaresDown(player) {
  for (let i = 0; i < 4; i++) {
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    x = player.positionArray()[0] + i;

    let newCheck = `${x}-${y}`;
    let newCheckId = document.getElementById(`${newCheck}`);

    if (newCheckId == null) {
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      i = 4;
    } else {
      newCheckId.classList.add("availableSquare");
    }
  }
}

//right
function checkAvailableSquaresRight(player) {
  for (let i = 0; i < 4; i++) {
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    y = player.positionArray()[1] + i;

    let newCheck = `${x}-${y}`;
    let newCheckId = document.getElementById(`${newCheck}`);

    if (newCheckId == null) {
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      i = 4;
    } else {
      newCheckId.classList.add("availableSquare");
    }
  }
}

//left
function checkAvailableSquaresLeft() {
  let positionArray = playerOne.positionArray();
  let availableToCheck = 0;
  let x = positionArray[0];
  let y = positionArray[1];

  while (availableToCheck < 3) {
    availableToCheck++;
    y = positionArray[1] - availableToCheck;
    testCheck(x, y);
  }
}
function checkAvailableSquaresLeft(player) {
  for (let i = 0; i < 4; i++) {
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    y = player.positionArray()[1] - i;

    let newCheck = `${x}-${y}`;
    let newCheckId = document.getElementById(`${newCheck}`);

    if (newCheckId == null) {
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      i = 4;
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

checkAvailableSquares(playerOne);

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
  console.log(`Moved player to mapSquare with id "${chosenSquare.id}"`);

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

//////////////////////////   CLICK EVENTS   /////////////////////////////////////////

const body = document.querySelector("body");
body.addEventListener("click", event => {
  if (
    event.target.classList.contains("mapSquare") &
    event.target.classList.contains("availableSquare")
  ) {
    movePlayer(activePlayer());
  } else {
    console.log("Clicked on a non accesible space");
  }
});

// statbox

function statboxFunction(player) {
  let paragraphHealth = document.createElement("p");
  let health = document.createTextNode(`Health: ${player.healthPoints}`);
  paragraphHealth.appendChild(health);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphHealth);

  let paragraphWeapon = document.createElement("p");
  let weapon = document.createTextNode(
    `Weapon: ${player.Weapon.weaponCssClass}`
  );
  paragraphWeapon.appendChild(weapon);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphWeapon);

  let paragraphDamage = document.createElement("p");
  let damage = document.createTextNode(`Damage: ${player.Weapon.weaponDamage}`);

  paragraphDamage.appendChild(damage);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphDamage);

  let paragraphPosition = document.createElement("p");
  let position = document.createTextNode(`Position: ${player.position.id}`);

  paragraphPosition.appendChild(position);
  document.getElementById(`${player.statboxId}`).appendChild(paragraphPosition);
}
statboxFunction(playerOne);
statboxFunction(playerTwo);
