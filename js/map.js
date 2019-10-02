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
  constructor(weaponName, weaponDamage) {
    this.weaponName = weaponName;
    this.weaponDamage = weaponDamage;
  }
}

let snowball = new Weapon("snowball", 5);
let fish = new Weapon("fish", 10);
let smallStone = new Weapon("smallStone", 15);
let bigStone = new Weapon("bigStone", 20);

let pickableWeapons = [fish, smallStone, bigStone];

//generic variables
let allMapSquares = document.getElementsByClassName("mapSquare");
let mapContainer = document.getElementById("map-container");
let initialHealthStatus = 100;
let defaultWeapon = snowball;
let dimmedSquareClass = "dimmedSquare";

//Players
class Player {
  constructor(cssClass, isActive) {
    this.cssClass = cssClass;
    this.isActive = false;
    this.position = null;
    this.positionArray = () => {
      let currentId = this.position.id.split("-");
      currentId[0] = parseInt(currentId[0]);
      currentId[1] = parseInt(currentId[1]);
      return currentId;
    };
    this.healthPoints = initialHealthStatus;
    this.Weapon = defaultWeapon;
  }
}
let playerOne = new Player("playerOne");
let playerTwo = new Player("playerTwo");

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
    while (isOnMap < 1) {
      let newWeapon = randomPositionOnMap();
      if (newWeapon.className === "mapSquare") {
        newWeapon.classList.add(weapon.weaponName);
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

drawMapGrid(10);
let availableList = document.getElementsByClassName("availableSquare");

///////////////////////// MOVEMENT ///////////////////////////

function testCheck(vertical, horizontal) {
  let newCheck = `${vertical}-${horizontal}`; // 4.  Calculate coordinates of a box below playerOne and insert it into a string
  console.log(`1. calculated id: ${newCheck}`);
  let newCheckId = document.getElementById(`${newCheck}`); // 5. Find an element with calculated id
  // console.log(`2. found an element with id ${newCheck}`);

  if (newCheckId == null) {
    console.log("border met");
  } else if (newCheckId.classList.contains("dimmedSquare")) {
    console.log("obstacle met");
  } else {
    newCheckId.classList.add("availableSquare"); // 6. add available class to the first calculated element
    console.log(`3. added "available" class to element with id ${newCheck}`);
  }
}

//up
function checkAvailableSquaresUp(player) {
  console.log("checking: up");

  for (let i = 0; i < 4; i++) {
    console.log(`repetition nr: ${i} `);
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    x = player.positionArray()[0] - i;

    let newCheck = `${x}-${y}`; // 4.  Calculate coordinates of a box below playerOne and insert it into a string
    console.log(`1. calculated id: ${newCheck}`);
    let newCheckId = document.getElementById(`${newCheck}`); // 5. Find an element with calculated id
    // console.log(`2. found an element with id ${newCheck}`);

    if (newCheckId == null) {
      console.log("border met");
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      console.log("obstacle met");
      i = 4;
    } else {
      newCheckId.classList.add("availableSquare"); // 6. add available class to the first calculated element
      console.log(`3. added "available" class to element with id ${newCheck}`);
    }
  }
}

//down
function checkAvailableSquaresDown(player) {
  console.log("checking: up");

  for (let i = 0; i < 4; i++) {
    console.log(`repetition nr: ${i} `);
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    x = player.positionArray()[0] + i;

    let newCheck = `${x}-${y}`; // 4.  Calculate coordinates of a box below playerOne and insert it into a string
    console.log(`1. calculated id: ${newCheck}`);
    let newCheckId = document.getElementById(`${newCheck}`); // 5. Find an element with calculated id
    // console.log(`2. found an element with id ${newCheck}`);

    if (newCheckId == null) {
      console.log("border met");
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      console.log("obstacle met");
      i = 4;
    } else {
      newCheckId.classList.add("availableSquare"); // 6. add available class to the first calculated element
      console.log(`3. added "available" class to element with id ${newCheck}`);
    }
  }
}

//right
function checkAvailableSquaresRight(player) {
  console.log("checking: up");

  for (let i = 0; i < 4; i++) {
    console.log(`repetition nr: ${i} `);
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    y = player.positionArray()[1] + i;

    let newCheck = `${x}-${y}`; // 4.  Calculate coordinates of a box below playerOne and insert it into a string
    console.log(`1. calculated id: ${newCheck}`);
    let newCheckId = document.getElementById(`${newCheck}`); // 5. Find an element with calculated id
    // console.log(`2. found an element with id ${newCheck}`);

    if (newCheckId == null) {
      console.log("border met");
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      console.log("obstacle met");
      i = 4;
    } else {
      newCheckId.classList.add("availableSquare"); // 6. add available class to the first calculated element
      console.log(`3. added "available" class to element with id ${newCheck}`);
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
  console.log("checking: up");

  for (let i = 0; i < 4; i++) {
    console.log(`repetition nr: ${i} `);
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];
    y = player.positionArray()[1] - i;

    let newCheck = `${x}-${y}`; // 4.  Calculate coordinates of a box below playerOne and insert it into a string
    console.log(`1. calculated id: ${newCheck}`);
    let newCheckId = document.getElementById(`${newCheck}`); // 5. Find an element with calculated id
    // console.log(`2. found an element with id ${newCheck}`);

    if (newCheckId == null) {
      console.log("border met");
      i = 4;
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      console.log("obstacle met");
      i = 4;
    } else {
      newCheckId.classList.add("availableSquare"); // 6. add available class to the first calculated element
      console.log(`3. added "available" class to element with id ${newCheck}`);
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

  checkAvailableSquares(activePlayer());
  /*TODO: add function that changes active status*/
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
