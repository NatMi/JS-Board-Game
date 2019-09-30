/*TODO:
 - add turns for players (player 2 is not moving on the map) - highlight active player - check which player is active
    ... event : move player with isActive=true, then change it to false and turn anorher player's attribute to true?
 - restrict players moves 
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

//Randomizing position on map grid --> returns random element from allMapSquares HTML collection
function randomPositionOnMap() {
  let randomIndex = Math.floor(Math.random() * allMapSquares.length);
  let newRandomSquare = allMapSquares[randomIndex];
  return newRandomSquare;
}

//Players

class Player {
  constructor(position) {
    this.isActive = null;
    this.healthPoints = initialHealthStatus;
    this.Weapon = defaultWeapon;
    this.position = position;
  }
}

/////////////////////////////    Generate map grid    /////////////////////////////////////

// Support functions

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
function generatePlayersPosition() {
  let isOnMap = 0;
  while (isOnMap < 1) {
    let newPlayerOne = randomPositionOnMap();
    if (newPlayerOne.className === "mapSquare") {
      newPlayerOne.classList.add("playerOne");
      isOnMap++;
    }
  }
}

function generatePlayersTwoPosition() {
  let isOnMap = 0;
  while (isOnMap < 1) {
    let newPlayerOne = randomPositionOnMap();
    if (newPlayerOne.className === "mapSquare") {
      newPlayerOne.classList.add("playerTwo");
      isOnMap++;
    }
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
function drawMapGrid() {
  for (let row = 0; row < 10; row++) {
    let mapGridRow = document.createElement("div");
    mapGridRow.className = "mapGridRow";
    mapGrid.appendChild(mapGridRow);
    console.log("Row generated");

    for (let column = 0; column < 10; column++) {
      let mapSquare = document.createElement("div");
      mapSquare.className = "mapSquare";
      mapSquare.id = `${[row + 1]}-${[column + 1]}`;

      mapGridRow.appendChild(mapSquare);

      console.log("Squares in row generated");
    }
  }

  generateDimmedSquares();
  generatePlayersPosition();
  generatePlayersTwoPosition();
  generateWeapons();
}

drawMapGrid();

//in progress: functionality to refresh mapGrid (generate new map in place of the old one)
function eraseMapGrid() {
  mapContainer.removeChild(mapGrid);
}

///////////////////////// MOVEMENT ///////////////////////////

let currentPosition = document.getElementsByClassName("playerOne")[0]; //1. Grab first index of HTML collection for "playerOne" class

//up
function checkAvailableSquaresUp() {
  console.log("checking: up");
  let positionArray = transformCurrentPositionToArray(); // 2. Grab id of the element with playerOne class, turn it into an array instead of string
  console.log(positionArray);
  let availableToCheck = 0; // 3. Define number of iterations

  while (availableToCheck < 3) {
    availableToCheck++;
    console.log(`repetition nr: ${availableToCheck} `);
    let newCheck = `${positionArray[0] - availableToCheck}-${positionArray[1]}`; // 4.  Calculate coordinates of a box below playerOne and insert it into a string
    console.log(`1. calculated id: ${newCheck}`);
    let newCheckId = document.getElementById(`${newCheck}`); // 5. Find an element with calculated id
    console.log(`2. found an element with id ${newCheck}`);
    if (newCheckId == null) {
      availableToCheck = 3;
      console.log("top border met");
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      availableToCheck = 3;
      console.log("obstacle met");
    } else {
      newCheckId.classList.add("availableSquare"); // 6. add available class to the first calculated element
      console.log(`3. added "available" class to element with id ${newCheck}`);
    }
  }
}
//down
function checkAvailableSquaresDown() {
  console.log("checking: down");
  let positionArray = transformCurrentPositionToArray(); // 2. Grab id of the element with playerOne class, turn it into an array instead of string
  console.log(positionArray);
  let availableToCheck = 0; // 3. Define number of iterations

  while (availableToCheck < 3) {
    availableToCheck++;
    console.log(`repetition nr: ${availableToCheck} `);
    let newCheck = `${positionArray[0] + availableToCheck}-${positionArray[1]}`; // 4.  Calculate coordinates of a box below playerOne and insert it into a string
    console.log(`1. calculated id: ${newCheck}`);
    let newCheckId = document.getElementById(`${newCheck}`); // 5. Find an element with calculated id
    console.log(`2. found an element with id ${newCheck}`);

    if (newCheckId == null) {
      availableToCheck = 3;
      console.log("bottom border met");
    } else if (newCheckId.classList.contains("dimmedSquare")) {
      availableToCheck = 3;
      console.log("obstacle met");
    } else {
      newCheckId.classList.add("availableSquare"); // 6. add available class to the first calculated element
      console.log(`3. added "available" class to element with id ${newCheck}`);
    }
  }
}
//left

// checks availableSquares upon game start
checkAvailableSquaresUp();
checkAvailableSquaresDown();
////////////////////

function takePlayerAway() {
  currentPosition.classList.remove("playerOne");
}

function clearAccessible() {
  let availableList = document.getElementsByClassName("availableSquare");
  for (available of availableList) {
    available.classList.remove("availableSquare");
  }
}

function transformCurrentPositionToArray() {
  let currentId = currentPosition.id.split("-");
  currentId[0] = parseInt(currentId[0]);
  currentId[1] = parseInt(currentId[1]);
  return currentId;
}

// put Player On Square

function putPlayerOnSquare() {
  /*  1. Find out accesible squares, drag them along with the player
      2. Get player's row: restict moves to current row number +- 3
      3. Get player's column: restict moves to current column number +- 3
      4. Get available squares temporarily highlighted (hover on player?);   */

  clearAccessible();
  takePlayerAway();

  let chosenSquare = document.getElementById(event.target.id);
  chosenSquare.classList.add("playerOne");

  currentPosition = chosenSquare;
  console.log(`Moved player to mapSquare with id "${chosenSquare.id}"`);
  checkAvailableSquaresUp();
  checkAvailableSquaresDown();
}

// Click events
const body = document.querySelector("body");
body.addEventListener("click", event => {
  //if (event.target.id === "btn-refresh-map") {
  // drawMapGrid();
  //}
  if (
    event.target.classList.contains("mapSquare") &
    event.target.classList.contains("availableSquare")
  ) {
    putPlayerOnSquare();
  } else {
    console.log("Clicked on a non accesible space");
  }
});
