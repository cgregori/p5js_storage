let mover;
let enemies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  mover = new Mover(200, 200, 25);
  frameRate(60);
}

function draw() {
  background('#5e81bf');
  
  // Instructory text:
  introText();
  
  // Player stuffs.
  mover.update();
  mover.show();
  
  // Enemy stuffs.
  for(let i = enemies.length - 1; i >= 0; i-= 1) {
    
    
    // Make sure enemies[i] isn't null
    if(enemies[i]) {
      enemies[i].update(mover);
      enemies[i].show();
      // Garbage collection.
      if(enemies[i].checkSelfDestruct()) {
        enemies.splice(i, 1);
      }
    }
  }
  
  // 40% chance of spawning enemy each frame
  if(random() < 0.4) {
    enemies.push(Enemy.spawnEnemy(mover.pos));
  }
}

function introText() {
  if(millis() <= 10000) {
    push();
    textSize(18);
    stroke(175);
    fill('#edc598');
    textAlign(CENTER)
    text('Don\'t let your captain get hit by the angry fish!',
        width/3, height/2);
    text('Arrow Keys to move, shift to brake, ctrl to slow time', 
         width/3, height/2 + 30);
    text('Btw... you get more points for being near the middle',
        width/2, height/2 + 60);
    text('Hint! Be light on the keys',
        width/3, height/2 + 90);
    pop();
  }
}