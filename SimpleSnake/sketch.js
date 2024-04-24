// Setup.
let playerX = 10;
let playerY = 10;
let velocityX = 0;
let velocityY = 0;
let gridSize = 20; // Because canvas size is 400 x 400
let tileCount = 20; // Because canvas size is 400 x 400
let appleX = 15;
let appleY = 15;
let trail = [];
let tail = 5;

function setup() {
  frameRate(30);
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  // Render Snake.
  fill('cyan');
  for(let i = 0; i < trail.length; i++) {
    square(trail[i].x*gridSize, trail[i].y*gridSize, gridSize);
    // Stepped on your tail.
    if(playerX == trail[i].x & playerY == trail[i].y)
      tail = 5;
  }
  // Tail specific stuff.
  trail.push({x: playerX, y: playerY});
  while(trail.length > tail)
    trail.shift();
  
  // Step on Apple.
  if(playerX == appleX & playerY == appleY) {
    tail++;
    appleX = Math.floor(Math.random()*tileCount);
    appleY = Math.floor(Math.random()*tileCount);
  }
  
  // Render Apple.
  fill('red');
  square(appleX*gridSize,appleY*gridSize,gridSize-2);
  
  keyboardInput();
  physics();
}

function keyboardInput() {
  if (keyIsDown(LEFT_ARROW)) {
    velocityX = -1;
    velocityY = 0;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    velocityX = 1;
    velocityY = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    velocityY = -1;
    velocityX = 0;
  }

  if (keyIsDown(DOWN_ARROW)) {
    velocityY = 1;
    velocityX = 0;
  }
}

function physics() {
  playerX += velocityX;
  playerY += velocityY;
  
  // Wrap-Around.
  if (playerX < 0)
    playerX = tileCount - 1;
  if(playerX > tileCount - 1)
    playerX = 0;
  if(playerY < 0)
    playerY = tileCount - 1;
  if(playerY > tileCount - 1)
    playerY = 0; 
}