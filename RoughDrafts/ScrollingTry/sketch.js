// Bit more tricky than anticipated...

let x = 20;
let y = 400;

function setup() {
  createCanvas(600, 400);
  frameRate(30);
}

function draw() {
  background(0);
  
  // Moving
  x += 10;
  let offset = 30;
  translate(-x + offset, 0);
  fill("#bb34f2");
  rect(x, y, 20, -50);
  
  // Obstacle.
  fill("#ff003b");
  rect(400, 400, 100, -50);
  rect(600, 400, 100, -50);
  rect(800, 400, 100, -50);
}