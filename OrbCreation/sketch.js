let movers = [];
const WIDTH = 400;
const HEIGHT = 400;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  movers.push(new Mover(200, 200));
}

function draw() {
  background(0);
  movers.forEach(mover => {
    mover.update();
    mover.show();  
  });
  
  // For the first 5 seconds...
  if(millis() < 5000) {
    textStyle(BOLDITALIC);
    textSize(30);
    text("Click and Move", 100, 100);
  }
}

// Only fires when mouse is clicked.
function mouseClicked() {
  movers.push(new Mover(mouseX, mouseY));
}