let mover;
let enemies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  mover = new Mover(200, 200, 25);
  
  //frameRate(10)
}

function draw() {
  background(55);
  
  mover.update();
  mover.show();
  
  for(let i = enemies.length - 1; i >= 0; i-= 1) {
    if(enemies[i].checkSelfDestruct()) {
      enemies.splice(i, 1);
    }
    if(enemies[i]) {
      enemies[i].update();
      enemies[i].show();
    }
  }
  
  // 50% chance of spawning each frame
  if(random() < 0.5) {
    enemies.push(Enemy.spawnEnemy(mover.pos));
  }
  
}