/*TODO:
 - add turns for players (player 2 is not moving on the map) - hightlight active player - check which player is active
    ... event : move player with isActive=true, then change it to false and turn anorher player's attribute to true?
 - restrict players moves (right now player 1 can be placed anywhere on grid except dimmed and p2)
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

// Generating dimmed squares - selecting random element from allMapSquares HTML collection and  adding new class to it
function generateDimmedSquare() {
  let totalDimmed = 0;
  while (totalDimmed < 20) {
    let newDimmedSquare = randomPositionOnMap();

    if (newDimmedSquare.className === "mapSquare") {
      newDimmedSquare.classList.add("dimmedSquare");
      totalDimmed++;
    }
  }
  console.log(
    `total dimmed: ${document.querySelectorAll(".dimmedSquare").length}`
  );
}
//
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

  generateDimmedSquare();

  randomPositionOnMap().classList.add("playerOne");
  randomPositionOnMap().classList.add("playerTwo");

  for (weapon of pickableWeapons) {
    randomPositionOnMap().classList.add(weapon.weaponName);
  }
}

drawMapGrid();
//in progress: functionality to refresh mapGrid (generate new map in place of the old one)
function eraseMapGrid() {
  mapContainer.removeChild(mapGrid);
}

//movement utilities

let currentPosition = document.getElementsByClassName("playerOne")[0];

/////////////////////   ACCESSIBLE SQUARES /////////////////////
let positionArray = transformCurrentPositionToArray();
console.log(positionArray);

/*for (let p = 0; p < 3; p++) {
  div z id `${positionArray[0] + p}-${positionArray[1]}`
  let moveDownId = document.getElementById(`${moveDown}`);
  moveDownId.classList.add("testSquare");
  console.log(moveDown);
}*/

let moveDownOne = `${positionArray[0] + 1}-${positionArray[1]}`;
console.log(moveDownOne);
let moveDownTwo = `${positionArray[0] + 2}-${positionArray[1]}`;
console.log(moveDownTwo);
let moveDownThree = `${positionArray[0] + 3}-${positionArray[1]}`;
console.log(moveDownThree);

let moveDownOneId = document.getElementById(`${moveDownOne}`);
moveDownOneId.classList.add("availableSquare");

let moveDownTwoId = document.getElementById(`${moveDownTwo}`);
moveDownTwoId.classList.add("availableSquare");

let moveDownThreeId = document.getElementById(`${moveDownThree}`);
moveDownThreeId.classList.add("availableSquare");
/////////////////////////////////////////////////////

function takePlayerAway() {
  currentPosition.classList.remove("playerOne");
}

function clearAccessible() {
  moveDownOneId.classList.remove("availableSquare");
  moveDownThreeId.classList.remove("availableSquare");
  moveDownTwoId.classList.remove("availableSquare");
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

  let positionArray = transformCurrentPositionToArray();
  console.log(positionArray);

  let moveDownOne = `${positionArray[0] + 1}-${positionArray[1]}`;
  console.log(moveDownOne);
  let moveDownTwo = `${positionArray[0] + 2}-${positionArray[1]}`;
  console.log(moveDownTwo);
  let moveDownThree = `${positionArray[0] + 3}-${positionArray[1]}`;
  console.log(moveDownThree);

  moveDownOneId = document.getElementById(`${moveDownOne}`);
  moveDownOneId.classList.add("availableSquare");

  moveDownTwoId = document.getElementById(`${moveDownTwo}`);
  moveDownTwoId.classList.add("availableSquare");

  moveDownThreeId = document.getElementById(`${moveDownThree}`);
  moveDownThreeId.classList.add("availableSquare");
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

let x = document.getElementsByClassName("mapGridRow");
let y = x[0].children[0];
