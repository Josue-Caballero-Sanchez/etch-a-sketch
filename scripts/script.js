function Start(){
    colorMode = true;
    colorModeButton.classList.toggle("button-clicked");
    updateGridSize(16);
}

function onClick(e){
    if(e.type === "mouseover" && !mouseDown){
        return;
    }
    if(colorMode){
        e.target.style.backgroundColor = "black"; 
    }
    else if(eraser){
        e.target.style.backgroundColor = "white";
    }
}

function ColorModeButtonClicked(){
    if(colorMode){
        return;
    }

    eraser = false;
    eraserButton.classList.toggle("button-clicked");
    colorMode = true;
    colorModeButton.classList.toggle("button-clicked");
    
}

function EraserButtonClicked(){
    if(eraser){
        return;
    }

    colorMode = false;
    colorModeButton.classList.toggle("button-clicked");
    eraser = true;
    eraserButton.classList.toggle("button-clicked");
}

function ClearButtonClicked(){
    itemArray.forEach(element =>{
        element.style.backgroundColor = "white";
    });
}

function updateGridOutput(size){
    const sliderOutput = document.querySelector(".grid-text");
    sliderOutput.textContent = size + " x " + size;
}

function updateGridSize(size){
    let gridItemSize = 500/size;
    ClearButtonClicked();

    while(grid.hasChildNodes()){
        grid.removeChild(grid.firstChild);
    }
    itemArray = [];

    
    for(let i = 1; i <= size*size; i++){
        const gridItem = document.createElement("div");
        
        gridItem.style.cssText ="margin: 0; padding: 0;";
        gridItem.style.width = gridItemSize + "px";
        gridItem.style.height = gridItemSize + "px";
        gridItem.addEventListener("mouseover", onClick);
        gridItem.addEventListener("mousedown", onClick);
        itemArray.push(gridItem);
    

        grid.appendChild(gridItem);
    }
    
    
}

let colorMode = false;
let eraser = false;
let mouseDown = false;
let itemArray = [];
const grid = document.querySelector(".grid");
const colorModeButton = document.querySelector(".color-mode-button");
const eraserButton = document.querySelector(".eraser-button");
const clearButton = document.querySelector(".clear-button");
const slider = document.querySelector(".slider");

Start();

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

colorModeButton.addEventListener("click", ColorModeButtonClicked);
eraserButton.addEventListener("click", EraserButtonClicked);
clearButton.addEventListener("click", ClearButtonClicked);
slider.onmousemove = (e) => updateGridOutput(e.target.value);
slider.onchange = (e) => updateGridSize(e.target.value);

