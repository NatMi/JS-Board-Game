    
let allMapSquares = document.getElementsByClassName("mapSquare");

//Randomizing position on map grid
function randomPositionOnMap(){
    let randomMapSquare = (Math.floor(Math.random() * allMapSquares.length));
    return allMapSquares[randomMapSquare];
};


//Players

    class Player{
        constructor(position){
            this.position = position;
            this.healthPoints = 100;
        }
    }
    
//Generate map grid 

    function drawMapGrid(){
        for ( let row = 0; row < 10; row++) {
            let mapGridRow = document.createElement("div");
            mapGridRow.className = "mapGridRow";
            mapGrid.appendChild(mapGridRow);
            console.log("Row generated");

                for ( let column = 0; column < 10; column++){
                    let mapSquare = document.createElement("div");
                    mapSquare.className = "mapSquare";
                    mapSquare.id= `row${[row+1]}-column${[column+1]}`;

                    mapGridRow.appendChild(mapSquare);

                    console.log("Squares in row generated");
                }       
        }
    };

    function generateDimmedSquare(){
        for ( let i = 0; i < 30; i++){
        randomPositionOnMap().classList.add("dimmedSquare")
    }
    }


    drawMapGrid();
    generateDimmedSquare();
    randomPositionOnMap().classList.add("playerOne");
    randomPositionOnMap().classList.add("playerTwo");

    let currentPosition = document.getElementsByClassName("playerOne");
  
// put Player On Square

    function putPlayerOnSquare(){
        currentPosition[0].classList.remove("playerOne");
        let chosenSquare = document.getElementById(event.target.id);
        chosenSquare.classList.add("playerOne");

        console.log(`Clicked on mapSquare with id "${chosenSquare.id}"`)
    }    

      
// Click events
    const parent = document.querySelector("body");

    parent.addEventListener('click', event => {

        if (event.target.className === 'mapSquare') {
            putPlayerOnSquare();
    }

        else {
            console.log("Clicked on something outside of any mapSquare")
    }
    });

