let rectW;
let rectH;
let rows;
let cols;
let cellsMatrix;
let antPos;
let antDir;
let directions = {
    north: {false: [1, 0], true: [-1, 0]},
    east: {false: [0, 1], true: [0, -1]},
    south: {false: [-1, 0], true: [1, 0]},
    west: {false: [0, -1], true: [0, 1]},
};
let directionsOrder = ['north', 'east', 'south', 'west'];
let ants = [];

class Cell {
    constructor(xPos, yPos, width, height, filled) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.filled = filled;
    }

    draw() {
        rect(this.xPos, this.yPos, this.width, this.height);
    }
}

function setup() {
    frameRate(60);
    rectW = 10;
    rectH = 10;
    rows = windowWidth / rectH;
    cols = windowHeight / rectW;
    antPos = [Math.floor(rows / 2), Math.floor(cols / 2)];
    antDir = 'west';

    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.class('canvas-block');

    cellsMatrix = [];
    stroke(0, 0, 0, 50);
    for (let h = 0; h < cols; h++) {
        cellsMatrix.push([]);
        for (let w = 0; w < rows; w++) {
            let filled = false;
            fill(filled ? color(0) : color(255));
            let cell = new Cell(w * rectW, h * rectH, rectW, rectH, filled);
            cellsMatrix[h].push(cell);
            cell.draw();
        }
    }
}

function draw() {
    let filled = cellsMatrix[antPos[1]][antPos[0]].filled;
    let cell = new Cell(antPos[0] * rectW, antPos[1] * rectH, rectW, rectH, !filled);
    cellsMatrix[antPos[1]].splice(antPos[0], 1, cell);
    fill(color(filled ? color(255) : color(0)));
    cell.draw();

    fill(255, 0, 0);
    antPos = [antPos[0] + directions[antDir][filled][0], antPos[1] + directions[antDir][filled][1]];
    let switchDirection;
    if (directionsOrder.indexOf(antDir) === 0 && filled) {
        switchDirection = directionsOrder.length - 1
    } else if (directionsOrder.indexOf(antDir) === directionsOrder.length - 1 && !filled) {
        switchDirection = 0;
    } else {
        switchDirection = filled ? directionsOrder.indexOf(antDir) - 1 : directionsOrder.indexOf(antDir) + 1;
    }
    antDir = directionsOrder[switchDirection];
}