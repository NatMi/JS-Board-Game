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

//Randomizing position on map grid
function randomPositionOnMap() {
  let randomMapSquare = Math.floor(Math.random() * allMapSquares.length);
  return allMapSquares[randomMapSquare];
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
let mapGridArray = [
  { type: "x", coordinate: [""] },
  { type: "y", coordinate: [""] }
];
/////////////////////////////    Generate map grid    /////////////////////////////////////
function generateDimmedSquare() {
  for (let i = 0; i < 20; i++) {
    randomPositionOnMap().classList.add("dimmedSquare");
  }
}

function drawMapGrid() {
  for (let row = 0; row < 10; row++) {
    let mapGridRow = document.createElement("div");
    mapGridRow.className = "mapGridRow";
    mapGrid.appendChild(mapGridRow);
    console.log("Row generated");

    for (let column = 0; column < 10; column++) {
      let mapSquare = document.createElement("div");
      mapSquare.className = "mapSquare";
      mapSquare.id = `r${[row + 1]}c${[column + 1]}`;

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

let currentPosition = document.getElementsByClassName("playerOne");
// put Player On Square

function putPlayerOnSquare() {
  /*  1. Find out where the player is - get current position -----> currentPosition[0].id = "row9-column10"
      2. Get player's row: restict moves to current row number +- 3
      3. Get player's column: restict moves to current column number +- 3
      4. Get available squares temporarily highlighted (hover on player?);
      5.
      6.

  */

  currentPosition[0].classList.remove("playerOne");
  let chosenSquare = document.getElementById(event.target.id);
  chosenSquare.classList.add("playerOne");

  console.log(`Moved player to mapSquare with id "${chosenSquare.id}"`);
}

// Click events
const parent = document.querySelector("body");
parent.addEventListener("click", event => {
  //if (event.target.id === "btn-refresh-map") {
  // drawMapGrid();
  //}
  if (event.target.className === "mapSquare") {
    putPlayerOnSquare();
  } else {
    console.log("Clicked on something outside of any mapSquare");
  }
});

let positionId = currentPosition[0].id;
let x = document.getElementsByClassName("mapGridRow");
let y = x[0].children[0];

let currentRow = currentPosition.parentElement;
