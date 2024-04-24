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
  
  enemies.forEach(enemy => {
    enemy.show();
    enemy.update();
  });
  
}