   
   //Generate map grid 
let mapGrid = document.getElementById("mapGrid");
let mapSquare = document.getElementsByClassName("mapSquare");


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
    drawMapGrid();

     // put Player On Square
function putPlayerOnSquare(){

    let chosenSquare = document.getElementById(event.target.id);
    chosenSquare.style.background = "#f0bc68";

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