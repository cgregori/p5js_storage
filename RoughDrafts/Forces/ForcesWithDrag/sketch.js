let mover;

let temp, base;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200, 200, 3);
  
  temp = new Mover(200, 200, 2);
  base = new Mover(200, 200, 1);
}

function draw() {
  background(55);
  
  if(mouseIsPressed) {
    mover.drag();
    temp.drag();
    base.drag();
  }
  
  let wind = createVector(0.1, 0);
  mover.applyForce(wind);
  temp.applyForce(wind);
  base.applyForce(wind);
  
  mover.update();
  mover.show();
  
  temp.update();
  temp.show();
  base.update();
  base.show();
}