let mover;
let enemies = [];

function setup() {
  createCanvas(700, 700);
  
  mover = new Mover(200, 200);
  for(let i = 0; i < 20; i++) {
    enemies.push(new Mover(20*i, 0));
  }
  
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