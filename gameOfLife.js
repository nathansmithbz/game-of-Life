let cellSize = 5;
let col, row, cells, cellsNext;

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  //calculate num of rows/cols
  col = floor(height / cellSize);
  row = floor(width / cellSize);
  //create grid using 2 multidimmensional arrays to store state of cells
  cells = new Array(col);
  //Create additional grid to store states for next itteration so we do not alter the current grid
  cellsNext = new Array(col);
  for (let x = 0; x < col; x++) {
    cells[x] = new Array(row);
    cellsNext[x] = new Array(row);
    for (let y = 0; y < col; y++) {
      //Give cells a random starting state of dead or alive -> alive = 1, dead = 0
      cells[x][y] = Math.floor(Math.random() * 2);
      cellsNext[x][y] = 0;
    }
  }
}

function draw() {
  //draw cells based on state of cell  -> alive = 1 (black), dead = 0 (white)
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      if (cells[x][y] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      checkRules(x, y);
    }
  }
  //Now safe to create a deep copy of the next iteration array, to be displayed on the next draw() call
  cells = JSON.parse(JSON.stringify(cellsNext));
}

function sumNeighbours(x, y) {
  //Sum number of alive neighbours -
  let neighbours = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      neighbours += cells[(x + i + row) % row][(y + j + col) % col];
    }
  }
  //Return sum - current cell status
  return (neighbours -= cells[x][y]);
}

function checkRules(x, y) {
  let temp = sumNeighbours(x, y);
  if (cells[x][y] == 1) {
    //When a live cell has fewer than two neighbours, then this cell dies
    if (temp < 2) {
      cellsNext[x][y] = 0;
    }
    //When a live cell has more than three neighbours, then this cell dies
    else if (temp > 3) {
      cellsNext[x][y] = 0;
    }
    //When a live cell has two or three neighbours, then this cell stays alive
    else {
      cellsNext[x][y] = 1;
    }
  }
  //When an empty position has exactly three neighbouring cells, then a cell is created in this position
  if (cells[x][y] == 0) {
    if (temp == 3) {
      cellsNext[x][y] = 1;
    }
  }
}
