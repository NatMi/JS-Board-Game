//////////////////////   WEAPONS   /////////////////////////////////////
let weapons = {
  allItems: [
    { cssClass: "snowball", damage: 10 },
    { cssClass: "fish", damage: 15 },
    { cssClass: "smallStone", damage: 20 },
    { cssClass: "bigStone", damage: 25 }
  ],
  pickable: () => {
    let filteredItems = weapons.allItems.filter(item => {
      return item.damage > 10;
    });
    return filteredItems;
  },
  default: () => {
    let chosenDefault = weapons.allItems[0];
    return chosenDefault;
  },
  generateOnMap: () => {
    for (let weapon of weapons.pickable()) {
      let isOnMap = 0;
      while (isOnMap < 2) {
        let newWeapon = map.randomPosition(map.allSquares);
        if (newWeapon.className === "mapSquare") {
          newWeapon.classList.add(weapon.cssClass);
          isOnMap++;
        }
      }
    }
  }
};
//Players
class Player {
  constructor(cssClass, statboxId) {
    this.cssClass = cssClass;
    this.statboxId = statboxId;
    this.isActive = false;
    this.position = null;
    this.healthPoints = 100;
    this.Weapon = weapons.default();
    this.defenceMultiplier = 1;
    this.generatePosition = () => {
      let isOnMap = 0;
      while (isOnMap < 1) {
        let newPlayer = map.randomPosition();
        if (newPlayer.className === "mapSquare") {
          newPlayer.classList.add(this.cssClass);
          isOnMap++;
        }
        this.position = document.getElementsByClassName(this.cssClass)[0];
      }
    };
    this.positionArray = () => {
      let currentId = this.position.id.split("-");
      currentId[0] = parseInt(currentId[0]);
      currentId[1] = parseInt(currentId[1]);
      return currentId;
    };
    this.attack = () => {
      game.inactivePlayer().healthPoints =
        game.inactivePlayer().healthPoints -
        this.Weapon.damage * game.inactivePlayer().defenceMultiplier;
      game.inactivePlayer().createStatbox();
      game.inactivePlayer().defenceMultiplier = 1;

      game.toggleBtnBox();
      game.toggleIsActive();
      if (
        game.playerOne.healthPoints <= 0 ||
        game.playerTwo.healthPoints <= 0
      ) {
        alert("game over!");
      }
    };
    this.defend = () => {
      this.defenceMultiplier = 0.5;
      game.toggleBtnBox();
      game.toggleIsActive();
    };

    this.createStatbox = () => {
      document.getElementById(`${this.statboxId}`).innerHTML = ""; // 1. removes statbox content if there is any
      // 2. creates updated statbox content
      let paragraphHealth = document.createElement("p");
      let health = document.createTextNode(`Health: ${this.healthPoints}`);
      paragraphHealth.appendChild(health);
      document.getElementById(`${this.statboxId}`).appendChild(paragraphHealth);

      let paragraphWeapon = document.createElement("p");
      let weapon = document.createTextNode(`Weapon: ${this.Weapon.cssClass}`);
      paragraphWeapon.appendChild(weapon);
      document.getElementById(`${this.statboxId}`).appendChild(paragraphWeapon);

      let paragraphDamage = document.createElement("p");
      let damage = document.createTextNode(`Damage: ${this.Weapon.damage}`);

      paragraphDamage.appendChild(damage);
      document.getElementById(`${this.statboxId}`).appendChild(paragraphDamage);

      let paragraphPosition = document.createElement("p");
      let position = document.createTextNode(`Position: ${this.position.id}`);

      paragraphPosition.appendChild(position);
      document
        .getElementById(`${this.statboxId}`)
        .appendChild(paragraphPosition);
    };
  }
}

let game = {
  playerOne: new Player("playerOne", "statboxOne"),
  playerTwo: new Player("playerTwo", "statboxTwo"),

  activePlayer: () => {
    if (game.playerOne.isActive == true) {
      return game.playerOne;
    } else if (game.playerTwo.isActive == true) {
      return game.playerTwo;
    }
  },
  inactivePlayer: () => {
    if (game.playerOne.isActive == false) {
      return game.playerOne;
    } else if (game.playerTwo.isActive == false) {
      return game.playerTwo;
    }
  },
  toggleIsActive: () => {
    if (game.activePlayer() == game.playerOne) {
      game.playerOne.isActive = false;
      game.playerTwo.isActive = true;
    } else if (game.activePlayer() == game.playerTwo) {
      game.playerTwo.isActive = false;
      game.playerOne.isActive = true;
    }
  },
  availableSquares: () => {
    let availables = document.getElementsByClassName("availableSquare");
    return availables;
  },

  btnBox: () => {
    let btn = "";
    if (game.activePlayer() == game.playerOne) {
      btn = document.getElementsByClassName("btnBox")[0];
    } else if (game.activePlayer() == game.playerTwo) {
      btn = document.getElementsByClassName("btnBox")[1];
    }
    return btn;
  },
  toggleBtnBox: () => {
    let btn = "";
    if (game.activePlayer() == game.playerOne) {
      btn = document.getElementsByClassName("btnBox")[0];
      btn.style.display = "none";
      btn = document.getElementsByClassName("btnBox")[1];
      btn.style.display = "block";
    } else if (game.activePlayer() == game.playerTwo) {
      btn = document.getElementsByClassName("btnBox")[1];
      btn.style.display = "none";
      btn = document.getElementsByClassName("btnBox")[0];
      btn.style.display = "block";
    }
  }
};

