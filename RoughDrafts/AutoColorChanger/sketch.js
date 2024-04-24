let timer = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
   if (millis() >= 500+timer) {
    background(random(255),random(255),random(255));
    timer = millis();
  }
}