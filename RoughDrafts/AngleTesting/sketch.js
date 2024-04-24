let angle = 0;
let angleVel = 0;
let angleAcc = 0.001;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
}

function draw() {
  background('#f3faa1');
  
  push();
  translate(width/2, height/2);
  rotate(angle);
  rectMode(CENTER);
  fill('#00e4df')
  rect(0, 0, 200, 32);
  pop();
  
  angle += angleVel;
  angleVel += angleAcc;
}