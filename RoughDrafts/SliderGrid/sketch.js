let tileCount;
let gridSize;
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  makeSlider();
}

function draw() {
  background(220);
  
  drawGrid();
  
// Slider stuff
  tileCount = slider.value();
}

function drawGrid() {
  gridSize = width/tileCount;
  // Horizontal Lines
  for(let i = 0; i < tileCount; i++) {
    line(0, i*gridSize, width, i*gridSize);
  }
  // Vertical Lines
  for(let j = 0; j < tileCount; j++) {
    line(j*gridSize, 0, j*gridSize, height);
  }
}

function makeSlider() {
  slider = createSlider(0, 60, 20);
  slider.position(10, 10);
  slider.style('width', '80px');
}