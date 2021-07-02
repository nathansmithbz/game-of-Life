let cellSize = 5;
let col, row, cells;

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  //calculate num of rows/cols
  col = floor(height / cellSize);
  row = floor(width / cellSize);
  //create grid using 2 multidimmensional arrays to store state of cells
  cells = new Array(col);
  for (let x = 0; x < col; x++) {
    cells[x] = new Array(row);
    for (let y = 0; y < col; y++) {
      //randomly set cells to dead or alive - alive(1) dead(0)  
      cells[x][y] = Math.floor(Math.random() * 2);
    }
  }
}

function draw() {
  //draw grid of cells based on state of cell - alive(1) dead(0)  
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      if (cells[x][y] == 1) {
        fill(0);
      } else {
        fill(255);
      }      
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}