let mover;
let enemies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  mover = new Mover(200, 200, 25);
  
  //frameRate(10)
}

function draw() {
  background('#5e81bf');
  
  // Instructory text:
  if(millis() <= 10000) {
    textSize(15)
    text('Don\'t let your captain get hit by the angry fish!',
        width/3, height/2);
    text('Arrow Keys to move, shift to brake', 
         width/3, height/2 + 30);
    text('Btw... you get more points for being near the middle',
        width/2, height/2 + 60);
  }
  
  
  mover.update();
  mover.show();
  
  for(let i = enemies.length - 1; i >= 0; i-= 1) {
    if(enemies[i].checkSelfDestruct()) {
      enemies.splice(i, 1);
    }
    if(enemies[i]) {
      enemies[i].update(mover);
      enemies[i].show();
    }
  }
  
  // 50% chance of spawning each frame
  if(random() < 0.5) {
    enemies.push(Enemy.spawnEnemy(mover.pos));
  }
  
}