/////////////////////////////    Generate map grid    /////////////////////////////////////
let map = {
  container: document.getElementById("map-container"),
  allSquares: document.getElementsByClassName("mapSquare"),
  randomPosition: () => {
    let randomIndex = Math.floor(Math.random() * map.allSquares.length);
    let newRandomSquare = map.allSquares[randomIndex];
    return newRandomSquare;
  },
  generateDimmedSquares: () => {
    let totalDimmed = 0;
    while (totalDimmed < 15) {
      let newDimmedSquare = map.randomPosition();

      if (newDimmedSquare.className === "mapSquare") {
        newDimmedSquare.classList.add("dimmedSquare");
        totalDimmed++;
      }
    }
  },
  drawMapGrid: size => {
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
  }
};
///////////////////////////////////// Draw map grid //////////////////////////////////
function newGame() {
  mapGrid.innerHTML = "";
  mapGrid.classList.remove("disabled");
  map.drawMapGrid(12);

  map.generateDimmedSquares();
  game.playerOne.generatePosition();
  game.playerTwo.generatePosition();
  game.playerOne.isActive = true;
  checkAvailableSquares(game.activePlayer());
  game.btnBox().style.display = "none";
  weapons.generateOnMap();

  game.playerOne.createStatbox();
  game.playerTwo.createStatbox();
}

///////////////////////// MOVEMENT ///////////////////////////

// checks availableSquares upon game start
function checkAvailableSquares(player) {
  function check(player, index, multiplier) {
    let x = player.positionArray()[0];
    let y = player.positionArray()[1];

    for (let i = 0; i < 3; i++) {
      if (index === 1) {
        y = player.positionArray()[index] + (i + 1) * multiplier;
      } else if (index === 0) {
        x = player.positionArray()[index] + (i + 1) * multiplier;
      }

      let newCheck = `${x}-${y}`;
      let newCheckId = document.getElementById(`${newCheck}`);

      if (newCheckId == null) {
        break;
      } else if (
        i == 0 &&
        (newCheckId.classList.contains("playerOne") ||
          newCheckId.classList.contains("playerTwo"))
      ) {
        fightMode();
        break;
      } else if (
        newCheckId.classList.contains("playerOne") ||
        newCheckId.classList.contains("playerTwo")
      ) {
        break;
      } else if (newCheckId.classList.contains("dimmedSquare")) {
        break;
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
  while (game.availableSquares().length) {
    game
      .availableSquares()
      [game.availableSquares().length - 1].classList.remove("availableSquare");
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
  for (let i = 0; i < weapons.allItems.length; i++) {
    if (chosenSquare.classList.contains(`${weapons.allItems[i].cssClass}`)) {
      console.log(`grabbed ${weapons.allItems[i].cssClass}`);
      chosenSquare.classList.add(`${player.Weapon.cssClass}`);
      player.Weapon = weapons.allItems.find(item => {
        return item.cssClass == weapons.allItems[i].cssClass;
      });
      chosenSquare.classList.remove(`${weapons.allItems[i].cssClass}`);
      i = weapons.allItems.length;
    }
  }

  game.toggleIsActive();
  player.createStatbox();
  checkAvailableSquares(game.activePlayer());
}
/////////////////// FIGHT MODE /////////////////////////////////////
function fightMode() {
  mapGrid.classList.add("disabled");
  game.btnBox().style.display = "block";
}

//////////////////////////   CLICK EVENTS   /////////////////////////////////////////

const body = document.querySelector("body");
body.addEventListener("click", event => {
  if (event.target.id == "newGameBtn") {
    newGame();
  } else if (event.target.classList.contains("availableSquare")) {
    movePlayer(game.activePlayer());
  } else if (event.target.classList.contains("attackBtn")) {
    game.activePlayer().attack();
  } else if (event.target.classList.contains("defendBtn")) {
    game.activePlayer().defend();
  }
});
