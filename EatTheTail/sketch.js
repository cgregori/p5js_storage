// TODO:   Handler
//        Interaction 'State' when interacting w/ enemy
//        Reset Button
//        Optomize by checking for only last n elements in array
//        Different Physics configs?
//        Different Color configs?
//        Split into Components?
//        HSB?


let x = 100;
let y = 100;
let velX = 0;
let velY = 0;
let trail = [];
let enemies = [];
let enemyCount = 1;
let enemyX = 300;
let enemyY = 300;
let enemyVelX = 0;
let enemyVelY = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {  
    movement(); 
    physics();
    loopAround();
  
  // Draw.
    clear();
  // Player Trail.
    renderPlayer();
  
    decay();
  
  // Touch the enemy.
    renderEnemies();
}

/***
  Misnomer. Also handles interactions
  Variables: x, y, enemyX, enemyY, enemies[], enemyCount
***/
function renderEnemies() {
   enemies.push({x: enemyX, y: enemyY})
    for(var i = 0; i < enemies.length; i++) {
      fill(enemies[i].x, enemies[i].y, enemies[i].x - enemies[i].y);
      ellipse(enemies[i].x, enemies[i].y, 25, 25);
      if(Math.abs(x-enemies[i].x) < 5 && Math.abs(y-enemies[i].y) < 5) {
        enemyCount++;
      }
    }
  // Keeps length of tail 'capped'
  if(enemies.length > enemyCount) {
    enemies.shift();
  }
}

/***
  Variables: x, y, trail[]
***/
function renderPlayer() {
  trail.push({x: x, y: y});
    for(var i = 0; i < trail.length; i++) {
      fill(trail[i].x, trail[i].y, trail[i].x - trail[i].y)
      ellipse(trail[i].x, trail[i].y, 50, 50);
    }
    if (trail.length > 10) {
      // pop from front
      trail.shift();
    }
}

/***
  Variables: x, y, enemyX, enemyY, velX, velY, enemyVelX, enemyVelY 
***/
function physics() {
  x += velX;
  y += velY;
  enemyX += enemyVelX;
  enemyY += enemyVelY;
}

/***
  Variables: x, y, enemyX, enemyY
***/
function loopAround() {
    // Loop around.
    if (x > 500)
      x = 0;
    if (x < 0)
      x = 500;
    if (y > 500)
      y = 0;
    if (y < 0)
      y = 500;
  
    if (enemyX > 500)
      enemyX = 0;
    if (enemyX < 0)
      enemyX = 500;
    if (enemyY > 500)
      enemyY = 0;
    if (enemyY < 0)
      enemyY = 500;
}

/***
  Variables: velX, velY, enemyVelX, enemyVelY
***/
function movement() {
  if (keyIsDown(LEFT_ARROW)) { 
        velX -= .5; 
        enemyVelX += .5;
    } 
  
    if (keyIsDown(RIGHT_ARROW)) { 
        velX += .5;
        enemyVelX -= .5;
    } 
  
    if (keyIsDown(UP_ARROW)) { 
        velY -= .5;
        enemyVelY += .5;
    } 
  
    if (keyIsDown(DOWN_ARROW)) { 
        velY += .5;
        enemyVelY -= .5;
    }
}

/***
  Variables: velX, velY, enemyVelX, enemyVelY
***/
function decay() {
  if (velX > 0)
    velX += -.1;
  if (velY > 0)
    velY += -.1;
  if (velX < 0)
    velX += .1;
  if (velY < 0)
    velY += .1;
  if (enemyVelX > 0)
    enemyVelX += -.1;
  if (enemyVelY > 0)
    enemyVelY += -.1;
  if (enemyVelX < 0)
    enemyVelX += .1;
  if (enemyVelY < 0)
    enemyVelY += .1;
}